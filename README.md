# Apollo with useContext/useReducer

### Features

- Apollo's `useQuery``useMutation` hooks for backend driven state.
- Apollo Cache API for derived state on the client.
- useReducer/useContext for App wide client only state sharing
  - For Alerts, Tab state.
  
### About

- This uses Flickr's Photo search API to list images matching the search query on the left panel.
- On dblClicking a photo, it gets added to the Board on the right.
- The Boards tab lists all the boards on the server.
  - Click on an item on that list to go to that saved board.
- Boards are stored inmemory of the server, so restarting the server clears the board list.


### Server

```bash
cd server && npm i && npm start
```

### Client

Make sure the server is running before you start up the client. To get the full experience, install the [Apollo VS Code extension](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) for some extra magic. ✨

```bash
cd client && npm i && npm start
```
