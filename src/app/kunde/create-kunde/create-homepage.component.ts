/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable array-bracket-newline */
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
import { MatFormFieldModule } from '@angular/material/form-field';
import log from 'loglevel';

/**
 * Komponente mit dem Tag "hs-create-homepage", um das Erfassungsformular
 * für einen neuen Kunden zu realisieren.
 */
@Component({
    // moduleId: module.id,
    selector: 'hs-create-homepage',
    templateUrl: './create-homepage.component.html',
    styleUrls: ['./create-kunde.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule],
})
export class CreateHomepageComponent implements OnInit {
    private static readonly MIN_LENGTH = 5;

    @Input()
    createForm!: FormGroup;

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    protected readonly homepage = new FormControl('', [
        Validators.minLength(CreateHomepageComponent.MIN_LENGTH),
    ]);

    ngOnInit() {
        log.debug('CreateHomepageComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('homepage', this.homepage);
    }
}
