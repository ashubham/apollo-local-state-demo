import { Reference } from '@apollo/client';
import { client } from '../apollo-client';
import { gql } from '@apollo/client';
import { prettyTimeAgo } from '../util/util';

/****** Queries  ****/
export const GET_BOARD = gql`
query GetBoard($id: ID!) {
        board(id: $id) {
            id
            name
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

export const GET_BOARDS = gql`
    query GetBoards {
        getBoards {
            id
            name
            owner
            modified
            modifiedTimeAgo @client
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
                }
                size
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

client.cache.policies.addTypePolicies({
    Tile: {
        fields: {
            imageUrl: {
                read(url, { args, readField }) {
                    const photo = readField('photo') as Reference;
                    const farm = readField('farm', photo);
                    const id = readField('id', photo);
                    const server = readField('server', photo);
                    const secret = readField('secret', photo);
                    const size = readField('size');
                    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.png`;
                }
            }
        }
    },
    Board: {
        fields: {
            modifiedTimeAgo: {
                read(date, { args, readField }) {
                    const modified = Number(readField('modified'));
                    const diffMills = Date.now() - modified;
                    return prettyTimeAgo(diffMills);
                }
            }
        }
    }
});