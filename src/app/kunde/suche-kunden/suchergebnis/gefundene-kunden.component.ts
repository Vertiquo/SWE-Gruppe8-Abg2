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

/* eslint-disable max-classes-per-file */

import {
    AsyncPipe,
    NgForOf,
    NgIf,
    NgLocalization,
    NgPlural,
    NgPluralCase,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
} from '@angular/common';
import { AuthService, ROLLE_ADMIN } from '../../../auth/auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, Input, type OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { easeIn, easeOut } from '../../../shared/animations';
import { first, tap } from 'rxjs/operators';
import { type Kunde } from '../../shared/kunde';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { KundeWriteService } from '../../shared/kundeWrite.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RemoveError } from '../../shared/errors';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-gefundene-kunden</code>, um zun&auml;chst
 * das Warten und danach das Ergebnis der Suche anzuzeigen, d.h. die gefundenen
 * B&uuml;cher oder eine Fehlermeldung.
 */
@Component({
    selector: 'hs-gefundene-kunden',
    templateUrl: './gefundene-kunden.component.html',
    animations: [easeIn, easeOut],
    imports: [
        AsyncPipe,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
        NgForOf,
        NgIf,
        NgPlural,
        NgPluralCase,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault,
        RouterLinkWithHref,
    ],
    standalone: true,
})
export class GefundeneKundenComponent implements OnInit {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek wie beispielsweise Redux http://redux.js.org

    // Property Binding: <hs-gefundene-kunden [kunden]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    kunden: Kunde[] = [];

    protected isAdmin!: boolean;

    // nachtraegliches Einloggen mit der Rolle "admin" beobachten
    protected isAdmin$ = new Subject<boolean>();

    displayedColumns: string[] = [
        'nachname',
        'familienstand',
        'geschlecht',
        'hasNewsletter',
        'update',
    ];

    // Parameter Properties (Empfehlung: Konstruktor nur fuer DI)
    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly writeService: KundeWriteService,
    ) {
        log.debug('GefundeneKundenComponent.constructor()');
    }

    // Attribute mit @Input() sind undefined im Konstruktor.
    // Methode zum "LifeCycle Hook" OnInit: wird direkt nach dem Konstruktor
    // aufgerufen.
    // Weitere Methoden zum Lifecycle: ngAfterViewInit(), ngAfterContentInit()
    // https://angular.io/docs/ts/latest/guide/cheatsheet.html
    // Die Ableitung vom Interface OnInit ist nicht notwendig, aber erleichtert
    // IntelliSense bei der Verwendung von TypeScript.
    ngOnInit() {
        log.debug('GefundeneKundenComponent.ngOnInit()');
        this.isAdmin = this.authService.isAdmin;

        this.authService.rollen$
            .pipe(
                first(),
                tap((rollen: string[]) =>
                    // ein neues Observable vom Typ boolean
                    this.isAdmin$.next(rollen.includes(ROLLE_ADMIN)),
                ),
            )
            // das Subject von AuthService abonnieren bzw. beobachten
            .subscribe();
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Kunde in der Detailsseite anzeigen.
     * @param kunde Das ausgew&auml;hlte Kunde
     */
    onClick(kunde: Kunde) {
        log.debug('GefundeneKundenComponent.onClick: kunde=', kunde);

        // URL mit der Kunde-ID, um ein Bookmark zu ermoeglichen
        // Gefundenes Kunde als NavigationExtras im Router puffern
        const state = { kunde };
        return this.router.navigate([`/kunden/${kunde.id}`], { state });
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Kunde l&ouml;schen.
     * @param kunde Das ausgew&auml;hlte Kunde
     */
    onRemove(kunde: Kunde) {
        log.debug('GefundeneKundenComponent.onRemove: kunde=', kunde);

        return this.writeService
            .remove(kunde)
            .pipe(
                first(),
                tap(result => {
                    if (result instanceof RemoveError) {
                        log.debug(
                            'GefundeneKundenComponent.onRemove: statuscode=',
                            result.statuscode,
                        );
                        return;
                    }

                    this.kunden = this.kunden.filter(b => b.id !== kunde.id);
                }),
            )
            .subscribe();
    }

    trackBy(_index: number, kunde: Kunde) {
        return kunde.id;
    }
}

export class AnzahlLocalization extends NgLocalization {
    getPluralCategory(count: number) {
        return count === 1 ? 'single' : 'multi';
    }
}

/* eslint-enable max-classes-per-file */
