import React, {
    useContext,
    useReducer
} from 'react';
import { createContainer } from 'react-tracked';

enum Actions {
    SET_BOARD,
    SET_PAGE,
    SET_SEARCH
}

export enum Page {
    HOME,
    BOARDS
}

const { Provider, useTracked } = createContainer(() => useReducer((state, action) => {
    switch (action.type) {
        case Actions.SET_BOARD:
            return {
                ...state,
                boardId: action.boardId
            }
        case Actions.SET_PAGE:
            return {
                ...state,
                page: action.page
            }
        case Actions.SET_SEARCH:
            return {
                ...state,
                searchText: action.searchText
            }
        default:
            return state;
    }
}, {
    boardId: '',
    page: Page.HOME,
    searchText: ''
}));


export const useGlobalClientState = () => {
    let [ state, dispatch ] = useTracked();
    let setBoardId = (boardId) => {
        dispatch({ type: Actions.SET_BOARD, boardId })
    };
    let setPage = (page: Page) => {
        dispatch({ type: Actions.SET_PAGE, page });
    }
    let setSearchText = (searchText: string) => {
        dispatch({ type: Actions.SET_SEARCH, searchText });
    }
    return [
        state,
        {
            setBoardId,
            setPage,
            setSearchText
        }
    ];
}

export const SessionContextProvider = Provider;
