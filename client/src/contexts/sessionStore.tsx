import React, {
    useContext,
    useReducer
} from 'react';

enum Actions {
    SET_BOARD,
    SET_PAGE
}

export enum Page {
    HOME,
    BOARDS
}

export const SessionContext = React.createContext<{state: any, dispatch: Function}>({
    state: {},
    dispatch: () => undefined
});

export const useSessionStore = () => {
    let { state, dispatch } = useContext(SessionContext);
    let setBoardId = (boardId) => {
        dispatch({ type: Actions.SET_BOARD, boardId })
    };
    let setPage = (page: Page) => {
        dispatch({ type: Actions.SET_PAGE, page });
    }
    return {
        boardId: state.boardId,
        page: state.page,
        setBoardId,
        setPage
    };
}

export const SessionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
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
            default:
                return state;
        }
    }, {
            boardId: '',
            page: Page.HOME
    });

    return (<SessionContext.Provider value={{ state, dispatch }}
        children={children}></SessionContext.Provider>)
}