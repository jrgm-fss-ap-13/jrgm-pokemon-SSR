import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pokemons-list-skeleton',
  imports: [],
  templateUrl: './pokemons-list-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListSkeleton { }
