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
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-isbn</code>
 */
@Component({
    selector: 'hs-details-isbn',
    templateUrl: './details-isbn.component.html',
    standalone: true,
})
export class DetailsIsbnComponent implements OnInit {
    @Input()
    isbn!: string;

    ngOnInit() {
        log.debug('DetailsIsbnComponent.isbn=', this.isbn);
    }
}
