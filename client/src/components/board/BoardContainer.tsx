import React, { useEffect, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOARD } from '../../services/board-service';
import { Board } from './Board';
import { useGlobalClientState } from '../../contexts/globalClientState';
import { Typography } from '@material-ui/core';

type Props = {
    className?: string;
}

export const BoardContainer: React.FC<Props> = ({ ...props }) => {
    let [{ boardId }] = useGlobalClientState();

    let { data, error, loading } = useQuery(GET_BOARD, {
        variables: { id: boardId }
    });

    if (loading || !data.board) return <Typography>Loading Board ...</Typography>;
    if (error) {
        return <Typography>Board Error ..</Typography>;
    }

    if (!data?.board.tiles.length) {
        return <Typography variant='h5'
            className='board-container'
            color='textSecondary'>Empty Board</Typography>
    }

    return (
        <Board name={data.board.name}
            tiles={data?.board?.tiles} onLayout={() => { }}></Board>
    )
}
