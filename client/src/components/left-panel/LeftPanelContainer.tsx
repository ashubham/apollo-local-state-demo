import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, QueryResult } from '@apollo/client';
import { GetResultSet, GetResultSetVariables } from '../../__generated__/GetResultSet';
import { LeftPanel } from './LeftPanel';
import { useSessionStore } from '../../contexts/sessionStore';
import { useGlobalAlert } from '../../contexts/alert';

import { ADD_PHOTOS_TO_BOARD } from '../../services/board-service';
import { GET_PHOTOS } from '../../services/photo-service';
import _ from 'lodash';

type Props = {}

export const LeftPanelContainer: React.FC<Props> = () => {
    const [{ boardId }, { setSearchText: setSessionSearchText }] = useSessionStore();
    const [addPhotosToBoard, {error}] = useMutation(ADD_PHOTOS_TO_BOARD);
    const showAlert = useGlobalAlert();

    const [searchText, setSearchText] = useState('');
    const { data, loading, error: photoError }: QueryResult<GetResultSet, GetResultSetVariables>
        = useQuery(GET_PHOTOS, {
            variables: { searchText }
        });
    
    const onSearch = useCallback((text) => {
        setSearchText(text);
        setSessionSearchText(text);
    }, []);

    const addPhotos = useCallback(photos => addPhotosToBoard({
        variables: {
            input: {
                id: boardId,
                photos: photos.map((photo) => _.pick(photo, [
                    'id', 'owner', 'secret', 'server', 'farm', 'title'
                ]))
            }
        }
    }), [boardId]);
    
    if (error) {
        showAlert({
            message: "Failed to add Photos to the Board.",
            type: "error"
          });
    }

    return (<LeftPanel
        onSearch={onSearch}
        isLoading={loading}
        isError={!!photoError}
        didAddPhotos={addPhotos}
        photos={data?.resultSet?.photos}></LeftPanel>)
}