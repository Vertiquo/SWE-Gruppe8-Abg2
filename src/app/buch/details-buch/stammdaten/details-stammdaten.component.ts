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
import { type Buch } from '../../shared/buch';
import { DetailsArtComponent } from './details-art.component';
import { DetailsBewertungComponent } from './details-bewertung.component';
import { DetailsDatumComponent } from './details-datum.component';
import { DetailsIsbnComponent } from './details-isbn.component';
import { DetailsLieferbarComponent } from './details-lieferbar.component';
import { DetailsPreisComponent } from './details-preis.component';
import { DetailsRabattComponent } from './details-rabatt.component';
import { DetailsTitelComponent } from './details-titel.component';
import { DetailsVerlagComponent } from './details-verlag.component';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-stammdaten</code>
 */
@Component({
    selector: 'hs-details-stammdaten',
    templateUrl: './details-stammdaten.component.html',
    imports: [
        DetailsArtComponent,
        DetailsBewertungComponent,
        DetailsDatumComponent,
        DetailsIsbnComponent,
        DetailsLieferbarComponent,
        DetailsPreisComponent,
        DetailsRabattComponent,
        DetailsTitelComponent,
        DetailsVerlagComponent,
        NgIf,
    ],
    standalone: true,
})
export class DetailsStammdatenComponent implements OnInit {
    // Property Binding: <hs-details-stammdaten [buch]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    buch!: Buch;

    ngOnInit() {
        log.debug('DetailsStammdatenComponent.buch=', this.buch);
    }
}
