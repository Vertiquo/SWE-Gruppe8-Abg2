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
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-update-homepage</code>
 */
@Component({
    selector: 'hs-update-homepage',
    templateUrl: './update-homepage.component.html',
    styleUrls: ['./update-kunde.component.scss'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatTooltipModule,
    ],
    standalone: true,
})
export class UpdateHomepageComponent implements OnInit {
    private static readonly MIN_LENGTH = 5;

    // <hs-update-homepage [form]="form" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: string;

    protected homepage!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateHomepageComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.homepage = new FormControl(this.currentValue, [
            Validators.required,
            Validators.minLength(UpdateHomepageComponent.MIN_LENGTH),
            Validators.pattern(/^\w/u),
        ]);
        this.updateForm.addControl('homepage', this.homepage);
    }
}
