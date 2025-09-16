import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isMobileMenuOpen = signal(false);

  constructor(private router: Router) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
    this.closeMobileMenu();
  }

  navigateToGeneration() {
    this.router.navigate(['/generation']);
    this.closeMobileMenu();
  }
}
