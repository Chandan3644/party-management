import { Routes } from '@angular/router';
import { Login }  from  './features/login/login'
import { PartyList } from './features/party/party-list/party-list';
import { PartyForm } from './features/party/party-form/party-form';
import { AuthGuard } from './core/auth/auth-guard-guard';


export const routes: Routes = [
  { path: '', redirectTo: 'parties', pathMatch: 'full' },

  { path: 'login', component: Login },

  {
    path: 'parties',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PartyList },          
      { path: 'new', component: PartyForm },        
      { path: ':id/edit', component: PartyForm },
      { path: ':id/view', component: PartyForm }  
        
    ]
  },

  { path: '**', redirectTo: 'parties' } 
];



