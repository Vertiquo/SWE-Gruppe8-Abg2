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
import { type Temporal } from '@js-temporal/polyfill';
import { type Url } from 'node:url';

export const MAX_RATING = 5;

export type Familienstand =
    | 'GESCHIEDEN'
    | 'LEDIG'
    | 'VERHEIRATET'
    | 'VERWITWET';

export type Geschlecht = 'DIVERS' | 'MAENNLICH' | 'WEIBLICH';

export type Interessen = 'LESEN' | 'REISEN' | 'SPORT';

export interface Umsatz {
    betrag: bigint;
    waehrung: string;
}

export interface User {
    username: string;
    password: string;
}

export interface Adresse {
    plz: string;
    ort: string;
}

export const EMAIL_REGEX = /@.*?\./u;

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export interface Kunde {
    id: string | undefined;
    version: number | undefined;
    nachname: string;
    email: string | undefined;
    kategorie: number | undefined;
    hasNewsletter: boolean;
    geburtsdatum: Temporal.PlainDate | undefined;
    homepage: Url | undefined;
    geschlecht: Geschlecht;
    familienstand: Familienstand;
    interessen: string[];
    umsatz: Umsatz;
    adresse: Adresse;
}

/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Kundedaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 * Verwendung in den Interfaces:
 * - KundeServer für KundeReadService
 * - KundeForm für CreateKundeComponent
 */
export interface KundeShared {
    nachname: string;
    email?: string | undefined;
    kategorie?: number | undefined;
    hasNewsletter: boolean;
    adresse: Adresse;
}
