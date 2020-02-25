import React from 'react';
import { BoardList as BoardListInner } from './BoardList';
import { useQuery } from '@apollo/client';
import { GET_BOARDS } from '../../services/board-service';
import { useGlobalAlert } from '../../contexts/alert';
import { useGlobalClientState, Page } from '../../contexts/globalClientState';

export const BoardList: React.FC = () => {
    const { data, error, loading } = useQuery(GET_BOARDS);
    const [ state, { setPage, setBoardId }] = useGlobalClientState();
    const showAlert  = useGlobalAlert();

    function onBoardSelected(boardId) {
        setBoardId(boardId);
        setPage(Page.HOME);
        window.history.pushState({}, 'Board', `/board/${boardId}`)
    }

    if (loading) return <div>Loading ...</div>;
    if (error) {
        showAlert({
            type: 'error',
            message: 'Error loading the Boards list'
        });
        return <div>Error</div>
    }
    return <BoardListInner rows={data.getBoards}
        onBoardSelected={onBoardSelected}></BoardListInner>
}