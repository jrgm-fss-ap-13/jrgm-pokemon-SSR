import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Evolution, Pokemon } from '../../interfaces';
import { PokemonsService } from '../../services/pokemons.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonDetailSkeleton } from '../../shared/components/pokemon-detail-skeleton/pokemon-detail-skeleton';
import { typeColors } from '../../shared/utils/pokemon-type-colors';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  imports: [PokemonDetailSkeleton, CommonModule, RouterModule],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonDetail implements OnInit {

  private pokemonService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);


  public Pokemon = signal<Pokemon | null>(null);
  public evolutionPaths = signal<Evolution[][]>([]);
  public readonly typeColors = typeColors;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonService.loadPokemonById(id)
    .pipe(
      tap(({ pokemon }) => {
        this.title.setTitle(`#${pokemon.id} - ${pokemon.name}`);
        this.meta.updateTag({ name: 'description', content: `Pokemon ${pokemon.name}` });
        this.meta.updateTag({ name: 'og:image', content: pokemon.sprites.front_default });
      })
    )
    .subscribe(({ pokemon, evolutions }) => {
      this.Pokemon.set(pokemon);
      this.evolutionPaths.set(evolutions);
    });
  }

}
