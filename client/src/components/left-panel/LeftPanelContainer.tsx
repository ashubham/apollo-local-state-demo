import React, { useState, useContext } from 'react';
import { QueryResult } from '@apollo/react-common';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GetResultSet, GetResultSetVariables } from '../../__generated__/GetResultSet';
import { LeftPanel } from './LeftPanel';
import { appContext } from '../../AppContext';
import { ADD_PHOTOS_TO_BOARD } from '../../services/board-service';
import { GET_PHOTOS } from '../../services/photo-service';
import _ from 'lodash';

type Props = {}

export const LeftPanelContainer: React.FC<Props> = () => {
    const { boardId } = useContext(appContext);
    const [addPhotos] = useMutation(ADD_PHOTOS_TO_BOARD);
    const [searchText, setSearchText] = useState('');
    const { data, loading, error }: QueryResult<GetResultSet, GetResultSetVariables>
        = useQuery(GET_PHOTOS, {
            variables: { searchText }
        });

    return (<LeftPanel
        onSearch={setSearchText}
        isLoading={loading}
        addPhotos={photos => addPhotos({
            variables: {
                input: {
                    id: boardId,
                    photos: photos.map((photo) => _.pick(photo, [
                        'id', 'owner', 'secret', 'server', 'farm', 'title'
                    ]))
                }
        }})}
        photos={data?.resultSet?.photos.slice(0, 50)}></LeftPanel>)
}