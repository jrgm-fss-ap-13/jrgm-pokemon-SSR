import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimplePokemon } from '../../../interfaces';
import { PokemonCard } from '../pokemon-card/pokemon-card';

@Component({
  selector: 'app-pokemons-list',
  imports: [PokemonCard],
  templateUrl: './pokemons-list.html',
  styleUrl: './pokemons-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsList {

  public pokemons = input.required<SimplePokemon[]>();

 }
