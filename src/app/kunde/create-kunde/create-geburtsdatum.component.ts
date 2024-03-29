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
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-art&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-geburtsdatum',
    templateUrl: './create-geburtsdatum.component.html',
    styleUrls: ['./create-kunde.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatOptionModule,
        MatTooltipModule,
    ],
})
export class CreateGeburtsdatumComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    readonly geburtsdatum = new FormControl(undefined, [Validators.required]);

    ngOnInit() {
        log.debug('CreateGeburtsdatumComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('geburtsdatum', this.geburtsdatum);
    }

    dayClicked({ date }: { date: Date }): void {
        log.debug('CreateGeburtsdatumComponent: dayClicked', date);
        this.createForm.setControl('geburtsdatum', new FormControl(date));
    }
}
