const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');
const uuid = require('uuid/v4');

const typeDefs = gql`
  type Query {
    resultSet(searchText: String!): ResultSet
    board(id: ID!): Board
  }

  type Mutation {
    createBoard: Board
    addPhotosToBoard(input: AddPhotosToBoardInput!): AddPhotosToBoardPayload!
    updateBoardLayout(input: UpdateBoardLayoutInput!): UpdateBoardLayoutPayload!
  }

  type ResultSet {
    photos: [Photo]!
  }

  type Photo {
    id: ID!
    owner: String!
    secret: String!
    server: Int!
    farm: Int!
    title: String!
    ispublic: Int
    isfriend: Int
    isfamily: Int
  }

  enum TileSize {
    SMALL
    MEDIUM
    LARGE
  }

  type Tile {
    id: ID!
    photo: Photo!
    size: TileSize!
  }

  type Board {
    id: ID!
    tiles: [Tile!]!
  }

  input AddPhotosToBoardInput {
    boardId: ID!
    photos: [PhotoInput!]!
  }

  input PhotoInput {
    id: ID!
    owner: String!
    secret: String!
    server: Int!
    farm: Int!
    title: String!
    bla: String
  }

  type AddPhotosToBoardPayload {
    board: Board!
  }

  input UpdateBoardLayoutInput {
    id: ID!
    tileChanges: [TileChange!]!
  }

  input TileChange {
    id: ID!
    size: TileSize
  }

  type UpdateBoardLayoutPayload {
    board: Board
  }
`;

let boards = {};

const resolvers = {
  Query: {
    resultSet: (root, { searchText }) => {
      return fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e494cbd806d338f440cfc999d6b9bacc&text=${searchText}&format=json&nojsoncallback=1`
      )
        .then(res => res.json())
        .then(({ photos }) => photos);
    },
    board: (root, { id }) => {
      return boards[id];
    }
  },
  Mutation: {
    createBoard: (parent, args) => {
      const board = {
        id: uuid(),
        tiles: [{
          id: '883123',
          photo: { id: '1232455', owner: 'asd', secret: 'asd', farm: 5, server: 6, title: 'asd' },
          size: 'SMALL'
        }]
      }
      boards[board.id] = board;
      return board;
    },
    addPhotosToBoard: (parent, args) => {
      let tiles = args.input.photos.map(photo => {
        return {
          id: uuid(),
          photo,
          size: 'MEDIUM'
        }
      });
      let board = boards[args.input.id];
      board.tiles.push(...tiles);
      console.log(JSON.stringify(board));
      return {board};
    }
  },
  ResultSet: {
    photos: photos => photos.photo,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
