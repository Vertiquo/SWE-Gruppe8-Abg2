/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable sort-imports */
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

// import { BalkendiagrammComponent } from './diagramme/balkendiagramm.component';
import { type Routes } from '@angular/router';
import { canDeactivateGuard } from './create-kunde/create-deactivate.guard';
import { CreateKundeComponent } from './create-kunde/create-kunde.component';
import { DetailsKundeComponent } from './details-kunde/details-kunde.component';
import { HomeComponent } from '../home/home.component';
import { isAdminGuard } from '../auth/isAdmin.guard';
// import { LiniendiagrammComponent } from './diagramme/liniendiagramm.component';
import { SucheKundenComponent } from './suche-kunden/suche-kunden.component';
// import { TortendiagrammComponent } from './diagramme/tortendiagramm.component';
// import { UpdateKundeComponent } from './update-kunde/update-kunde.component';
import { TortendiagrammComponent } from './diagramm-kunde/tortendiagramm.component';

// Route-Definitionen fuer das Feature-Modul "kunde":
// Zuordnung von Pfaden und Komponenten mit HTML-Templates
export const ROUTES: Routes = [
    {
        path: 'suche',
        component: SucheKundenComponent,
        title: 'Suche',
    },
    {
        path: 'create',
        component: CreateKundeComponent,
        title: 'Neuer Kunde',
        canMatch: [isAdminGuard],
        canDeactivate: [canDeactivateGuard],
    },
    {
        path: 'create',
        component: HomeComponent,
        title: 'Beispiel',
    },
    {
        path: 'diagramm',
        component: TortendiagrammComponent,
        title: 'Diagramm',
        canMatch: [isAdminGuard],
    },
    /*  {
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
    */

    // id als Pfad-Parameter
    /*  {
        path: 'update/:id',
        component: UpdateKundeComponent,
        canMatch: [isAdminGuard],
    },
    */
    {
        path: 'update/:id',
        component: HomeComponent,
        title: 'Beispiel',
    },
    {
        path: ':id',
        component: DetailsKundeComponent,
    },
];
