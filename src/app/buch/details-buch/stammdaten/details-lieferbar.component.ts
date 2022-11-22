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
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-lieferbar</code>
 */
@Component({
    selector: 'hs-details-lieferbar',
    templateUrl: './details-lieferbar.component.html',
    // *ngIf
    imports: [NgIf],
    standalone: true,
})
export class DetailsLieferbarComponent implements OnInit {
    @Input()
    lieferbar: boolean | undefined;

    ngOnInit() {
        log.debug('DetailsLieferbarComponent.lieferbar=', this.lieferbar);
    }
}
