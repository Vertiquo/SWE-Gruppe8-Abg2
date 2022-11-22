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
} from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-update-rating</code>
 */
@Component({
    selector: 'hs-update-rating',
    templateUrl: './update-rating.component.html',
    imports: [FormsModule, ReactiveFormsModule],
    standalone: true,
})
export class UpdateRatingComponent implements OnInit {
    // <hs-update-rating [form]="form" [currentValue]="...">
    @Input()
    form!: FormGroup;

    @Input()
    currentValue: number | undefined;

    protected rating!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateRatingComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.rating = new FormControl(this.currentValue);
        this.form.addControl('rating', this.rating);
    }
}
