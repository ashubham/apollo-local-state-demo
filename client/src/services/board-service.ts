import { client } from '../apollo-client';
import { gql } from 'apollo-boost';

/****** Queries  ****/
export const GET_BOARD = gql`
query GetBoard($id: ID!) {
        board(id: $id) {
            id
            tiles {
                size
                id
                photo {
                    id
                    title
                    owner
                    server
                    farm
                    secret
                }
                imageUrl @client
            }
        }
    }
`;

/****** Mutations  ******/
export const CREATE_BOARD = gql`
    mutation CreateBoard {
        createBoard {
            id
        }
    }
`;

export const ADD_PHOTOS_TO_BOARD = gql`
  mutation AddPhotosToBoard($input: AddPhotosToBoardInput!) {
      addPhotosToBoard(input: $input) {
        board {
            id
            tiles {
                id
                photo {
                  id
                  owner
                }
                size
                imageUrl @client
            }
        }
      }
  }
`;

const clientSchema = gql`
    extend type Tile {
        imageUrl: String!
    }
`;

const resolvers = {
  Tile: {
    imageUrl: (tile, args, context, info) => {
      return `http://${tile.photo.id}-${tile.photo.owner}`;
    },
  },
};

client.addResolvers(resolvers);
