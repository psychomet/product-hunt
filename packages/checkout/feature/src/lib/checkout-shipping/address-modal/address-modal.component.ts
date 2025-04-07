import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { CREATE_ADDRESS } from './address-modal.graphql';
import { AddressFormComponent, Dialog } from '@bigi-shop/shared-ui';
import { AddressFragment, CountryFragment, CreateAddressMutation, CreateAddressMutationVariables, GetAvailableCountriesQuery } from '@bigi-shop/shared-util-types';
import { DataService, GET_AVAILABLE_COUNTRIES } from '@bigi-shop/shared-data-access';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'bigi-address-modal',
    templateUrl: './address-modal.component.html',
    // styleUrls: ['./address-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [CommonModule,AddressFormComponent]
})
export class AddressModalComponent implements Dialog<AddressFragment>, OnInit {
    resolveWith: (result?: any) => void;
    address: AddressFragment;
    title: string;
    availableCountries$: Observable<CountryFragment[]>;
    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.availableCountries$ = this.dataService.query<GetAvailableCountriesQuery>(GET_AVAILABLE_COUNTRIES).pipe(
            map(data => data.availableCountries as CountryFragment[]),
        );
    }

    save(value: any) {
        this.dataService.mutate<CreateAddressMutation, CreateAddressMutationVariables>(CREATE_ADDRESS, {
            input: value,
        }).subscribe(data => {
            this.resolveWith(data.createCustomerAddress);
        });
    }
}
