import {gql} from 'apollo-angular';

import { CART_FRAGMENT, ORDER_ADDRESS_FRAGMENT } from '@product-hunt/shared-data-access';



export const GET_ORDER = gql`
    query GetOrder($code: String!) {
        orderByCode(code: $code) {
            ...Cart
            shippingAddress {
                ...OrderAddress
            }
            billingAddress {
                ...OrderAddress
            }
        }
    }
    ${CART_FRAGMENT}
    ${ORDER_ADDRESS_FRAGMENT}
`;
