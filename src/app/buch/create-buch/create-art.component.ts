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
import log from 'loglevel';

/**
 * Komponente mit dem CSS-Selektor &lt;hs-create-art&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'hs-create-art',
    templateUrl: './create-art.component.html',
    imports: [FormsModule, ReactiveFormsModule],
    standalone: true,
})
export class CreateArtComponent implements OnInit {
    @Input()
    form!: FormGroup;

    protected readonly art = new FormControl('DRUCKAUSGABE');

    ngOnInit() {
        log.debug('CreateArtComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('art', this.art);
    }
}
