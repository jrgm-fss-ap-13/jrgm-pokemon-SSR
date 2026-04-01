import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink],
  templateUrl: './side-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' }
})
export class SideMenu { }
