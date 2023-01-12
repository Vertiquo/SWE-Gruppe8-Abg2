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
 * You should have received a copy oSf the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, Output } from '@angular/core';
import {
    type MatSelectChange,
    MatSelectModule,
} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { type Geschlecht } from '../../shared';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente fuer den CSS-Selektor <code>hs-suche-art</code>
 */
@Component({
    selector: 'hs-suche-geschlecht',
    templateUrl: './suche-geschlecht.component.html',
    styleUrls: ['./suchformular.component.scss'],
    imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule,
    ],
    standalone: true,
})
export class SucheGeschlechtComponent {
    protected geschlecht: Geschlecht | '' = '';

    @Output()
    protected readonly geschlecht$ = new Subject<Geschlecht | ''>();

    constructor() {
        log.debug('SucheGeschlechtComponent.constructor()');
    }

    onChange(event: MatSelectChange) {
        const value = event.value as string;
        log.debug(`SucheNachnameComponent.onChange: geschlecht=${value}`);
        this.geschlecht$.next(value as Geschlecht | '');
    }
}
