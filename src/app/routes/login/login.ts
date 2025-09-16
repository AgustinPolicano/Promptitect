import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  isLogin = signal(true);
  showPassword = signal(false);
  
  formData: FormData = {
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  };

  constructor(private router: Router, private location: Location) {}

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  toggleMode() {
    this.isLogin.set(!this.isLogin());
    // Reset form when switching modes
    this.formData = {
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    };
  }

  handleSubmit() {
    // Handle login/signup logic here
    console.log('Form submitted:', this.formData);
    console.log('Is Login mode:', this.isLogin());
    
    // Here you would typically call an authentication service
    // For now, just log the data
  }

  goBack() {
    this.location.back();
  }
}
