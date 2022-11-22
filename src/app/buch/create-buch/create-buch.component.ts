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

import { type BuchForm, toBuch } from './buchForm';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';
import { BuchWriteService } from '../shared/buchWrite.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component } from '@angular/core';
import { CreateArtComponent } from './create-art.component';
import { CreateDatumModule } from './create-datum.module';
import { CreateIsbnComponent } from './create-isbn.component';
import { CreateLieferbarComponent } from './create-lieferbar.component';
import { CreatePreisComponent } from './create-preis.component';
import { CreateRabattComponent } from './create-rabatt.component';
import { CreateRatingComponent } from './create-rating.component';
import { CreateSchlagwoerterComponent } from './create-schlagwoerter.component';
import { CreateTitelComponent } from './create-titel.component';
import { CreateVerlagComponent } from './create-verlag.component';
import { ErrorMessageComponent } from '../../shared/error-message.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { SaveError } from '../shared/errors';
import log from 'loglevel';

/**
 * Komponente mit dem CSS-Selektor &lt;create-buch&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'hs-create-buch',
    templateUrl: './create-buch.component.html',
    imports: [
        CreateArtComponent,
        CreateDatumModule,
        CreateIsbnComponent,
        CreateLieferbarComponent,
        CreatePreisComponent,
        CreateRabattComponent,
        CreateRatingComponent,
        CreateSchlagwoerterComponent,
        CreateTitelComponent,
        CreateVerlagComponent,
        ErrorMessageComponent,
        NgIf,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class CreateBuchComponent {
    protected readonly form = new FormGroup({});

    showWarning = false;

    fertig = false;

    protected errorMsg: string | undefined = undefined;

    constructor(
        private readonly service: BuchWriteService,
        private readonly router: Router,
    ) {
        log.debug(
            'CreateBuchComponent.constructor: Injizierter Router:',
            router,
        );
    }

    /**
     * Die Methode <code>onSubmit</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um ein neues Buch anzulegen.
     */
    onSubmit() {
        // In einem Control oder in einer FormGroup gibt es u.a. folgende
        // Properties
        //    value     JSON-Objekt mit den IDs aus der FormGroup als
        //              Schluessel und den zugehoerigen Werten
        //    errors    Map<string,any> mit den Fehlern, z.B. {'required': true}
        //    valid/invalid     fuer valide Werte
        //    dirty/pristine    falls der Wert geaendert wurde

        if (this.form.invalid) {
            log.debug(
                'CreateBuchComponent.onSave: Validierungsfehler',
                this.form,
            );
            return;
        }

        const buchForm = this.form.value as BuchForm;
        const neuesBuch = toBuch(buchForm);
        log.debug('CreateBuchComponent.onSave: neuesBuch=', neuesBuch);

        this.service
            .save(neuesBuch)
            .pipe(
                // 1. Datensatz empfangen und danach implizites "unsubscribe"
                first(),
                tap(result => this.#setProps(result)),
            )
            // asynchrone Funktionen nur bei subscribe, nicht bei tap
            .subscribe({ next: () => this.#navigateHome() });
    }

    #setProps(result: SaveError | string) {
        if (result instanceof SaveError) {
            this.#handleError(result);
            return;
        }

        this.fertig = true;
        this.showWarning = false;
        this.errorMsg = undefined;

        const id = result;
        log.debug('CreateBuchComponent.#setProps: id=', id);
    }

    #handleError(err: SaveError) {
        const { statuscode } = err;
        log.debug(
            `CreateBuchComponent.#handleError: statuscode=${statuscode}, err=`,
            err,
        );

        switch (statuscode) {
            case HttpStatusCode.UnprocessableEntity: {
                const { cause } = err;
                // TODO Aufbereitung der Fehlermeldung: u.a. Anfuehrungszeichen
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.errorMsg =
                    cause instanceof HttpErrorResponse
                        ? cause.error
                        : JSON.stringify(cause);
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
    }

    async #navigateHome() {
        if (this.errorMsg === undefined) {
            log.debug('CreateBuchComponent.#navigateHome: Navigation');
            await this.router.navigate(['/']);
        }
    }
}
