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

// CSS-Selektoren in der Navigationsleiste, vgl.: XPath
const navSelektor = 'hs-root hs-header hs-nav';
const suchePath = '/buecher/suche';
const sucheSelektor = `${navSelektor} ul li a[routerLink="${suchePath}"]`;

// CSS-Selektoren in <main>
const mainSelektor = 'hs-root hs-main';
const suchformularSelektor = `${mainSelektor} hs-suche-buecher hs-suchformular`;
const suchergebnisSelektor = `${mainSelektor} hs-suchergebnis`;
const gefundeneBuecherSelektor = `${suchergebnisSelektor} hs-gefundene-buecher`;
const errorSucheSelektor = `${suchergebnisSelektor} hs-error-message div span`;
const detailsSelektor = `${mainSelektor} hs-details-buch`;

/* global Cypress, cy, describe, it, beforeEach, expect */

// https://docs.cypress.io/api/table-of-contents
// Tests mit describe() und it() wie in Mocha und Jasmine

// eslint-disable-next-line max-lines-per-function
describe('Suchen', () => {
    beforeEach(() => {
        // Seite aufrufen: siehe cypress.json
        cy.visit(Cypress.config().baseUrl);
    });

    it('Homepage', () => {
        // Then
        // Strings ueberpruefen
        cy.contains(navSelektor, 'Suche');
        cy.contains(mainSelektor, 'Hallo!');
    });

    it('Suchseite', () => {
        // When
        cy.get(sucheSelektor).click();

        // Then
        // URL im Browser ueberpruefen
        cy.url().should('match', new RegExp(`${suchePath}$`, 'u'));
        cy.log('Suchseite aufgerufen');
    });

    it('Suchen mit Titel "a"', () => {
        // Given
        const titel = 'a';

        // When
        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('#titelInput').type(titel);
            cy.get('button').click();
        });

        // Then
        cy.get(`${gefundeneBuecherSelektor} tr td:nth-child(3)`).each(
            // eslint-disable-next-line arrow-parens
            (elem) => {
                expect(elem.text()).to.contain(titel);
            },
        );
        cy.log(`Suchen mit Titel "${titel}": erfolgreich`);
    });

    it('Suchen mit Verlag "Foo Verlag"', () => {
        // Given
        const verlag = 'Foo Verlag';

        // When
        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('hs-suche-verlag select').select(verlag);
            cy.get('button').click();
        });

        // Then
        // <span> wegen [ngSwitch]
        cy.get(`${gefundeneBuecherSelektor} tr td:nth-child(4) span span`).each(
            // eslint-disable-next-line arrow-parens
            (elem) => {
                cy.wrap(elem).should('have.text', verlag);
            },
        );
        cy.log(`Suchen mit Verlag "${verlag}": erfolgreich`);
    });

    it('Suchen mit Schlagwort "JavaScript"', () => {
        // Given
        const javascript = 'JavaScript';

        // When
        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            // Label zur Checkbox anklicken
            cy.get('hs-suche-schlagwoerter label').contains(javascript).click();
            cy.get('button').click();
        });

        // Then
        cy.get(
            `${gefundeneBuecherSelektor} tr td:nth-child(5) span:nth-child(1) span span`,
        ).each(
            // eslint-disable-next-line arrow-parens
            (elem) => {
                cy.wrap(elem).should('contain', javascript);
            },
        );
        cy.log(`Suchen mit Schlagwort "${javascript}": erfolgreich`);
    });

    it('Fehlerhafte Suche mit nicht-vorhandenem Titel', () => {
        // Given
        const titel = 'xxx';

        // When
        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('#titelInput').type(titel);
            cy.get('button').click();
        });

        // Then
        cy.get(errorSucheSelektor).should(
            'have.text',
            'Keine Bücher gefunden.',
        );
        cy.log(`Suchen mit nicht-vorhandenem Titel "${titel}": erfolgreich`);
    });

    it('Details zu Buch "00000000-0000-0000-0000-000000000001"', () => {
        // Given
        const buchId = '00000000-0000-0000-0000-000000000001';

        // When
        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('button').click();
        });
        cy.get(`${gefundeneBuecherSelektor} tr td:nth-child(2)`)
            .contains(buchId)
            .click();

        // Then
        cy.get(`${detailsSelektor} h4`).should('have.text', `Buch ${buchId}:`);
        cy.log(`Details zu ${buchId}: erfolgreich`);
    });

    it('Details mit "Druckausgabe"', () => {
        // Given
        const druckausgabe = 'Druckausgabe';

        // When
        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('hs-suche-art label').contains(druckausgabe).click();
            cy.get('button').click();
        });
        cy.get(`${gefundeneBuecherSelektor} tr td:nth-child(1)`)
            .first()
            .click();

        // Then
        cy.get(
            `${detailsSelektor} hs-details-stammdaten hs-details-art div div span span`,
        ).should('have.text', druckausgabe);
        cy.log(`Details mit ${druckausgabe}: erfolgreich`);
    });

    it.skip('Noch nicht fertig', () => {
        cy.log('Beispiel fuer einen noch nicht fertigen Test');
    });
});
