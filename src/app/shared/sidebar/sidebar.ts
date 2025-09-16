import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  avatar?: string;
}

interface UserStats {
  generated: number;
  saved: number;
  shared: number;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  isSidebarOpen = signal(false);
  isLoggedIn = signal(true); // Mock: Should be connected to actual auth service
  
  // Mock user data - this would come from an auth service
  currentUser = signal<User>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'Pro Plan'
  });

  userStats = signal<UserStats>({
    generated: 47,
    saved: 12,
    shared: 8
  });

  // Credits system
  remainingCredits = signal(23);

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  openSidebar() {
    this.isSidebarOpen.set(true);
  }

  onMobileNavigate() {
    // Close sidebar on mobile after navigation
    this.closeSidebar();
  }

  getUserInitials(): string {
    const user = this.currentUser();
    if (user?.name) {
      return user.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return 'U';
  }

  isPro(): boolean {
    return this.currentUser()?.plan?.toLowerCase().includes('pro') || false;
  }

  logout() {
    // Mock logout - this would call actual auth service
    console.log('Logging out...');
    this.isLoggedIn.set(false);
    this.router.navigate(['/']);
    
    // Reset user data
    this.currentUser.set({
      id: '',
      name: '',
      email: '',
      plan: ''
    });
    
    this.userStats.set({
      generated: 0,
      saved: 0,
      shared: 0
    });
  }

  // Mock method to simulate login
  login(user: User) {
    this.isLoggedIn.set(true);
    this.currentUser.set(user);
    this.userStats.set({
      generated: Math.floor(Math.random() * 50) + 10,
      saved: Math.floor(Math.random() * 20) + 5,
      shared: Math.floor(Math.random() * 15) + 3
    });
  }

  upgradePlan() {
    // Mock upgrade - this would call actual billing service
    console.log('Upgrading plan...');
    
    // Show upgrade modal or redirect to billing page
    alert('🚀 Redirecting to upgrade page...\n\n✨ Pro Plan Features:\n• Unlimited generations\n• Priority support\n• Advanced export formats\n• API access\n\nStarting at $19/month');
    
    // In a real app, you would:
    // this.router.navigate(['/billing/upgrade']);
    // or open a modal with billing form
  }

  buyCredits() {
    // Mock buy credits - this would call actual payment service
    console.log('Buying credits...');
    
    // Show credits purchase modal
    const choice = confirm('💳 Purchase Credits\n\nChoose your package:\n\n• 10 credits - $5\n• 50 credits - $20 (Popular!)\n• 100 credits - $35 (Best value!)\n\nClick OK for 50 credits package, Cancel for other options');
    
    if (choice) {
      // Simulate successful purchase
      const currentCredits = this.remainingCredits();
      this.remainingCredits.set(currentCredits + 50);
      alert('✅ Success! 50 credits added to your account.\n\nNew balance: ' + this.remainingCredits() + ' credits');
    } else {
      alert('💡 Visit our pricing page to see all credit packages and choose the best option for you!');
    }
    
    // In a real app, you would:
    // this.router.navigate(['/billing/credits']);
    // or open a payment modal with Stripe/PayPal integration
  }

  settings() {
    // Mock settings - this would call actual settings service
    console.log('Opening settings...');
    // Here you would typically redirect to settings page
    // this.router.navigate(['/settings']);
  }

  myPlans() {
    // Mock my plans - this would call actual plans service
    console.log('Opening my plans...');
    // Here you would typically redirect to plans page
    // this.router.navigate(['/plans']);
  }

  
}
