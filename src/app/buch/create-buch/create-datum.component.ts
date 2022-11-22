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
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

// https://mattlewis92.github.io/angular-calendar/#/kitchen-sink

/**
 * Komponente mit dem CSS-Selektor &lt;hs-create-datum&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'hs-create-datum',
    templateUrl: './create-datum.component.html',
})
export class CreateDatumComponent implements OnInit {
    @Input()
    form!: FormGroup;

    protected readonly today = new Date();

    protected readonly datum = new FormControl(this.today);

    ngOnInit() {
        log.debug('CreateDatumComponent.ngOnInit');
        // siehe formControlName im HTML-Template
        this.form.addControl('datum', this.datum);
    }

    dayClicked({ date }: { date: Date }): void {
        log.debug('CreateDatumComponent: dayClicked', date);
        this.form.setControl('datum', new FormControl(date));
    }
}
