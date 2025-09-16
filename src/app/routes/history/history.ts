import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface FloorplanGeneration {
  id: string;
  prompt: string;
  propertyType: string;
  size: string;
  style: string;
  outputFormat: string;
  createdAt: Date;
  generationTime: number;
  svgData?: string;
}

@Component({
  selector: 'app-history',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './history.html',
  styleUrl: './history.scss'
})
export class History {
  // Search and filter signals
  searchTerm = signal('');
  selectedType = signal('');
  selectedSize = signal('');
  viewMode = signal<'grid' | 'list'>('grid');
  
  // Data signals
  allGenerations = signal<FloorplanGeneration[]>([]);
  filteredGenerations = signal<FloorplanGeneration[]>([]);
  totalGenerations = signal(0);
  isLoadingMore = signal(false);
  currentPage = signal(1);
  itemsPerPage = 12;

  constructor() {
    this.loadMockData();
    this.filterGenerations();
  }

  private loadMockData() {
    // Mock data for demonstration
    const mockGenerations: FloorplanGeneration[] = [
      {
        id: '1',
        prompt: 'Modern 3-bedroom house with open kitchen, living room, master suite with walk-in closet, and 2-car garage',
        propertyType: 'residential',
        size: 'large',
        style: 'modern',
        outputFormat: 'svg',
        createdAt: new Date(2024, 0, 15),
        generationTime: 3.2
      },
      {
        id: '2',
        prompt: 'Compact studio apartment with kitchen island, murphy bed, and separate bathroom',
        propertyType: 'residential',
        size: 'small',
        style: 'minimalist',
        outputFormat: 'png',
        createdAt: new Date(2024, 0, 12),
        generationTime: 2.8
      },
      {
        id: '3',
        prompt: 'Modern office space with open workspace, 2 meeting rooms, kitchen area, and reception',
        propertyType: 'office',
        size: 'medium',
        style: 'contemporary',
        outputFormat: 'dwg',
        createdAt: new Date(2024, 0, 10),
        generationTime: 4.1
      },
      {
        id: '4',
        prompt: 'Restaurant with bar seating, dining area for 40 people, kitchen, and restrooms',
        propertyType: 'restaurant',
        size: 'large',
        style: 'industrial',
        outputFormat: 'pdf',
        createdAt: new Date(2024, 0, 8),
        generationTime: 5.3
      },
      {
        id: '5',
        prompt: 'Luxury 4-bedroom villa with pool area, guest house, and landscaped garden',
        propertyType: 'residential',
        size: 'extra-large',
        style: 'traditional',
        outputFormat: 'svg',
        createdAt: new Date(2024, 0, 5),
        generationTime: 6.7
      },
      {
        id: '6',
        prompt: 'Small retail store with fitting rooms, storage area, and checkout counter',
        propertyType: 'retail',
        size: 'small',
        style: 'modern',
        outputFormat: 'png',
        createdAt: new Date(2024, 0, 3),
        generationTime: 2.1
      },
      {
        id: '7',
        prompt: 'Co-working space with hot desks, private offices, meeting rooms, and coffee bar',
        propertyType: 'office',
        size: 'medium',
        style: 'industrial',
        outputFormat: 'svg',
        createdAt: new Date(2024, 0, 1),
        generationTime: 3.9
      },
      {
        id: '8',
        prompt: 'Two-bedroom apartment with balcony, open plan living, and modern kitchen',
        propertyType: 'residential',
        size: 'medium',
        style: 'contemporary',
        outputFormat: 'dwg',
        createdAt: new Date(2023, 11, 28),
        generationTime: 3.5
      }
    ];

    this.allGenerations.set(mockGenerations);
    this.totalGenerations.set(mockGenerations.length);
  }

  filterGenerations() {
    const search = this.searchTerm().toLowerCase();
    const type = this.selectedType();
    const size = this.selectedSize();
    
    let filtered = this.allGenerations().filter(generation => {
      const matchesSearch = !search || 
        generation.prompt.toLowerCase().includes(search) ||
        generation.propertyType.toLowerCase().includes(search) ||
        generation.style.toLowerCase().includes(search);
      
      const matchesType = !type || generation.propertyType === type;
      const matchesSize = !size || generation.size === size;
      
      return matchesSearch && matchesType && matchesSize;
    });

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    this.filteredGenerations.set(filtered);
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedType.set('');
    this.selectedSize.set('');
    this.filterGenerations();
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
  }

  viewGeneration(generation: FloorplanGeneration) {
    // In a real app, this would navigate to a detail view or open a modal
    console.log('Viewing generation:', generation);
    
    // Mock navigation to generation page with pre-filled data
    alert(`Viewing floorplan: ${generation.prompt.substring(0, 50)}...`);
  }

  downloadGeneration(generation: FloorplanGeneration) {
    // Mock download functionality
    const fileName = `floorplan-${generation.id}.${generation.outputFormat}`;
    console.log(`Downloading ${fileName}...`);
    
    if (generation.outputFormat === 'svg') {
      // Generate mock SVG and download
      const svgContent = this.generateMockSVG(generation);
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Mock other formats
      alert(`Download ${generation.outputFormat.toUpperCase()} format would be implemented here`);
    }
  }

  hasMoreGenerations(): boolean {
    // Mock pagination logic
    return this.filteredGenerations().length >= this.itemsPerPage && this.currentPage() < 3;
  }

  async loadMoreGenerations() {
    if (this.isLoadingMore() || !this.hasMoreGenerations()) return;
    
    this.isLoadingMore.set(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock loading more data
      const currentPage = this.currentPage();
      this.currentPage.set(currentPage + 1);
      
      // In a real app, this would fetch more data from the API
      console.log(`Loading page ${this.currentPage()}...`);
      
    } catch (error) {
      console.error('Failed to load more generations:', error);
    } finally {
      this.isLoadingMore.set(false);
    }
  }

  private generateMockSVG(generation: FloorplanGeneration): string {
    return `
      <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="280" height="200" fill="none" stroke="#2D3748" stroke-width="3"/>
        <line x1="20" y1="80" x2="120" y2="80" stroke="#2D3748" stroke-width="2"/>
        <line x1="140" y1="80" x2="200" y2="80" stroke="#2D3748" stroke-width="2"/>
        <line x1="220" y1="80" x2="300" y2="80" stroke="#2D3748" stroke-width="2"/>
        <text x="160" y="120" text-anchor="middle" fill="#4A5568" font-size="12" font-weight="500">${generation.style} Layout</text>
        <text x="160" y="140" text-anchor="middle" fill="#A0AEC0" font-size="10">${generation.propertyType}</text>
        <text x="160" y="160" text-anchor="middle" fill="#718096" font-size="8">Generated in ${generation.generationTime}s</text>
      </svg>
    `;
  }
}