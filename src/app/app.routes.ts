import { Routes } from '@angular/router';
import { HomePageComponent } from './routes/home/home-page/home-page';
import { Login } from './routes/login/login';
import { Generation } from './routes/generation/generation';
import { History } from './routes/history/history';
import { UpgradePlanComponent } from './routes/upgrade-plan/upgrade-plan';

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
  {
    path: 'upgrade',
    component: UpgradePlanComponent,
  },

];
