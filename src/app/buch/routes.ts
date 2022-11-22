/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { BalkendiagrammComponent } from './diagramme/balkendiagramm.component';
import { CreateBuchComponent } from './create-buch/create-buch.component';
import { DetailsBuchComponent } from './details-buch/details-buch.component';
import { HomeComponent } from '../home/home.component';
import { LiniendiagrammComponent } from './diagramme/liniendiagramm.component';
import { type Routes } from '@angular/router';
import { SucheBuecherComponent } from './suche-buecher/suche-buecher.component';
import { TortendiagrammComponent } from './diagramme/tortendiagramm.component';
import { UpdateBuchComponent } from './update-buch/update-buch.component';
import { canDeactivateGuard } from './create-buch/create-deactivate.guard';
import { isAdminGuard } from '../auth/isAdmin.guard';

// Route-Definitionen fuer das Feature-Modul "buch":
// Zuordnung von Pfaden und Komponenten mit HTML-Templates
export const ROUTES: Routes = [
    {
        path: 'suche',
        component: SucheBuecherComponent,
        title: 'Suche',
    },
    {
        path: 'create',
        component: CreateBuchComponent,
        title: 'Neues Buch',
        canMatch: [isAdminGuard],
        canDeactivate: [canDeactivateGuard],
    },
    {
        path: 'create',
        component: HomeComponent,
        title: 'Beispiel',
    },
    {
        path: 'balkendiagramm',
        component: BalkendiagrammComponent,
        title: 'Balkendiagramm',
        canMatch: [isAdminGuard],
    },
    {
        path: 'balkendiagramm',
        component: HomeComponent,
        title: 'Beispiel',
    },
    {
        path: 'liniendiagramm',
        component: LiniendiagrammComponent,
        title: 'Liniendiagramm',
        canMatch: [isAdminGuard],
    },
    {
        path: 'liniendiagramm',
        component: HomeComponent,
        title: 'Beispiel',
    },
    {
        path: 'tortendiagramm',
        component: TortendiagrammComponent,
        title: 'Tortendiagramm',
        canMatch: [isAdminGuard],
    },
    {
        path: 'tortendiagramm',
        component: HomeComponent,
        title: 'Beispiel',
    },

    // id als Pfad-Parameter
    {
        path: 'update/:id',
        component: UpdateBuchComponent,
        canMatch: [isAdminGuard],
    },
    {
        path: 'update/:id',
        component: HomeComponent,
        title: 'Beispiel',
    },
    {
        path: ':id',
        component: DetailsBuchComponent,
    },
];
