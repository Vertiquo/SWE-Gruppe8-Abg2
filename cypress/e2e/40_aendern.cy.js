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

// CSS-Selektoren in der Navigationsleiste, vgl.: XPath
const navSelektor = 'hs-root hs-header hs-nav';
const suchePath = '/buecher/suche';
const sucheSelektor = `${navSelektor} ul li a[routerLink="${suchePath}"]`;

// CSS-Selektoren in <main>
const mainSelektor = 'hs-root hs-main';
const suchformularSelektor = `${mainSelektor} hs-suche-buecher hs-suchformular`;
const gefundeneBuecherSelektor = `${mainSelektor} hs-suchergebnis hs-gefundene-buecher`;
const detailsSelektor = `${mainSelektor} hs-details-buch`;
const bearbeitenSelektor = `${detailsSelektor} hs-details-bearbeiten`;

const updateFormSelektor = `${mainSelektor} hs-update-buch form`;
const updateTitelSelektor = '#titelUpdate';
const updateArtSelektor = 'hs-update-art select';
const updateVerlagSelektor = 'hs-update-verlag select';

const detailsTitelSelektor = 'hs-details-titel div div';
const detailsArtSelektor = 'hs-details-art div div span span';
const detailsVerlagSelektor = 'hs-details-verlag div div span span';

/* global Cypress, cy, describe, it, beforeEach, afterEach */

describe('Aendern', () => {
    beforeEach(() => {
        // Seite aufrufen: siehe cypress.json
        cy.visit(Cypress.config().baseUrl);
        login();
    });
    afterEach(() => {
        cy.reload();
        logout();
    });

    it('Aendern des Buchs mit ID "00000000-0000-0000-0000-000000000002"', () => {
        // Given
        const titel = 'a';
        const buchId = '00000000-0000-0000-0000-000000000002';
        const neuerTitel = 'Beta Cypress';
        const neueArt = 'Druckausgabe';
        const neuerVerlag = 'Foo Verlag';

        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('#titelInput').type(titel);
            cy.get('button').click();
        });
        cy.get(`${gefundeneBuecherSelektor} tr td:nth-child(2)`)
            .contains(buchId)
            .click();

        // When
        cy.get(bearbeitenSelektor).contains('span', 'Bearbeiten').click();
        cy.get(updateFormSelektor).within(() => {
            cy.get(updateTitelSelektor).clear();
            cy.get(updateTitelSelektor).type(neuerTitel);

            cy.get(updateArtSelektor).select(neueArt);
            cy.get(updateVerlagSelektor).select(neuerVerlag);
            cy.get('button').click();
        });

        // Then
        // cy.reload();
        cy.get(detailsSelektor).within(() => {
            cy.get(detailsTitelSelektor).should('have.text', neuerTitel);
            cy.get(detailsArtSelektor).should('have.text', neueArt);
            cy.get(detailsVerlagSelektor).should('have.text', neuerVerlag);
        });

        cy.log(`Aendern von ${buchId}: erfolgreich`);
    });
});
