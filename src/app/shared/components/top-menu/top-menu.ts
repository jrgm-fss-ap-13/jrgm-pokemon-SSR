import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  imports: [],
  templateUrl: './top-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' }
})
export class TopMenu { }
