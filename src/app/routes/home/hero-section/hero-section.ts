import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-section.html',
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  currentPrompt = '';
  isGenerating = false;
  floorplanVisible = false;

  private timeouts: any[] = [];
  private intervals: any[] = [];
  private destroyed = false;

  examplePrompts = [
    '2-bedroom house with patio and garage',
    'Modern office space with conference room',
    'Studio apartment with kitchen island',
    'Family home with open floor plan',
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.timeouts.push(setTimeout(() => (this.floorplanVisible = true), 1000));
    // arranca el ciclo de tipeo
    this.runTypeCycle(0);
  }

  private runTypeCycle(index: number) {
    if (!isPlatformBrowser(this.platformId) || this.destroyed) return;

    const prompt = this.examplePrompts[index];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      this.currentPrompt = prompt.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex >= prompt.length) {
        clearInterval(typeInterval);
        this.intervals = this.intervals.filter((i) => i !== typeInterval);

        const pause = setTimeout(() => {
          if (this.destroyed) return;
          const next = (index + 1) % this.examplePrompts.length;
          this.runTypeCycle(next);
        }, 1800);
        this.timeouts.push(pause);
      }
    }, 50);

    this.intervals.push(typeInterval);
  }

  handleGenerate() {
    this.isGenerating = true;
    const t = setTimeout(() => (this.isGenerating = false), 2000);
    this.timeouts.push(t);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.timeouts.forEach((t) => clearTimeout(t));
    this.intervals.forEach((i) => clearInterval(i));
  }
}
