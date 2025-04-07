import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { NOTIFICATION_OPTIONS, NotificationOptions } from './notification-types';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'bigi-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class NotificationComponent {
    close = new Subject();
    constructor(@Inject(NOTIFICATION_OPTIONS) public options: NotificationOptions) { }
}
