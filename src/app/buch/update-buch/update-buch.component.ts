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
import { type Buch, type BuchArt, type Verlag } from '../shared/buch';
import { Component, type OnInit } from '@angular/core';
import { FindError, UpdateError } from '../shared/errors';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { first, map, tap } from 'rxjs/operators';
import { BuchReadService } from '../shared/buchRead.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { BuchWriteService } from '../shared/buchWrite.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { ErrorMessageComponent } from '../../shared/error-message.component';
import { NgIf } from '@angular/common';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { UpdateArtComponent } from './update-art.component';
import { UpdateIsbnComponent } from './update-isbn.component';
import { UpdateRatingComponent } from './update-rating.component';
import { UpdateTitelComponent } from './update-titel.component';
import { UpdateVerlagComponent } from './update-verlag.component';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-update-buch</code>
 */
@Component({
    selector: 'hs-update-buch',
    templateUrl: './update-buch.component.html',
    imports: [
        ErrorMessageComponent,
        NgIf,
        ReactiveFormsModule,
        UpdateArtComponent,
        UpdateIsbnComponent,
        UpdateRatingComponent,
        UpdateTitelComponent,
        UpdateVerlagComponent,
    ],
    standalone: true,
})
export class UpdateBuchComponent implements OnInit {
    protected buch: Buch | undefined;

    protected readonly form = new FormGroup({});

    protected errorMsg: string | undefined;

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: BuchWriteService,
        private readonly readService: BuchReadService,
        private readonly titleService: Title,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
        log.debug('UpdateBuchComponent.constructor()');
    }

    ngOnInit() {
        // Pfad-Parameter aus /buecher/:id/update
        const id = this.route.snapshot.paramMap.get('id') ?? undefined;

        this.readService
            .findById(id)
            .pipe(
                first(),
                tap(result => {
                    this.#setProps(result);
                    log.debug('UpdateBuchComponent.ngOnInit: buch=', this.buch);
                }),
            )
            .subscribe();
    }

    /**
     * Die aktuellen Stammdaten f&uuml;r das angezeigte Buch-Objekt
     * zur&uuml;ckschreiben.
     */
    onSubmit() {
        if (this.form.pristine || this.buch === undefined) {
            log.debug('UpdateBuchComponent.onSubmit: keine Aenderungen');
            return;
        }

        const { titel } = this.form.value as { titel: string };
        const { art } = this.form.value as { art: BuchArt };
        const { verlag } = this.form.value as {
            verlag: Verlag | '' | undefined;
        };
        const { rating } = this.form.value as { rating: number };
        const { isbn } = this.form.value as { isbn: string };

        const { buch, service } = this;

        // datum, preis und rabatt koennen im Formular nicht geaendert werden
        buch.titel = titel;
        buch.art = art;
        buch.verlag = verlag;
        buch.rating = rating;
        buch.isbn = isbn;
        log.debug('UpdateBuchComponent.onSubmit: buch=', buch);

        service
            .update(buch)
            .pipe(
                first(),
                map(result => this.#handleUpdateResult(result)),
            )
            /* eslint-disable object-curly-newline */
            .subscribe({
                next: (b: Buch | undefined) => this.#navigateDetails(b),
            });
        /* eslint-enable object-curly-newline */
    }

    #setProps(result: Buch | FindError) {
        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.buch = result;
        this.errorMsg = undefined;

        const titel = `Aktualisieren ${this.buch.id}`;
        this.titleService.setTitle(titel);
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug('UpdateBuchComponent.#handleError: statuscode=', statuscode);

        this.buch = undefined;

        switch (statuscode) {
            case HttpStatusCode.NotFound: {
                this.errorMsg = 'Kein Buch gefunden.';
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

    #handleUpdateResult(result: Buch | UpdateError) {
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

    async #navigateDetails(buch: Buch | undefined) {
        if (buch === undefined) {
            return;
        }

        // Gefundenes Buch als NavigationExtras im Router puffern
        const state = { buch };
        await this.router.navigate([`/buecher/${buch.id}`], { state });
    }
}
