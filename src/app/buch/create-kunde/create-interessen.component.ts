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
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-art&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'hs-create-interessen',
    templateUrl: './create-interessen.component.html',
    styleUrls: ['./create-kunde.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule],
})
export class CreateInteressenComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    protected readonly sport = new FormControl(false);

    protected readonly lesen = new FormControl(false);

    protected readonly reisen = new FormControl(false);

    ngOnInit() {
        log.debug('CreateInteressenComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('SPORT', this.sport);
        this.createForm.addControl('LESEN', this.lesen);
        this.createForm.addControl('REISEN', this.reisen);
    }
}
