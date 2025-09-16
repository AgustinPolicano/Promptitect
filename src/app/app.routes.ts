import { Routes } from '@angular/router';
import { HomePageComponent } from './routes/home/home-page/home-page';
import { Login } from './routes/login/login';
import { Generation } from './routes/generation/generation';
import { History } from './routes/history/history';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'generation',
    component: Generation,
  },
  {
    path: 'history',
    component: History,
  },

];
