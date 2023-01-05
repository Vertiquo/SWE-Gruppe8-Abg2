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
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suche-hasNewsletter</code>
 */
@Component({
    selector: 'hs-suche-hasnewsletter',
    templateUrl: './suche-hasNewsletter.component.html',
    imports: [FormsModule],
    standalone: true,
})
export class SucheHasNewsletterComponent {
    protected hasNewsletter = false;

    @Output()
    protected readonly hasNewsletter$ = new Subject<boolean>();

    constructor() {
        log.debug('SucheHasNewsletterComponent.constructor()');
    }

    onChangeHasNewsletter(event: Event) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
        const { checked } = event.target as HTMLInputElement;
        log.debug(
            `SucheHasNewsletterComponent.onChangeHasNewsletter: checked=${checked}`,
        );
        this.hasNewsletter$.next(checked);
    }
}
