import {gql} from 'apollo-angular';

import { ERROR_RESULT_FRAGMENT } from '@product-hunt/shared-data-access';



export const RESET_PASSWORD = gql`
    mutation ResetPassword($token: String! $password: String!) {
        resetPassword(token: $token password: $password) {
            ...on CurrentUser {
                id
                identifier
            }
            ...ErrorResult
        }
    }
    ${ERROR_RESULT_FRAGMENT}
`;
