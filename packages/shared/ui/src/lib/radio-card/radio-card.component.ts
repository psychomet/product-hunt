import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
} from '@angular/core';

import { Subject, Subscription } from 'rxjs';

import { RadioCardFieldsetComponent } from './radio-card-fieldset.component';

@Component({
    selector: 'bigi-radio-card',
    templateUrl: './radio-card.component.html',
    styleUrls: ['./radio-card.component.scss'],
    exportAs: 'KbRadioCard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class RadioCardComponent<T = any> implements OnInit, OnDestroy {
    @Input() item: T;
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<T>;

    constructor(private fieldset: RadioCardFieldsetComponent, private changeDetector: ChangeDetectorRef) {}

    private idChange$ = new Subject<T>();
    private subscription: Subscription;

    ngOnInit() {
        this.subscription = this.fieldset.selectedIdChange$.subscribe(() =>
            this.changeDetector.markForCheck(),
        );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    isSelected(item: T): boolean {
        return this.fieldset.isSelected(item);
    }

    isFocussed(item: T): boolean {
        return this.fieldset.isFocussed(item);
    }

    selectChanged(item: T) {
        this.fieldset.selectChanged(item);
    }

    setFocussedId(item: T | undefined) {
        this.fieldset.setFocussedId(item);
    }

    getItemId(item: T): string {
        return this.fieldset.idFn(item);
    }
}
