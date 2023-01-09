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
 * You should have received a copy oSf the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, Output } from '@angular/core';
import { type Familienstand } from '../../shared';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente fuer den CSS-Selektor <code>hs-suche-art</code>
 */
@Component({
    selector: 'hs-suche-familienstand',
    templateUrl: './suche-familienstand.component.html',
    imports: [FormsModule],
    standalone: true,
})
export class SucheFamilienstandComponent {
    protected familienstand: Familienstand | '' = '';

    @Output()
    protected readonly familienstand$ = new Subject<Familienstand | ''>();

    constructor() {
        log.debug('SucheArtComponent.constructor()');
    }

    onChange(event: Event) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
        const { value } = event.target as HTMLInputElement;
        log.debug(`SucheArtComponent.onChange: familienstand=${value}`);
        this.familienstand$.next(value as Familienstand | '');
    }
}
