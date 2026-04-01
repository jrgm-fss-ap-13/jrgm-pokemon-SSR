import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';
import {
  Chain,
  Evolution,
  PokeAPIResponse,
  Pokemon,
  PokemonEvolution,
  PokemonSpecies,
  SimplePokemon
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private http = inject(HttpClient);
  public totalPokemons = signal<number>(0);

  public loadPage(page: number): Observable<SimplePokemon[]> {

    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon?offset=${page * 15}&limit=15`
    ).pipe(
      tap(resp => this.totalPokemons.set(resp.count)),
      map(resp => {
        const basicPokemons = resp.results.map(pokemon => ({
          id: pokemon.url.split('/').at(-2) ?? '0',
          name: pokemon.name
        }));

        return basicPokemons;
      }),
      switchMap(pokemons => {
        const requests = pokemons.map(pokemon =>
          this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`).pipe(
            map(details => ({
              id: pokemon.id,
              name: pokemon.name,
              front_default: details.sprites.front_default,
              type: details.types.map(t => t.type.name)
            }))
          )
        );
        return forkJoin(requests);
      })
    );
  }

  loadPokemonById(id: string): Observable<{ pokemon: Pokemon; evolutions: Evolution[][] }> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      switchMap(pokemon =>
        this.http.get<PokemonSpecies>(pokemon.species.url).pipe(
          switchMap(species =>
            this.http.get<PokemonEvolution>(species.evolution_chain.url).pipe(
              map(evolutionResponse => ({
                pokemon,
                evolutions: this.mapEvolutionChainToPaths(evolutionResponse.chain),
              }))
            )
          )
        )
      )
    );
  }

  private mapEvolutionChainToPaths(chain: Chain): Evolution[][] {
    const paths: Evolution[][] = [];
    this.walkEvolutionTree(chain, [], paths);
    return paths;
  }

  private walkEvolutionTree(node: Chain, currentPath: Evolution[], paths: Evolution[][]): void {
    const currentEvolution: Evolution = {
      id: this.extractIdFromUrl(node.species.url),
      name: node.species.name,
      image: this.buildPokemonArtwork(node.species.url),
    };

    const nextPath = [...currentPath, currentEvolution];

    if (!node.evolves_to.length) {
      paths.push(nextPath);
      return;
    }

    for (const nextEvolution of node.evolves_to) {
      this.walkEvolutionTree(nextEvolution, nextPath, paths);
    }
  }

  private extractIdFromUrl(url: string): string {
    return url.split('/').filter(Boolean).at(-1) ?? '0';
  }

  private buildPokemonArtwork(speciesUrl: string): string {
    const id = this.extractIdFromUrl(speciesUrl);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

}

