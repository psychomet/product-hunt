import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bigi-checkout-stage-indicator',
  imports: [CommonModule],
  templateUrl: './checkout-stage-indicator.component.html',
  styleUrl: './checkout-stage-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutStageIndicatorComponent {
  @Input() signedIn = false;
  @Input() activeStage = 1;
}
