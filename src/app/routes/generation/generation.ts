import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface GenerationForm {
  prompt: string;
  propertyType: string;
  size: string;
  style: string;
  outputFormat: string;
}

interface FloorplanGeneration {
  id: string;
  prompt: string;
  propertyType: string;
  size: string;
  style: string;
  outputFormat: string;
  timestamp: Date;
  generationTime: number;
  svgData?: string;
}

@Component({
  selector: 'app-generation',
  imports: [CommonModule, FormsModule],
  templateUrl: './generation.html',
  styleUrl: './generation.scss'
})
export class Generation {
  isGenerating = signal(false);
  currentGeneration = signal<FloorplanGeneration | null>(null);
  generationHistory = signal<FloorplanGeneration[]>([]);

  formData: GenerationForm = {
    prompt: '',
    propertyType: 'residential',
    size: 'medium',
    style: 'modern',
    outputFormat: 'svg'
  };

  useTemplate(template: string) {
    this.formData.prompt = template;
  }

  async generateFloorplan() {
    if (!this.formData.prompt.trim()) return;

    this.isGenerating.set(true);
    
    try {
      // Simulate API call delay
      const startTime = Date.now();
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
      const endTime = Date.now();
      const generationTime = Math.round((endTime - startTime) / 100) / 10;

      // Create new generation
      const newGeneration: FloorplanGeneration = {
        id: Date.now().toString(),
        prompt: this.formData.prompt,
        propertyType: this.formData.propertyType,
        size: this.formData.size,
        style: this.formData.style,
        outputFormat: this.formData.outputFormat,
        timestamp: new Date(),
        generationTime,
        svgData: this.generateMockSVG()
      };

      // Update current generation
      this.currentGeneration.set(newGeneration);

      // Add to history
      const currentHistory = this.generationHistory();
      this.generationHistory.set([newGeneration, ...currentHistory].slice(0, 10)); // Keep last 10

      console.log('Generated floorplan:', newGeneration);
      
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      this.isGenerating.set(false);
    }
  }

  selectGeneration(generation: FloorplanGeneration) {
    this.currentGeneration.set(generation);
    // Optionally update form data to match selected generation
    this.formData = {
      prompt: generation.prompt,
      propertyType: generation.propertyType,
      size: generation.size,
      style: generation.style,
      outputFormat: generation.outputFormat
    };
  }

  downloadFloorplan(format: string) {
    const generation = this.currentGeneration();
    if (!generation) return;

    // Mock download functionality
    const fileName = `floorplan-${generation.id}.${format}`;
    console.log(`Downloading ${fileName}...`);
    
    // In a real app, this would trigger an actual download
    if (format === 'svg' && generation.svgData) {
      const blob = new Blob([generation.svgData], { type: 'image/svg+xml' });
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
      alert(`Download ${format.toUpperCase()} format would be implemented here`);
    }
  }

  shareFloorplan() {
    const generation = this.currentGeneration();
    if (!generation) return;

    // Mock sharing functionality
    const shareData = {
      title: 'My Generated Floorplan',
      text: generation.prompt,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Floorplan URL copied to clipboard!');
    }
  }

  private generateMockSVG(): string {
    const generation = this.currentGeneration();
    return `
      <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="280" height="200" fill="none" stroke="#2D3748" stroke-width="3"/>
        <line x1="20" y1="80" x2="120" y2="80" stroke="#2D3748" stroke-width="2"/>
        <line x1="140" y1="80" x2="200" y2="80" stroke="#2D3748" stroke-width="2"/>
        <line x1="220" y1="80" x2="300" y2="80" stroke="#2D3748" stroke-width="2"/>
        <text x="160" y="120" text-anchor="middle" class="fill-slate-600 text-xs font-medium">${this.formData.style} Layout</text>
        <text x="160" y="140" text-anchor="middle" class="fill-slate-400 text-xs">AI Generated</text>
      </svg>
    `;
  }
}
