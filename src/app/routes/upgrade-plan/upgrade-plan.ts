import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  recommended?: boolean;
  popular?: boolean;
  credits: number;
  generations: string;
  buttonText: string;
  buttonStyle: string;
}

@Component({
  selector: 'app-upgrade-plan',
  imports: [CommonModule, RouterModule],
  templateUrl: './upgrade-plan.html',
  styleUrl: './upgrade-plan.scss'
})
export class UpgradePlanComponent {
  
  pricingPlans = signal<PricingPlan[]>([
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'month',
      description: 'Perfect for getting started',
      features: [
        '5 generations per day',
        'Basic templates',
        'Standard resolution',
        'Community support',
        'Watermarked exports'
      ],
      credits: 150,
      generations: '150/month',
      buttonText: 'Current Plan',
      buttonStyle: 'bg-slate-600 text-slate-300 cursor-not-allowed'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19,
      period: 'month',
      description: 'For professional designers',
      features: [
        'Unlimited generations',
        'Premium templates',
        'High resolution exports',
        'Priority support',
        'No watermarks',
        'Commercial license',
        'Advanced customization'
      ],
      recommended: true,
      popular: true,
      credits: 8500,
      generations: 'Unlimited',
      buttonText: 'Upgrade to Pro',
      buttonStyle: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49,
      period: 'month',
      description: 'For teams and businesses',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'API access',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
        'Custom training',
        'White-label options'
      ],
      credits: 25000,
      generations: 'Unlimited',
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white'
    }
  ]);

  selectedPeriod = signal<'monthly' | 'yearly'>('monthly');

  constructor() {}

  togglePeriod() {
    this.selectedPeriod.set(this.selectedPeriod() === 'monthly' ? 'yearly' : 'monthly');
  }

  getPrice(plan: PricingPlan): number {
    if (plan.price === 0) return 0;
    return this.selectedPeriod() === 'yearly' ? Math.floor(plan.price * 10) : plan.price;
  }

  getPeriodText(): string {
    return this.selectedPeriod() === 'yearly' ? 'year' : 'month';
  }

  getDiscount(): string {
    return this.selectedPeriod() === 'yearly' ? '2 months free!' : '';
  }

  getGradient(planId: string): string {
    switch (planId) {
      case 'free':
        return 'from-slate-600 to-slate-700';
      case 'pro':
        return 'from-blue-600 to-teal-600';
      case 'enterprise':
        return 'from-purple-600 to-indigo-600';
      default:
        return 'from-slate-600 to-slate-700';
    }
  }

  selectPlan(plan: PricingPlan) {
    if (plan.id === 'free') return;
    
    console.log(`Selected plan: ${plan.name}`);
    // Here you would integrate with your payment provider
    alert(`🚀 Redirecting to checkout for ${plan.name} plan...`);
  }
}