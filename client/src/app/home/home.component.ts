import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { HeroCarouselComponent } from './hero-carousel/hero-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroCarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
