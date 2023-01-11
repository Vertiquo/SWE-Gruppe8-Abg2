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
import { type Familienstand } from '../shared/kunde';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-update-familienstand</code>
 */
@Component({
    selector: 'hs-update-familienstand',
    templateUrl: './update-familienstand.component.html',
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
export class UpdateFamilienstandComponent implements OnInit {
    // <hs-update-familienstand [form]="form" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: Familienstand;

    protected familienstand!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateFamilienstandComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.familienstand = new FormControl(
            this.currentValue,
            Validators.required,
        );
        this.updateForm.addControl('familienstand', this.familienstand);
    }
}
