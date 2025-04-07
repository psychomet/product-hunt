import { CART_FRAGMENT, ERROR_RESULT_FRAGMENT } from '@bigi-shop/shared-data-access';
import {gql} from 'apollo-angular';



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
