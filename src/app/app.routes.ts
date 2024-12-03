import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { InvestmentAdviceComponent } from './components/projects/investment-advice/investment-advice/investment-advice.component';
import { ArtGuesserComponent } from './components/projects/art-guesser/art-guesser.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'investment-assitant', component: InvestmentAdviceComponent},
    {path: 'art-guesser', component: ArtGuesserComponent}
];
