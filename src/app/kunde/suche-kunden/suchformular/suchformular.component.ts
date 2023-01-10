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
import { type Familienstand, type Geschlecht } from '../../shared/kunde';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
import { SucheFamilienstandComponent } from './suche-familienstand.component';
import { SucheGeschlechtComponent } from './suche-geschlecht.component';
import { SucheHasNewsletterComponent } from './suche-hasNewsletter.component';
import { SucheNachnameComponent } from './suche-nachname.component';
import { type Suchkriterien } from '../../shared/kundeRead.service';
import { fadeIn } from '../../../shared/animations';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suchformular</code>
 */
@Component({
    selector: 'hs-suchformular',
    templateUrl: './suchformular.component.html',
    styleUrls: ['./suchformular.component.scss'],
    animations: [fadeIn],
    imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule,
        ReactiveFormsModule,
        SucheNachnameComponent,
        SucheGeschlechtComponent,
        SucheFamilienstandComponent,
        SucheHasNewsletterComponent,
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

    #nachname = '';

    #geschlecht: Geschlecht | '' = '';

    #familienstand: Familienstand | '' = '';

    #hasNewsletter = false;

    // DI: Constructor Injection (React hat uebrigens keine DI)
    // Empfehlung: Konstruktor nur fuer DI
    constructor() {
        log.debug('SuchformularComponent.constructor()');
    }

    setNachname(nachname: string) {
        log.debug('SuchformularComponent.setNachname', nachname);
        this.#nachname = nachname;
    }

    setGeschlecht(geschlecht: Geschlecht | '') {
        log.debug('SuchformularComponent.setGeschlecht', geschlecht);
        this.#geschlecht = geschlecht;
    }

    setFamilienstand(familienstand: Familienstand | '') {
        log.debug('SuchformularComponent.setFamilienstand', familienstand);
        this.#familienstand = familienstand;
    }

    setHasNewsletter(isChecked: boolean) {
        log.debug('SuchformularComponent.setHasNewsletter', isChecked);
        this.#hasNewsletter = isChecked;
    }

    /**
     * Suche nach Kunden, die den spezfizierten Suchkriterien entsprechen
     */
    onSubmit() {
        log.debug(
            'SuchformularComponent.onSubmit: nachname / geschlecht / familienstand / hasNewsletter',
            this.#nachname,
            this.#geschlecht,
            this.#familienstand,
            this.#hasNewsletter,
        );

        this.suchkriterien$.next({
            nachname: this.#nachname,
            geschlecht: this.#geschlecht,
            familienstand: this.#familienstand,
            hasNewsletter: this.#hasNewsletter,
        });
    }
}
