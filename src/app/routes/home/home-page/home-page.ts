import { Component } from '@angular/core';
import { HeroSectionComponent } from '../hero-section/hero-section';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroSectionComponent],
  templateUrl: './home-page.html',
})
export class HomePageComponent {}