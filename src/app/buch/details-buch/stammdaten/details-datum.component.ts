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
import { type Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-datum</code>
 */
@Component({
    selector: 'hs-details-datum',
    templateUrl: './details-datum.component.html',
    standalone: true,
})
export class DetailsDatumComponent implements OnInit {
    @Input()
    datum: Temporal.PlainDate | undefined;

    ngOnInit() {
        log.debug('DetailsDatumComponent: datum=', this.datum);
    }
}
