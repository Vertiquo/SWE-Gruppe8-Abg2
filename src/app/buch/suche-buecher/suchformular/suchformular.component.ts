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

import { type BuchArt, type Verlag } from '../../shared/buch';
import { Component, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { SucheArtComponent } from './suche-art.component';
import { SucheSchlagwoerterComponent } from './suche-schlagwoerter.component';
import { SucheTitelComponent } from './suche-titel.component';
import { SucheVerlagComponent } from './suche-verlag.component';
import { type Suchkriterien } from '../../shared/buchRead.service';
import { fadeIn } from '../../../shared/animations';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suchformular</code>
 */
@Component({
    selector: 'hs-suchformular',
    templateUrl: './suchformular.component.html',
    animations: [fadeIn],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SucheArtComponent,
        SucheSchlagwoerterComponent,
        SucheTitelComponent,
        SucheVerlagComponent,
    ],
    standalone: true,
})
export class SuchformularComponent {
    // Event Binding: <hs-suchformular (suchkriterien$)="...">
    // in RxJS: Observables = Event-Streaming mit Promises
    // Subject fuer @Output: abgeleitet von Observable mit zusaetzl. Funktion next()
    // Ein Subject kann MEHRERE Observer benachrichtigen ("Multicast")
    // https://angular.io/guide/component-interaction#parent-listens-for-child-event
    // Suffix "$" wird als "Finnish Notation" bezeichnet https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b
    @Output()
    protected readonly suchkriterien$ = new Subject<Suchkriterien>();

    #titel = '';

    #verlag: Verlag | '' = '';

    #art: BuchArt | '' = '';

    #javascript = false;

    #typescript = false;

    // DI: Constructor Injection (React hat uebrigens keine DI)
    // Empfehlung: Konstruktor nur fuer DI
    constructor() {
        log.debug('SuchformularComponent.constructor()');
    }

    setTitel(titel: string) {
        log.debug('SuchformularComponent.setTitel', titel);
        this.#titel = titel;
    }

    setVerlag(verlag: Verlag | '') {
        log.debug('SuchformularComponent.setVerlag', verlag);
        this.#verlag = verlag;
    }

    setArt(art: string) {
        log.debug('SuchformularComponent.setArt', art);
        this.#art = art as BuchArt;
    }

    setJavascript(isChecked: boolean) {
        log.debug('SuchformularComponent.setJavascript', isChecked);
        this.#javascript = isChecked;
    }

    setTypescript(isChecked: boolean) {
        log.debug('SuchformularComponent.setTypescript', isChecked);
        this.#typescript = isChecked;
    }

    /**
     * Suche nach B&uuml;chern, die den spezfizierten Suchkriterien entsprechen
     */
    onSubmit() {
        log.debug(
            'SuchformularComponent.onSubmit: titel / verlag / art / javascript / typescript',
            this.#titel,
            this.#verlag,
            this.#art,
            this.#javascript,
            this.#typescript,
        );

        this.suchkriterien$.next({
            titel: this.#titel,
            verlag: this.#verlag,
            art: this.#art,
            schlagwoerter: {
                javascript: this.#javascript,
                typescript: this.#typescript,
            },
        });
    }
}
