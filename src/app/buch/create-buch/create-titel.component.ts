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
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente mit dem CSS-Selektor &lt;hs-create-titel&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    // moduleId: module.id,
    selector: 'hs-create-titel',
    templateUrl: './create-titel.component.html',
    imports: [FormsModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class CreateTitelComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    @Input()
    form!: FormGroup;

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen (Fehler-) Status
    // Ergaenzende Validierungen https://github.com/rxweb/rxweb/tree/master/client-side/angular/packages/reactive-form-validator
    protected readonly titel = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateTitelComponent.MIN_LENGTH),
        Validators.pattern(/^\w/u),
    ]);
    // readonly titelGroup = new FormGroup({ titel: this.titel })

    ngOnInit() {
        log.debug('CreateTitelComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('titel', this.titel);
    }
}
