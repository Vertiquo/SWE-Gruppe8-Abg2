/*
 * Copyright (C) 2021 - present Juergen Zimmermann, Hochschule Karlsruhe
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
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

import { login, logout } from './login';

// Pfade
const buecherPath = '/buecher';
const createPath = `${buecherPath}/create`;
const updatePath = `${buecherPath}/update`;
const balkendiagrammPath = `${buecherPath}/balkendiagramm`;
const liniendiagrammPath = `${buecherPath}/liniendiagramm`;
const tortendiagrammPath = `${buecherPath}/tortendiagramm`;

// CSS-Selektoren in <main>
const mainSelektor = 'hs-root hs-main';
const homeSelektor = `${mainSelektor} hs-home`;

/* global Cypress, beforeEach, cy, describe, it */

// eslint-disable-next-line max-lines-per-function
describe('Security', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl);
    });

    it('Neuanlegen ohne Login', () => {
        // When
        cy.visit(createPath);

        // Then
        cy.contains(`${homeSelektor} h1`, 'Hallo!');
    });

    it('Neuanlegen ohne die Rolle "admin"', () => {
        // Given
        const username = 'alfred.alpha';

        // When
        login(username);
        cy.visit(createPath);

        // Then
        cy.contains(`${homeSelektor} h1`, 'Hallo!');
        cy.reload();
        logout();
    });

    it('Aendern ohne Login', () => {
        // Given
        const buchId = '00000000-0000-0000-0000-000000000002';

        // When
        cy.visit(`${updatePath}/${buchId}`);

        // Then
        cy.contains(`${homeSelektor} h1`, 'Hallo!');
    });

    it('Balkendiagramm ohne Login', () => {
        // When
        cy.visit(balkendiagrammPath);

        // Then
        cy.contains(`${homeSelektor} h1`, 'Hallo!');
    });

    it('Liniendiagramm ohne Login', () => {
        // When
        cy.visit(liniendiagrammPath);

        // Then
        cy.contains(`${homeSelektor} h1`, 'Hallo!');
    });

    it('tortendiagramm ohne Login', () => {
        // When
        cy.visit(tortendiagrammPath);

        // Then
        cy.contains(`${homeSelektor} h1`, 'Hallo!');
    });
});
