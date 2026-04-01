import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { SimplePokemon } from '../../interfaces';
import { PokemonsList } from '../../shared/components/pokemons-list/pokemons-list';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { PokemonsListSkeleton } from '../../shared/components/pokemons-list-skeleton/pokemons-list-skeleton';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonsList, PokemonsListSkeleton],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPage implements OnInit {

  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  public isLoading = signal(true);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    ),
    { initialValue: 1 }
  );

  public totalPages = computed(() => Math.ceil(this.pokemonsService.totalPokemons() / 15));

  public pagesArray = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    let start = current;

    if (start > total - 2 && total > 2) {
       start = total - 2;
    }
    start = Math.max(1, start);

    const pages = [];
    for (let i = start; i <= start + 2; i++) {
      if (i <= total) {
        pages.push(i);
      }
    }
    return pages;
  });

  public ngOnInit(): void {
    this.loadPokemons();
  }

  public loadPokemons( pageDelta = 0 ){
    
    const pageToLoad = this.currentPage() + pageDelta;

    if (pageToLoad < 1) return;
    if (this.totalPages() > 0 && pageToLoad > this.totalPages()) return;

    this.isLoading.set(true);

    this.pokemonsService.loadPage(pageToLoad)
    .pipe(
      tap( () => 
        this.router.navigate([], {
          queryParams: { page: pageToLoad }
        }))
    )
    .subscribe( pokemons => {
        this.pokemons.set(pokemons);
        this.isLoading.set(false);
      })
  }

  public goToPage(page: number) {
     const current = this.currentPage();
     this.loadPokemons(page - current);
  }

}
