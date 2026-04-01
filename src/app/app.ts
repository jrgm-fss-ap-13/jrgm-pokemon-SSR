import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from './shared/components/side-menu/side-menu';
import { TopMenu } from './shared/components/top-menu/top-menu';
import { MobileMenu } from './shared/components/mobile-menu/mobile-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenu, TopMenu, MobileMenu],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // No usar `display: contents` en el root: rompe la hidratación SSR y puede duplicar el DOM en el cliente.
  host: { class: 'block w-full min-h-screen min-w-0' },
})
export class App {
  protected readonly title = signal('pokemon-ssr');
}
