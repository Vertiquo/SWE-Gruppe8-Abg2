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

// CSS-Selektor, vgl.: XPath
const navSelektor = 'hs-root hs-header hs-nav';
const loginLogoutSelektor = `${navSelektor} hs-login-logout form`;

/* global Cypress, cy, describe, it, beforeEach */

describe('Einloggen', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl);
    });

    it('Einloggen', () => {
        // Given
        const username = 'admin';
        // eslint-disable-next-line line-comment-position
        const password = 'p'; // NOSONAR

        // When
        // username und password eingeben sowie Button anklicken
        cy.get(loginLogoutSelektor).within(() => {
            cy.get('#usernameInput').type(username);
            cy.get('#passwordInput').type(password);
            cy.get('button').click();
        });

        // Then
        cy.get(`${loginLogoutSelektor} button span`).should(
            'have.text',
            'Logout',
        );
        cy.log(`Einloggen mit "${username}" und "${password}" erfolgreich`);
    });

    it('Einloggen mit falschem Passwort', () => {
        // Given
        const username = 'admin';
        // eslint-disable-next-line line-comment-position
        const password = 'FALSCH'; // NOSONAR

        // When
        // username und password eingeben sowie Button anklicken
        cy.get(loginLogoutSelektor).within(() => {
            cy.get('#usernameInput').type(username);
            cy.get('#passwordInput').type(password);
            cy.get('button').click();
        });

        // Then
        cy.contains(`${loginLogoutSelektor} button`, 'Login');
        cy.log(`Kein Einloggen mit "${username}" und "${password}"`);
    });
});
