/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { HomeComponent } from './home/home.component';
import { type Routes } from '@angular/router';

// Route-Definitionen fuer den Root-Router
// Eine Route leitet zu einer neuen Ansicht ("View") in der SPA, wobei die
// vorherige Ansicht ueberdeckt bzw. ausgeblendet wird.
export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '',
        // redirect erfordert pathMatch full
        pathMatch: 'full',
        component: HomeComponent,
        title: 'Beispiel',
    },
    {
        path: 'buecher',
        // Lazy Loading (statt Eager Loading) durch dynamische Imports (seit ES 2020)
        // loadChildren statt component wie bei '/'
        // https://angular.io/guide/lazy-loading-ngmodules
        loadChildren: () => import('./buch/routes').then(mod => mod.ROUTES),
    },
];
