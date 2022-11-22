/*
 * Copyright (C) 2018 - present Juergen Zimmermann, Hochschule Karlsruhe
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
 * Komponente f&uuml;r den CSS-Selektor <code>hs-update-isbn</code>
 */
@Component({
    selector: 'hs-update-isbn',
    templateUrl: './update-isbn.component.html',
    imports: [FormsModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class UpdateIsbnComponent implements OnInit {
    // <hs-update-isbn [form]="form" [currentValue]="...">
    @Input()
    form!: FormGroup;

    @Input()
    currentValue!: string;

    protected isbn!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateIsbnComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.isbn = new FormControl(this.currentValue, [
            Validators.required,
            Validators.pattern(ISBN_REGEX),
        ]);
        this.form.addControl('isbn', this.isbn);
    }
}
