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
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import log from 'loglevel';

/**
 * Komponente mit dem Tag "hs-create-plz", um das Erfassungsformular
 * für einen neuen Kunden zu realisieren.
 */
@Component({
    // moduleId: module.id,
    selector: 'hs-create-plz',
    templateUrl: './create-plz.component.html',
    styleUrls: ['./create-kunde.component.scss'],
    standalone: true,
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
})
export class CreatePlzComponent implements OnInit {
    private static readonly MIN_LENGTH = 5;

    private static readonly MAX_LENGTH = 5;

    @Input()
    createForm!: FormGroup;

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    protected readonly plz = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreatePlzComponent.MIN_LENGTH),
        Validators.minLength(CreatePlzComponent.MAX_LENGTH),
        // Todo: Add proper RegEx to validator.
        Validators.pattern(/^\w/u),
    ]);

    ngOnInit() {
        log.debug('CreatePlzComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('plz', this.plz);
    }
}
