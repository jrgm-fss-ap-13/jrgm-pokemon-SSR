import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { title } from 'process';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  styleUrl: './pricing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPage implements OnInit { 

  private title = inject(Title)
  private meta = inject(Meta)
  private platform = inject(PLATFORM_ID) //Da informacion sobre que plataforma se ejecuta el codigo (server o browser)

  ngOnInit(): void {
    // if (isPlatformBrowser(this.platform)){
    //   document.title = 'Pricing Page';
    // }

    this.title.setTitle('About')
    this.meta.updateTag({name: 'description', content: 'Este es mi About Page'})
    this.meta.updateTag({name: 'og:title', content: 'Este es mi About Page'})
    this.meta.updateTag({name: 'keywords', content: 'Jorge Fuentes'})
  } 

}