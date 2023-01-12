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

import { Component, Input, type OnInit } from '@angular/core';
import { DetailsEmailComponent } from './details-email.component';
import { DetailsFamilienstandComponent } from './details-familienstand.component';
import { DetailsGeburtsdatumComponent } from './details-geburtsdatum.component';
import { DetailsHasNewsletterComponent } from './details-hasNewsletter.component';
import { DetailsHomepageComponent } from './details-homepage.component';
import { DetailsInteressenComponent } from './details-interessen.component';
import { DetailsKategorieComponent } from './details-kategorie.component';
import { DetailsNachnameComponent } from './details-nachname.component';
import { type Kunde } from '../../shared/kunde';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-stammdaten</code>
 */
@Component({
    selector: 'hs-details-stammdaten',
    templateUrl: './details-stammdaten.component.html',
    styleUrls: ['../details-kunde.component.scss'],
    imports: [
        DetailsEmailComponent,
        DetailsFamilienstandComponent,
        DetailsGeburtsdatumComponent,
        DetailsHasNewsletterComponent,
        DetailsHomepageComponent,
        DetailsInteressenComponent,
        DetailsKategorieComponent,
        DetailsNachnameComponent,
        NgIf,
    ],
    standalone: true,
})
export class DetailsStammdatenComponent implements OnInit {
    // Property Binding: <hs-details-stammdaten [kunde]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    kunde!: Kunde;

    ngOnInit() {
        log.debug('DetailsStammdatenComponent.kunde=', this.kunde);
    }
}
