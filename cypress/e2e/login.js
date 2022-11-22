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

// CSS-Selektoren in der Navigationsleiste
const navSelektor = 'hs-root hs-header hs-nav';
const loginLogoutSelektor = `${navSelektor} hs-login-logout form`;

/* global cy */

export const login = (username = 'admin', password = 'p') => {
    cy.get(loginLogoutSelektor).within(() => {
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button').click();
    });
};

export const logout = () => {
    cy.get(loginLogoutSelektor).within(() => {
        cy.get('button').click();
    });
};
