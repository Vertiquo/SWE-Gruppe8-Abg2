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
import { type Buch } from '../../shared/buch';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { BuchWriteService } from '../../shared/buchWrite.service';
import { RemoveError } from '../../shared/errors';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-gefundene-buecher</code>, um zun&auml;chst
 * das Warten und danach das Ergebnis der Suche anzuzeigen, d.h. die gefundenen
 * B&uuml;cher oder eine Fehlermeldung.
 */
@Component({
    selector: 'hs-gefundene-buecher',
    templateUrl: './gefundene-buecher.component.html',
    animations: [easeIn, easeOut],
    imports: [
        AsyncPipe,
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
export class GefundeneBuecherComponent implements OnInit {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek wie beispielsweise Redux http://redux.js.org

    // Property Binding: <hs-gefundene-buecher [buecher]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    buecher: Buch[] = [];

    protected isAdmin!: boolean;

    // nachtraegliches Einloggen mit der Rolle "admin" beobachten
    protected isAdmin$ = new Subject<boolean>();

    // Parameter Properties (Empfehlung: Konstruktor nur fuer DI)
    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly writeService: BuchWriteService,
    ) {
        log.debug('GefundeneBuecherComponent.constructor()');
    }

    // Attribute mit @Input() sind undefined im Konstruktor.
    // Methode zum "LifeCycle Hook" OnInit: wird direkt nach dem Konstruktor
    // aufgerufen.
    // Weitere Methoden zum Lifecycle: ngAfterViewInit(), ngAfterContentInit()
    // https://angular.io/docs/ts/latest/guide/cheatsheet.html
    // Die Ableitung vom Interface OnInit ist nicht notwendig, aber erleichtert
    // IntelliSense bei der Verwendung von TypeScript.
    ngOnInit() {
        log.debug('GefundeneBuecherComponent.ngOnInit()');
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
     * Das ausgew&auml;hlte bzw. angeklickte Buch in der Detailsseite anzeigen.
     * @param buch Das ausgew&auml;hlte Buch
     */
    onClick(buch: Buch) {
        log.debug('GefundeneBuecherComponent.onClick: buch=', buch);

        // URL mit der Buch-ID, um ein Bookmark zu ermoeglichen
        // Gefundenes Buch als NavigationExtras im Router puffern
        const state = { buch };
        return this.router.navigate([`/buecher/${buch.id}`], { state });
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Buch l&ouml;schen.
     * @param buch Das ausgew&auml;hlte Buch
     */
    onRemove(buch: Buch) {
        log.debug('GefundeneBuecherComponent.onRemove: buch=', buch);

        return this.writeService
            .remove(buch)
            .pipe(
                first(),
                tap(result => {
                    if (result instanceof RemoveError) {
                        log.debug(
                            'GefundeneBuecherComponent.onRemove: statuscode=',
                            result.statuscode,
                        );
                        return;
                    }

                    this.buecher = this.buecher.filter(b => b.id !== buch.id);
                }),
            )
            .subscribe();
    }

    trackBy(_index: number, buch: Buch) {
        return buch.id;
    }
}

export class AnzahlLocalization extends NgLocalization {
    getPluralCategory(count: number) {
        return count === 1 ? 'single' : 'multi';
    }
}

/* eslint-enable max-classes-per-file */
