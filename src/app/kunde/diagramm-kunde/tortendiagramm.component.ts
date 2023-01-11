/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { Component, type OnInit } from '@angular/core';
import { type DataItem, NgxChartsModule } from '@swimlane/ngx-charts';
import { first, map, tap } from 'rxjs/operators';
import { FindError } from '../shared/errors';
import { KeineKundenError } from './errors';
import { type Kunde } from '../shared/kunde';
import { KundeReadService } from '../shared/kundeRead.service';
import log from 'loglevel';

/**
 * Komponente mit dem CSS-Selektor &lt;hs-tortendiagramm&gt; zur Visualisierung
 * von Bewertungen durch ein Tortendiagramm.
 */
@Component({
    selector: 'hs-tortendiagramm',
    templateUrl: './tortendiagramm.component.html',
    imports: [NgxChartsModule],
    standalone: true,
})
export class TortendiagrammComponent implements OnInit {
    protected dataItems!: DataItem[];

    constructor(private readonly service: KundeReadService) {
        log.debug('TortendiagrammComponent.constructor()');
    }

    /**
     * Daten fuer das Tortendiagramm bereitstellen.
     */
    ngOnInit() {
        log.debug('TortendiagrammComponent.ngOnInit()');
        this.#setDataItems();
    }

    #setDataItems() {
        this.service
            .find()
            .pipe(
                first(),
                map(result => {
                    if (result instanceof FindError) {
                        throw new KeineKundenError();
                    }

                    return result
                        .filter(kunde => kunde.kategorie >= 0)
                        .map(kunde => this.#toDataItem(kunde));
                }),
                tap(dataItems => {
                    this.dataItems = dataItems;
                }),
            )
            .subscribe();
    }

    // https://stackblitz.com/edit/swimlane-pie-chart?embed=1&file=app/app.component.ts
    #toDataItem(kunde: Kunde): DataItem {
        return {
            name: kunde.id!,
            value: kunde.kategorie,
        };
    }
}
