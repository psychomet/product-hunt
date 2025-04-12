import {gql} from 'apollo-angular';

import { ADDRESS_FRAGMENT } from '@product-hunt/shared-data-access';



export const CREATE_ADDRESS = gql`
    mutation CreateAddress($input: CreateAddressInput!) {
        createCustomerAddress(input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
