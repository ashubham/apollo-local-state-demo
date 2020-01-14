import React, { useEffect, useContext } from 'react';
import { QueryResult } from '@apollo/react-common';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_BOARD } from '../../services/board-service';
import { Board } from './Board';
import { appContext } from '../../AppContext';

type Props = {}

export const BoardContainer: React.FC<Props> = () => {
    let { boardId } = useContext(appContext);
    let { data, error, loading } = useQuery(GET_BOARD, {
        variables: { id: boardId }
    });

    if (loading) return <div>Loading Board ...</div>;
    if (error) {
        console.error(error);
        return <div>Board Error ..</div>;
    }

    return (<div style={{marginLeft: '20px'}}>
        <b>The Board</b>
        {data?.board?.tiles.map(tile => <div key={tile.photo.id}>{tile.imageUrl}</div>)}
    </div>)
}
