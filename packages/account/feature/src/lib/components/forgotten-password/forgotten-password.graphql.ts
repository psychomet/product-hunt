import { ERROR_RESULT_FRAGMENT } from '@bigi-shop/shared-data-access';
import {gql} from 'apollo-angular';



export const REQUEST_PASSWORD_RESET = gql`
    mutation RequestPasswordReset($emailAddress: String!) {
        requestPasswordReset(emailAddress: $emailAddress) {
            ... on Success {
                success
            }
            ...ErrorResult
        }
    }
    ${ERROR_RESULT_FRAGMENT}
`;
