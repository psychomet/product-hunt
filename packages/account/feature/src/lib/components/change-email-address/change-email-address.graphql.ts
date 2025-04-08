import { ERROR_RESULT_FRAGMENT } from '@bigi-shop/shared-data-access';
import {gql} from 'apollo-angular';


export const VERIFY_CHANGE_EMAIL_ADDRESS = gql`
    mutation VerifyChangeEmailAddress($token: String!) {
        updateCustomerEmailAddress(token: $token) {
            ... on Success {
                success
            }
            ...ErrorResult
        }
    }
    ${ERROR_RESULT_FRAGMENT}
`;
