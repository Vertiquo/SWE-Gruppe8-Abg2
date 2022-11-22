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

import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ISBN_REGEX } from '../shared/buch';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente mit dem CSS-Selektor &lt;hs-create-isbn&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'hs-create-isbn',
    templateUrl: './create-isbn.component.html',
    imports: [FormsModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class CreateIsbnComponent implements OnInit {
    @Input()
    form!: FormGroup;

    protected readonly isbn = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(ISBN_REGEX),
    ]);

    ngOnInit() {
        log.debug('CreateIsbnComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('isbn', this.isbn);
    }
}
