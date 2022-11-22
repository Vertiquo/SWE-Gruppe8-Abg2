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
    type ActivatedRouteSnapshot,
    type CanDeactivateFn,
    type RouterStateSnapshot,
    type UrlTree,
} from '@angular/router';
import { type CreateBuchComponent } from './create-buch.component';
import { type Observable } from 'rxjs';
import log from 'loglevel';

// https://angular.io/api/router/CanDeactivate
// https://angular.io/guide/router#can-deactivate-guard

export const canDeactivateGuard: CanDeactivateFn<CreateBuchComponent> = (
    createBuch: CreateBuchComponent,
    _: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
    __: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
):
    | Observable<UrlTree | boolean>
    | Promise<UrlTree | boolean>
    | UrlTree
    | boolean => {
    if (createBuch.fertig) {
        // Seite darf zur gewuenschten URL verlassen werden
        return true;
    }

    createBuch.showWarning = true;
    createBuch.fertig = true;
    log.debug('CreateBuchGuard.canDeactivate: Verlassen der Seite');
    return false;
};
