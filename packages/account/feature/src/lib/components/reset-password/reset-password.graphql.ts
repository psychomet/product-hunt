import { ERROR_RESULT_FRAGMENT } from '@bigi-shop/shared-data-access';
import {gql} from 'apollo-angular';



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
