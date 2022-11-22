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

// CSS-Selektoren in der Navigationsleiste
const navSelektor = 'hs-root hs-header hs-nav';
const createPath = '/buecher/create';
const createMenuSelektor = `${navSelektor} ul li a[routerLink="${createPath}"]`;
const suchePath = '/buecher/suche';
const sucheSelektor = `${navSelektor} ul li a[routerLink="${suchePath}"]`;

// CSS-Selektoren in <main>
const mainSelektor = 'hs-root hs-main';
const homeSelektor = `${mainSelektor} hs-home`;

const createSelektor = `${mainSelektor} hs-create-buch`;
const ratingCreateSelektor = 'hs-create-rating select';
const verlagCreateSelektor = 'hs-create-verlag select';

const suchformularSelektor = `${mainSelektor} hs-suche-buecher hs-suchformular`;
const gefundeneBuecherSelektor = `${mainSelektor} hs-suchergebnis hs-gefundene-buecher`;

/* global Cypress, cy, describe, it, beforeEach, afterEach, expect */

// eslint-disable-next-line max-lines-per-function
describe('Neuanlegen', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl);
        login();
    });
    afterEach(() => {
        cy.reload();
        logout();
    });

    it('Neues Buch', () => {
        // Given
        const titel = 'Neues Buch Cypress';
        const rating = 4;
        const verlag = 'Bar Verlag';
        const preis = '999';
        const rabatt = '9';
        const isbn = '0-65791-498-3';

        // When
        cy.get(createMenuSelektor).click();
        cy.get(createSelektor).within(() => {
            cy.get('#titelInput').type(titel);
            cy.get(ratingCreateSelektor).select(rating);
            cy.get('#kindleInput').click();
            cy.get(verlagCreateSelektor).select(verlag);
            cy.get('#preisInput').type(preis);
            cy.get('#rabattInput').type(rabatt);
            cy.get('#lieferbarInput').click();
            cy.get('#typescriptInput').click();
            cy.get('#isbnInput').type(isbn);
            cy.get('button').click();
        });

        // Then
        cy.contains(`${homeSelektor} h1`, 'Hallo!');
        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('#titelInput').type(titel);
            cy.get('button').click();
        });
        cy.get(`${gefundeneBuecherSelektor} tr td:nth-child(3)`).each(
            // eslint-disable-next-line arrow-parens
            (elem) => {
                expect(elem.text()).to.contain(titel);
            },
        );
    });

    it('Neues Buch mit fehlerhaften Daten', () => {
        // Given
        const titel = '?!:';

        // When
        cy.get(createMenuSelektor).click();
        cy.get(createSelektor).within(() => {
            cy.get('#titelInput').type(titel);
            cy.get('hs-create-verlag').click();
            cy.get('#preisInput').click();
            cy.get('#rabattInput').click();
            cy.get('#isbnInput').click();

            cy.get('#lieferbarInput').click();
        });

        // Then
        cy.get(createSelektor).within(() => {
            cy.get(
                'hs-create-titel div[class="invalid-feedback ng-star-inserted"] span',
            ).contains(
                'Ein Buchtitel muss mit einem Buchstaben oder einer Ziffer beginnen.',
            );
            cy.get(
                'hs-create-verlag div[class="invalid-feedback ng-star-inserted"] span',
            ).contains('Ein Verlag ist erforderlich.');
            cy.get(
                'hs-create-preis div[class="invalid-feedback ng-star-inserted"] span',
            ).contains('Ein Preis muss eingegeben werden, z.B. 123.45.');
            cy.get(
                'hs-create-rabatt div[class="invalid-feedback ng-star-inserted"] span',
            ).contains(
                'Ein Rabatt muss in Prozent eingegeben werden, z.B. 5.67.',
            );
            cy.get(
                'hs-create-isbn div[class="invalid-feedback ng-star-inserted"] span',
            ).contains(
                'ISBN-Nummer, z.B. 3-89722-583-2, muss eingegeben werden.',
            );
        });
    });
});
