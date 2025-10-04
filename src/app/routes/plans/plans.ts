import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface PricingPlan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  gradient: string;
}

@Component({
  selector: 'app-plans',
  imports: [CommonModule],
  templateUrl: './plans.html',
  styleUrl: './plans.scss'
})
export class Plans {
  isYearly = signal(false);

  constructor(private router: Router) {}

  navigateToGeneration() {
    this.router.navigate(['/generation']);
  }

  togglePricing() {
    this.isYearly.set(!this.isYearly());
  }

  plans: PricingPlan[] = [
    {
      name: "Starter",
      monthlyPrice: "Free",
      yearlyPrice: "Free",
      period: "forever",
      description: "Perfect for trying out AI floorplan generation",
      features: [
        "5 floorplans per month",
        "Basic room types",
        "PNG export",
        "Community support",
        "Standard templates"
      ],
      cta: "Start Free",
      popular: false,
      gradient: "from-slate-600 to-slate-700"
    },
    {
      name: "Professional",
      monthlyPrice: "$29",
      yearlyPrice: "$290",
      period: "per month",
      description: "For architects and designers who need more power",
      features: [
        "Unlimited floorplans",
        "Advanced room types",
        "CAD exports (DWG, PDF, SVG)",
        "Custom dimensions",
        "Priority support",
        "Revision history",
        "Advanced furniture library"
      ],
      cta: "Start Trial",
      popular: true,
      gradient: "from-blue-600 to-teal-600"
    },
    {
      name: "Enterprise",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      period: "contact us",
      description: "For teams and organizations with advanced needs",
      features: [
        "Everything in Professional",
        "Team collaboration",
        "Custom integrations",
        "API access",
        "White-label options",
        "Dedicated support",
        "Custom training",
        "SLA guarantees"
      ],
      cta: "Contact Sales",
      popular: false,
      gradient: "from-purple-600 to-indigo-600"
    }
  ];

  getCurrentPrice(plan: PricingPlan): string {
    return this.isYearly() ? plan.yearlyPrice : plan.monthlyPrice;
  }

  getPeriodText(plan: PricingPlan): string {
    if (plan.monthlyPrice === 'Free' || plan.monthlyPrice === 'Custom') {
      return plan.period;
    }
    return this.isYearly() ? 'per year' : 'per month';
  }
}
