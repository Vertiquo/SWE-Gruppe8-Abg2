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

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    BuchReadService,
    type Suchkriterien,
} from '../shared/buchRead.service';
import { first, tap } from 'rxjs/operators';
import { type Buch } from '../shared/buch';
import { Component } from '@angular/core';
import { FindError } from '../shared/errors';
import { HttpStatusCode } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { SuchergebnisComponent } from './suchergebnis/suchergebnis.component';
import { SuchformularComponent } from './suchformular/suchformular.component';
import { WaitingComponent } from './../../shared/waiting.component';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>&lt;hs-suche-buecher&gt;</code>,
 * die aus den Kindkomponenten f&uuml;r diese CSS-Selektoren besteht:
 * <ul>
 *  <li> <code>hs-suchformular</code>
 *  <li> <code>hs-waiting</code>
 *  <li> <code>hs-suchergebnis</code>
 * </ul>
 */
@Component({
    selector: 'hs-suche-buecher',
    templateUrl: './suche-buecher.component.html',
    imports: [
        NgIf,
        SuchergebnisComponent,
        SuchformularComponent,
        WaitingComponent,
    ],
    standalone: true,
})
export class SucheBuecherComponent {
    protected waiting = false;

    protected buecher: Buch[] = [];

    protected errorMsg: string | undefined;

    // Parameter Properties (Empfehlung: Konstruktor nur fuer DI)
    constructor(private readonly service: BuchReadService) {
        log.debug('SucheBuecherComponent.constructor()');
    }

    /**
     * Das Attribut <code>suchkriterien</code> wird auf den Wert des Ereignisses
     * <code>suchkriterien</code> vom Typ Suchkriterien gesetzt. Diese Methode
     * wird aufgerufen, wenn in der Kindkomponente f&uuml;r
     * <code>hs-suchformular</code> das Ereignis ausgel&ouml;st wird.
     *
     * @param suchkriterien f&uuml;r die Suche.
     */
    suchen(suchkriterien: Suchkriterien) {
        log.debug(
            'SucheBuecherComponent.suchen: suchkriterien=',
            suchkriterien,
        );

        this.buecher = [];
        this.errorMsg = undefined;

        this.waiting = true;

        // Observable: mehrere Werte werden "lazy" bereitgestellt, statt in einem JSON-Array
        // pipe ist eine "pure" Funktion, die ein Observable in ein NEUES Observable transformiert
        this.service
            .find(suchkriterien) // eslint-disable-line unicorn/no-array-callback-reference
            .pipe(
                first(),
                tap(result => this.#setProps(result)),
            )
            .subscribe();
    }

    #setProps(result: Buch[] | FindError) {
        this.waiting = false;

        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.buecher = result;
        log.debug('SucheBuecherComponent.#setProps: buecher=', this.buecher);
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug(
            'SucheBuecherComponent.#handleError: statuscode=',
            statuscode,
        );

        this.buecher = [];

        switch (statuscode) {
            case HttpStatusCode.NotFound: {
                this.errorMsg = 'Keine Bücher gefunden.';
                break;
            }
            case HttpStatusCode.TooManyRequests: {
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;
            }
            case HttpStatusCode.GatewayTimeout: {
                this.errorMsg = 'Ein interner Fehler ist aufgetreten.';
                log.error('Laeuft der Appserver? Port-Forwarding?');
                break;
            }
            default: {
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
                break;
            }
        }

        log.debug(
            'SucheBuecherComponent.#setErrorMsg: errorMsg=',
            this.errorMsg,
        );
    }
}
