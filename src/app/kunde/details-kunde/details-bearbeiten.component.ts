/*
 * Copyright (C) 2018 - present Juergen Zimmermann, Hochschule Karlsruhe
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
import { RouterLinkWithHref } from '@angular/router';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-bearbeiten</code>
 */
@Component({
    selector: 'hs-details-bearbeiten',
    templateUrl: './details-bearbeiten.component.html',
    imports: [RouterLinkWithHref],
    standalone: true,
})
export class DetailsBearbeitenComponent implements OnInit {
    @Input()
    id: string | undefined;

    ngOnInit() {
        log.debug('DetailsBearbeitenComponent.id=', this.id);
    }
}
