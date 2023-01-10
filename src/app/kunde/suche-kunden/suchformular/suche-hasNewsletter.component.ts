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
import type { MatCheckboxChange} from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suche-hasNewsletter</code>
 */
@Component({
    selector: 'hs-suche-hasnewsletter',
    templateUrl: './suche-hasNewsletter.component.html',
    styleUrls: ['./suchformular.component.scss'],
    imports: [
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule,
    ],
    standalone: true,
})
export class SucheHasNewsletterComponent {
    protected hasNewsletter = false;

    @Output()
    protected readonly hasNewsletter$ = new Subject<boolean>();

    constructor() {
        log.debug('SucheHasNewsletterComponent.constructor()');
    }

    onChange(event: MatCheckboxChange) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
        log.debug(
            `SucheHasNewsletterComponent.onChange: hasNewsletter=${event.checked}`,
        );
        const value = event.checked;
        this.hasNewsletter$.next(value);
    }
}
