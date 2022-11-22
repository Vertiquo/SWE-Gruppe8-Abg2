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
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-update-titel</code>
 */
@Component({
    selector: 'hs-update-titel',
    templateUrl: './update-titel.component.html',
    imports: [FormsModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class UpdateTitelComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    // <hs-update-titel [form]="form" [currentValue]="...">
    @Input()
    form!: FormGroup;

    @Input()
    currentValue!: string;

    protected titel!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateTitelComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.titel = new FormControl(this.currentValue, [
            Validators.required,
            Validators.minLength(UpdateTitelComponent.MIN_LENGTH),
            Validators.pattern(/^\w/u),
        ]);
        this.form.addControl('titel', this.titel);
    }
}
