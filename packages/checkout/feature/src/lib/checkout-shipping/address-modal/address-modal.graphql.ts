import { ADDRESS_FRAGMENT } from '@bigi-shop/shared-data-access';
import {gql} from 'apollo-angular';



export const CREATE_ADDRESS = gql`
    mutation CreateAddress($input: CreateAddressInput!) {
        createCustomerAddress(input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
