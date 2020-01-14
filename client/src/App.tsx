import React, { useEffect } from 'react';
import { QueryResult } from '@apollo/react-common';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_BOARD } from './services/board-service';

import { appContext } from './AppContext';
import { LeftPanel } from './components/left-panel';
import { Board } from './components/board';


const App: React.FC = () => {
  let [createBoard, {data}] = useMutation(CREATE_BOARD);
  useEffect(() => {
      createBoard();
  }, []);

  return (
    <appContext.Provider value={{boardId: data?.createBoard.id}}>
      {(data?.createBoard.id) ? (<div style={{ display: 'flex' }}>
        <LeftPanel></LeftPanel>
        <Board></Board>
      </div>): ''}
    </appContext.Provider>
  );
};

export default App;
