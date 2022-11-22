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
import {
    type DataItem,
    type MultiSeries,
    NgxChartsModule,
} from '@swimlane/ngx-charts';
import { first, map, tap } from 'rxjs/operators';
import { type Buch } from '../shared/buch';
import { BuchReadService } from '../shared/buchRead.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { FindError } from '../shared/errors';
import { KeineBuecherError } from './errors';
import log from 'loglevel';

/**
 * Komponente mit dem CSS-Selektor &lt;hs-liniendiagramm&gt; zur Visualisierung
 * von Bewertungen durch ein Liniendiagramm.
 */
@Component({
    selector: 'hs-liniendiagramm',
    templateUrl: './liniendiagramm.html',
    imports: [NgxChartsModule],
    standalone: true,
})
export class LiniendiagrammComponent implements OnInit {
    protected series!: MultiSeries;

    constructor(private readonly service: BuchReadService) {
        log.debug('LiniendiagrammComponent.constructor()');
    }

    /**
     * Daten fuer das Liniendiagramm bereitstellen.
     */
    ngOnInit() {
        log.debug('LiniendiagrammComponent.ngOnInit()');
        this.#setSeries();
    }

    #setSeries() {
        this.service
            .find()
            .pipe(
                first(),
                map(result => {
                    if (result instanceof FindError) {
                        throw new KeineBuecherError();
                    }

                    return result.filter(buch => buch.rating !== undefined);
                }),
                tap(buchItems => {
                    const bewertungItems = this.#getBewertungItems(buchItems);
                    const preisItems = this.#getPreisItems(buchItems);
                    this.#initSeries(bewertungItems, preisItems);
                }),
            )
            .subscribe();
    }

    // https://swimlane.gitbook.io/ngx-charts/examples/line-area-charts/line-chart
    #getBewertungItems(buecher: Buch[]): DataItem[] {
        // eslint-disable-next-line arrow-body-style
        return buecher.map(buch => {
            return {
                name: buch.id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                value: buch.rating!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
            };
        });
    }

    #getPreisItems(buecher: Buch[]): DataItem[] {
        // eslint-disable-next-line arrow-body-style
        return buecher.map(buch => {
            return {
                name: buch.id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                value: buch.preis,
            };
        });
    }

    #initSeries(bewertungItems: DataItem[], preisItems: DataItem[]) {
        const series: MultiSeries = [
            {
                name: 'Bewertungen',
                series: bewertungItems,
            },
            {
                name: 'Preise',
                series: preisItems,
            },
        ];

        this.series = series;
    }
}
