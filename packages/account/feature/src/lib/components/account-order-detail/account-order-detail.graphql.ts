import { CART_FRAGMENT, ORDER_ADDRESS_FRAGMENT } from '@bigi-shop/shared-data-access';
import {gql} from 'apollo-angular';



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
