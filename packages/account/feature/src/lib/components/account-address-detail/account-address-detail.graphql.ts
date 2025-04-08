import { ADDRESS_FRAGMENT } from '@bigi-shop/shared-data-access';
import {gql} from 'apollo-angular';



export const UPDATE_ADDRESS = gql`
    mutation UpdateAddress($input: UpdateAddressInput!) {
        updateCustomerAddress(input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
