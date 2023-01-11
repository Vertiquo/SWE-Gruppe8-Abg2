/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { type KundeForm, toKunde } from './kundeForm';
import { first, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateBetragComponent } from './create-betrag.component';
import { CreateEmailComponent } from './create-email.component';
import { CreateFamilienstandComponent } from './create-familienstand.component';
import { CreateGeburtsdatumComponent } from './create-geburtsdatum.component';
import { CreateGeschlechtComponent } from './create-geschlecht.component';
import { CreateHasNewsletterComponent } from './create-hasNewsletter.component';
import { CreateHomepageComponent } from './create-homepage.component';
import { CreateInteressenComponent } from './create-interessen.component';
import { CreateKategorieComponent } from './create-kategorie.component';
import { CreateNachnameComponent } from './create-nachname.component';
import { CreateOrtComponent } from './create-ort.component';
import { CreatePlzComponent } from './create-plz.component';
import { CreateWaehrungComponent } from './create-waehrung.component';
import { KundeWriteService } from '../shared/kundeWrite.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { SaveError } from '../shared/errors';
import log from 'loglevel';

/**
 * Komponente mit dem Tag "hs-create-kunde" um das Erfassungsformular
 * für einen neuen Kunde zu realisieren.
 */
@Component({
    selector: 'hs-create-kunde',
    templateUrl: './create-kunde.component.html',
    styleUrls: ['./create-kunde.component.scss'],
    imports: [
        CreateNachnameComponent,
        CreateEmailComponent,
        CreateKategorieComponent,
        CreateHasNewsletterComponent,
        CreateGeburtsdatumComponent,
        CreateHomepageComponent,
        CreateGeschlechtComponent,
        CreateFamilienstandComponent,
        CreateInteressenComponent,
        CreateBetragComponent,
        CreateWaehrungComponent,
        CreatePlzComponent,
        CreateOrtComponent,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class CreateKundeComponent {
    readonly createForm = new FormGroup({});

    showWarning = false;

    fertig = false;

    errorMsg: string | undefined = undefined;

    constructor(
        private readonly service: KundeWriteService,
        private readonly router: Router,
    ) {
        log.debug(
            'CreateKundeComponent.constructor: Injizierter Router:',
            router,
        );
    }

    /**
     * Die Methode <code>onSubmit</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um einen neuen Kunde anzulegen.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    onSubmit() {
        // In einem Control oder in einer FormGroup gibt es u.a. folgende
        // Properties
        //    value     JSON-Objekt mit den IDs aus der FormGroup als
        //              Schluessel und den zugehoerigen Werten
        //    errors    Map<string,any> mit den Fehlern, z.B. {'required': true}
        //    valid/invalid     fuer valide Werte
        //    dirty/pristine    falls der Wert geaendert wurde

        log.debug(this.createForm.value);

        if (this.createForm.invalid) {
            log.debug(
                'CreateKundeComponent.onSave: Validierungsfehler',
                this.createForm,
            );
            return;
        }

        const kundeForm = this.createForm.value as KundeForm;
        const neuerKunde = toKunde(kundeForm);
        log.debug('CreateKundeComponent.onSave: neuerKunde=', neuerKunde);

        this.service
            .save(neuerKunde)
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

        const id: string = result;
        log.debug('CreateKundeComponent.#setProps: id=', id);
    }

    #handleError(err: SaveError) {
        const { statuscode } = err;
        log.debug(
            `CreateKundeComponent.#handleError: statuscode=${statuscode}, err=`,
            err,
        );

        switch (statuscode) {
            case HttpStatusCode.UnprocessableEntity: {
                const { cause } = err;
                // TODO Aufbereitung der Fehlermeldung: u.a. Anfuehrungszeichen
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
            log.debug('CreateKundeComponent.#navigateHome: Navigation');
            await this.router.navigate(['/']);
        }
    }
}
