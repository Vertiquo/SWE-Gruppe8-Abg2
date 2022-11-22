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

import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suche-titel</code>
 */
@Component({
    selector: 'hs-suche-titel',
    templateUrl: './suche-titel.component.html',
    imports: [FormsModule],
    standalone: true,
})
export class SucheTitelComponent {
    protected titel = '';

    // Event Binding: <hs-suche-titel (suchkriterien$)="...">
    // in RxJS: Observables für Event-Streaming
    // Subject fuer @Output: abgeleitet von Observable mit zusaetzl. Funktion next()
    // Ein Subject kann MEHRERE Observer benachrichtigen ("Multicast")
    // https://angular.io/guide/component-interaction#parent-listens-for-child-event
    // Suffix "$" wird als "Finnish Notation" bezeichnet https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b
    @Output()
    protected readonly titel$ = new Subject<string>();

    constructor() {
        log.debug('SucheTitelComponent.constructor()');
    }

    onBlur() {
        log.debug(`SucheTitelComponent.onBlur: titel=${this.titel}`);
        this.titel$.next(this.titel);
    }
}
