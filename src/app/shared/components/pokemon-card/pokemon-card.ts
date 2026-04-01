import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { SimplePokemon } from '../../../interfaces';
import { RouterLink } from '@angular/router';
import { typeColors } from '../../utils/pokemon-type-colors';


@Component({
  selector: 'app-pokemon-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './pokemon-card.html',
  host: { class: 'contents' }
})
export class PokemonCard {

  pokemon = input.required<SimplePokemon>();

  public readonly typeColors = typeColors;

  // logEffect = effect(() => {
  //   console.log('PokemonCard:', this.pokemon());
  // })

}
