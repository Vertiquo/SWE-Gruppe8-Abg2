import { Component } from '@angular/core';
import log from 'loglevel';

@Component({
    selector: 'hs-diagramm-kunde',
    templateUrl: './diagramm-kunde.component.html',
    styleUrls: ['./diagramm-kunde.component.scss'],
    standalone: true,
})
export class DiagrammKundeComponent {
    errorMsg: string | undefined = undefined;

    constructor() {
        log.debug('DiagrammKundeComponent.constructor');
    }
}
