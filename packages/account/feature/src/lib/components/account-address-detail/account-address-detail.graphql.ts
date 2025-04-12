import {gql} from 'apollo-angular';

import { ADDRESS_FRAGMENT } from '@product-hunt/shared-data-access';



export const UPDATE_ADDRESS = gql`
    mutation UpdateAddress($input: UpdateAddressInput!) {
        updateCustomerAddress(input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
