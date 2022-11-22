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

import { login } from './login';

// CSS-Selektoren in der Navigationsleiste
const navSelektor = 'hs-root hs-header hs-nav';
const diagrammeSelektor = '#navbarDropdownMenuLink';
const balkendiagrammPath = '/buecher/balkendiagramm';
const balkendiagrammMenuSelektor = `${navSelektor} ul li[class="nav-item dropdown"] a[routerLink="${balkendiagrammPath}"]`;
const liniendiagrammPath = '/buecher/liniendiagramm';
const liniendiagrammMenuSelektor = `${navSelektor} ul li[class="nav-item dropdown"] a[routerLink="${liniendiagrammPath}"]`;
const tortendiagrammPath = '/buecher/tortendiagramm';
const tortendiagrammMenuSelektor = `${navSelektor} ul li[class="nav-item dropdown"] a[routerLink="${tortendiagrammPath}"]`;

// CSS-Selektoren in <main>
const mainSelektor = 'hs-root hs-main';
const balkendiagrammSelektor = `${mainSelektor} hs-balkendiagramm svg`;
const liniendiagrammSelektor = `${mainSelektor} hs-liniendiagramm svg`;
const tortendiagrammSelektor = `${mainSelektor} hs-tortendiagramm svg`;

/* global Cypress, cy, describe, it, beforeEach */

describe('Diagramme', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl);
        login();
    });

    it('Balkendiagramm', () => {
        // When
        cy.get(diagrammeSelektor).click();
        cy.get(balkendiagrammMenuSelektor).click();

        // Then
        cy.get(balkendiagrammSelektor);
    });

    it('Liniendiagramm', () => {
        // When
        cy.get(diagrammeSelektor).click();
        cy.get(liniendiagrammMenuSelektor).click();

        // Then
        cy.get(liniendiagrammSelektor);
    });

    it('Tortendiagramm', () => {
        // When
        cy.get(diagrammeSelektor).click();
        cy.get(tortendiagrammMenuSelektor).click();

        // Then
        cy.get(tortendiagrammSelektor);
    });
});
