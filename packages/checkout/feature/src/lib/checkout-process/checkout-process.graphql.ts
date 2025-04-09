import {gql} from 'apollo-angular';

import { CART_FRAGMENT, ERROR_RESULT_FRAGMENT } from '@bigi-shop/shared-data-access';



export const GET_NEXT_ORDER_STATES = gql`
    query GetNextOrderStates {
        nextOrderStates
    }
`;

export const TRANSITION_TO_ADDING_ITEMS = gql`
    mutation TransitionToAddingItems {
        transitionOrderToState(state: "AddingItems") {
            ...Cart
            ...ErrorResult
        }
    }
    ${CART_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
