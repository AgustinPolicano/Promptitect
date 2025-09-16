import { Component } from '@angular/core';
import { HeroSectionComponent } from '../hero-section/hero-section';
import { FeatureSection } from '../feature-section/feature-section';
import { PricingHomeSection } from '../pricing-home-section/pricing-home-section';
import { Header } from '../header/header';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Header, HeroSectionComponent, FeatureSection, PricingHomeSection],
  templateUrl: './home-page.html',
})
export class HomePageComponent {}