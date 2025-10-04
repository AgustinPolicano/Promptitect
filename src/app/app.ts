import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FooterComponent } from './shared/footer/footer';
import { Sidebar } from './shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, Sidebar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Promptitect');
  showFooter = signal(true);
  showSidebar = signal(true); // Mock: This would come from auth service
  
  constructor(private router: Router) {
    // Listen to route changes to conditionally show/hide footer
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Hide footer on login and generation pages
      const hiddenFooterPages = ['/login', '/generation' , '/history' , '/plans' , '/settings'];
      this.showFooter.set(!hiddenFooterPages.some(page => event.url.includes(page)));
      
      // Show sidebar on authenticated pages (generation, history, plans, settings)
      const sidebarPages = ['/generation', '/history', '/settings' , '/login'];
      const shouldShowSidebar = sidebarPages.some(page => event.url.includes(page));
      
      // Only show sidebar if user is logged in AND on a sidebar page
      // For now, we'll mock this. In real app, this would check auth state
      this.showSidebar.set(shouldShowSidebar);
    });
  }
}
