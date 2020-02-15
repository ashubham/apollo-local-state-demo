import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { CREATE_BOARD } from './services/board-service';
import { GlobalAlertContextProvider } from './contexts/alert';
import { getBoardIdFromPath } from './util/util';

import './App.scss';

import { useSessionStore, Page } from './contexts/sessionStore';
import { LeftPanel } from './components/left-panel';
import { Board } from './components/board';
import { BoardList } from './components/board-list/BoardList.container'
import { Container, Tabs, Tab, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  },
}));

const App: React.FC = () => {
  let [createBoard, { data }] = useMutation(CREATE_BOARD);
  let [{ page }, { setBoardId, setPage }] = useSessionStore();
  const classes = useStyles();
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  const reset = () => { window.location.pathname = '/' };
  let boardId = getBoardIdFromPath(window.location.pathname)
    || data?.createBoard.id;

  useEffect(() => {
    if (!boardId) {
      createBoard();
    }
  }, []);

  useEffect(() => {
    setBoardId(boardId);
  }, [boardId]);

  return (
    <GlobalAlertContextProvider>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={reset}>
            Flickr Board
            </Typography>
          <Tabs value={page} onChange={handlePageChange}>
            <Tab label="Home"></Tab>
            <Tab label="Boards"></Tab>
          </Tabs>
        </Toolbar>
      </AppBar>
      <div className='app'>
        <TabPanel index={Page.HOME} value={page}>
          <div className='home'>
            <LeftPanel></LeftPanel>
            <div className='board-container'>
              <Board></Board>
            </div>
          </div>
        </TabPanel>
        <TabPanel index={Page.BOARDS} value={page}>
          <BoardList></BoardList>
        </TabPanel>
      </div>
    </GlobalAlertContextProvider>
  );
};

const TabPanel: React.FC<any> = ({ children, index, value }) => {

  if (value !== index) return null;

  return <div className='page'>{children}</div>;
}

export default App;
