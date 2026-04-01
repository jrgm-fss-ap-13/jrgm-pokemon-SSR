import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './app-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' }
})
export class AppFooter { }
