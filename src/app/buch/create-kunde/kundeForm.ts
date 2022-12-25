/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable max-lines-per-function */
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
import {
    type Adresse,
    type Familienstand,
    type Geschlecht,
    type Kunde,
    type KundeShared,
    type Umsatz,
} from '../shared/kunde';
import { Temporal } from '@js-temporal/polyfill';
import { type Url } from 'node:url';
import log from 'loglevel';

/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede Checkbox und
 *  <li> au&szlig;erdem Strings f&uuml;r Eingabefelder f&uuml;r Zahlen.
 * </ul>
 */
export interface KundeForm extends KundeShared {
    geburtsdatum: Date;
    homepage: Url;
    geschlecht: Geschlecht;
    familienstand: Familienstand;
    lesen: boolean;
    reisen: boolean;
    sport: boolean;
    betrag: bigint;
    waehrung: string;
    plz: string;
    ort: string;
}

/**
 * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
 * @param kunde JSON-Objekt mit Daten vom Formular
 * @return Das initialisierte Kunde-Objekt
 */
export const toKunde = (kundeForm: KundeForm) => {
    log.debug('toKunde: kundeForm=', kundeForm);

    const {
        nachname,
        email,
        kategorie,
        hasNewsletter,
        geburtsdatum,
        homepage,
        geschlecht,
        familienstand,
        lesen,
        reisen,
        sport,
        betrag,
        waehrung,
        plz,
        ort,
    } = kundeForm;

    const adresse: Adresse = {
        plz,
        ort,
    };

    const umsatz: Umsatz = {
        betrag,
        waehrung,
    };

    const interessen: string[] = [];
    if (lesen) {
        interessen.push('LESEN');
    }
    if (reisen) {
        interessen.push('REISEN');
    }
    if (sport) {
        interessen.push('SPORT');
    }

    const datumTemporal = new Temporal.PlainDate(
        geburtsdatum.getFullYear(),
        geburtsdatum.getMonth() + 1,
        geburtsdatum.getDate(),
    );
    // TODO Somehow the datumTemporal gets overwritten with the current date before being passed on as kunde.
    log.debug('toKunde: datumTemporal=', datumTemporal);

    const kunde: Kunde = {
        nachname,
        email,
        kategorie,
        hasNewsletter,
        geburtsdatum: datumTemporal,
        homepage,
        geschlecht,
        familienstand,
        interessen,
        umsatz,
        adresse,
        version: 0,
        id: undefined,
    };
    log.debug('toKunde: kunde=', kunde);
    return kunde;
};
