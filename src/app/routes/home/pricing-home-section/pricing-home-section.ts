import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  gradient: string;
}

@Component({
  selector: 'app-pricing-home-section',
  imports: [CommonModule],
  templateUrl: './pricing-home-section.html',
  styleUrl: './pricing-home-section.scss'
})
export class PricingHomeSection {
  plans: PricingPlan[] = [
    {
      name: "Starter",
      price: "Free",
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
      price: "$29",
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
      price: "Custom",
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
}
