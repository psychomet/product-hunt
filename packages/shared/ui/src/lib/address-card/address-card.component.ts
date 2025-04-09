import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { AddressFragment, OrderAddressFragment } from '@bigi-shop/shared-util-types';

@Component({
  selector: 'bigi-address-card',
  imports: [CommonModule],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss',
})
export class AddressCardComponent {
  @Input() address: OrderAddressFragment | AddressFragment;
  @Input() title = '';

  getCountryName(): string {
      if (!this.address.country) {
          return '';
      }
      if (typeof this.address.country === 'string') {
          return this.address.country;
      } else {
          return this.address.country.name;
      }
  }
}
