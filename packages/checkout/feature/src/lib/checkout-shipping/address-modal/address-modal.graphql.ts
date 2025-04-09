import {gql} from 'apollo-angular';

import { ADDRESS_FRAGMENT } from '@bigi-shop/shared-data-access';



export const CREATE_ADDRESS = gql`
    mutation CreateAddress($input: CreateAddressInput!) {
        createCustomerAddress(input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
