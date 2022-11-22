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
import { type Buch, type BuchShared } from '../shared/buch';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede Checkbox und
 *  <li> au&szlig;erdem Strings f&uuml;r Eingabefelder f&uuml;r Zahlen.
 * </ul>
 */
export interface BuchForm extends BuchShared {
    rating: string;
    datum: Date;
    javascript: boolean;
    typescript: boolean;
}

/**
 * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
 * @param buch JSON-Objekt mit Daten vom Formular
 * @return Das initialisierte Buch-Objekt
 */
export const toBuch = (buchForm: BuchForm) => {
    log.debug('toBuch: buchForm=', buchForm);

    const {
        titel,
        rating,
        art,
        verlag,
        datum,
        preis,
        rabatt,
        lieferbar,
        javascript,
        typescript,
        isbn,
    } = buchForm;

    const ratingNumber = Number(rating);

    const datumTemporal = new Temporal.PlainDate(
        datum.getFullYear(),
        datum.getMonth() + 1,
        datum.getDate(),
    );
    log.debug('toBuch: datumTemporal=', datumTemporal);

    const rabattNumber = rabatt === undefined ? 0 : rabatt / 100; // eslint-disable-line @typescript-eslint/no-magic-numbers

    const schlagwoerter: string[] = [];
    if (javascript) {
        schlagwoerter.push('JAVASCRIPT');
    }
    if (typescript) {
        schlagwoerter.push('TYPESCRIPT');
    }

    const buch: Buch = {
        id: undefined,
        titel: titel ?? 'unbekannt',
        rating: ratingNumber,
        art,
        verlag,
        datum: datumTemporal,
        preis,
        rabatt: rabattNumber,
        lieferbar,
        schlagwoerter,
        isbn,
        version: 0,
    };
    log.debug('toBuch: buch=', buch);
    return buch;
};
