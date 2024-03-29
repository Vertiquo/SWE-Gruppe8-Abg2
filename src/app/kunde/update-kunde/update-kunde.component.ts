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

import { ActivatedRoute, Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, type OnInit } from '@angular/core';
import {
    type Familienstand,
    type Geschlecht,
    type Kunde,
} from '../shared/kunde';
import { FindError, UpdateError } from '../shared/errors';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { first, map, tap } from 'rxjs/operators';
import { ErrorMessageComponent } from '../../shared/error-message.component';
import { KundeReadService } from '../shared/kundeRead.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { KundeWriteService } from '../shared/kundeWrite.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { UpdateFamilienstandComponent } from './update-familienstand.component';
import { UpdateGeschlechtComponent } from './update-geschlecht.component';
import { UpdateHomepageComponent } from './update-homepage.component';
import { UpdateNachnameComponent } from './update-nachname.component';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-update-kunde</code>
 */
@Component({
    selector: 'hs-update-kunde',
    templateUrl: './update-kunde.component.html',
    styleUrls: ['./update-kunde.component.scss'],
    imports: [
        FormsModule,
        ErrorMessageComponent,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatTooltipModule,
        NgIf,
        ReactiveFormsModule,
        UpdateFamilienstandComponent,
        UpdateHomepageComponent,
        UpdateGeschlechtComponent,
        UpdateNachnameComponent,
    ],
    standalone: true,
})
export class UpdateKundeComponent implements OnInit {
    protected kunde: Kunde | undefined;

    protected readonly updateForm = new FormGroup({});

    showWarning = false;

    protected errorMsg: string | undefined;

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: KundeWriteService,
        private readonly readService: KundeReadService,
        private readonly titleService: Title,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
        log.debug('UpdateKundeComponent.constructor()');
    }

    ngOnInit() {
        // Pfad-Parameter aus /kunden/:id/update
        const id = this.route.snapshot.paramMap.get('id') ?? undefined;

        this.readService
            .findById(id)
            .pipe(
                first(),
                tap(result => {
                    this.#setProps(result);
                    log.debug(
                        'UpdateKundeComponent.ngOnInit: kunde=',
                        this.kunde,
                    );
                }),
            )
            .subscribe();
    }

    /**
     * Die aktuellen Stammdaten f&uuml;r das angezeigte Kunde-Objekt
     * zur&uuml;ckschreiben.
     */
    onSubmit() {
        if (this.updateForm.pristine || this.kunde === undefined) {
            log.debug('UpdateKundeComponent.onSubmit: keine Aenderungen');
            return;
        }

        const { nachname } = this.updateForm.value as { nachname: string };
        const { homepage } = this.updateForm.value as { homepage: string };
        const { familienstand } = this.updateForm.value as {
            familienstand: Familienstand;
        };
        const { geschlecht } = this.updateForm.value as {
            geschlecht: Geschlecht;
        };

        const { kunde, service } = this;

        // datum, preis und rabatt koennen im Formular nicht geaendert werden
        kunde.nachname = nachname;
        kunde.homepage = homepage;
        kunde.geschlecht = geschlecht;
        kunde.familienstand = familienstand;
        log.debug('UpdateKundeComponent.onSubmit: kunde=', kunde);

        service
            .update(kunde)
            .pipe(
                first(),
                map(result => this.#handleUpdateResult(result)),
            )
            /* eslint-disable object-curly-newline */
            .subscribe({
                next: (b: Kunde | undefined) => this.#navigateDetails(b),
            });
        /* eslint-enable object-curly-newline */
    }

    #setProps(result: FindError | Kunde) {
        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.kunde = result;
        this.errorMsg = undefined;

        const titel = `Aktualisieren ${this.kunde.id}`;
        this.titleService.setTitle(titel);
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug('UpdateKundeComponent.#handleError: statuscode=', statuscode);

        this.kunde = undefined;

        switch (statuscode) {
            case HttpStatusCode.NotFound: {
                this.errorMsg = 'Kein Kunde gefunden.';
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

    #handleUpdateResult(result: Kunde | UpdateError) {
        if (!(result instanceof UpdateError)) {
            return result;
        }

        const { statuscode } = result;
        log.debug(
            'UpdateStammdatenComponent.#handleError: statuscode=',
            statuscode,
        );

        switch (statuscode) {
            case HttpStatusCode.UnprocessableEntity: {
                const { cause } = result;
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

        log.debug(
            'UpdateStammdatenComponent.#handleError: errorMsg=',
            this.errorMsg,
        );
        // eslint-disable-next-line no-useless-return
        return;
    }

    async #navigateDetails(kunde: Kunde | undefined) {
        if (kunde === undefined) {
            return;
        }

        // Gefundenen Kunden als NavigationExtras im Router puffern
        const state = { kunde };
        await this.router.navigate([`/kunde/${kunde.id}`], { state });
    }
}
