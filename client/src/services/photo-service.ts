import { gql } from '@apollo/client';

export const GET_PHOTOS = gql`
query GetResultSet($searchText: String!) {
  resultSet(searchText: $searchText) {
    photos {
      id
      secret
      server
      farm
      title
      owner
    }
  }
}
`;
