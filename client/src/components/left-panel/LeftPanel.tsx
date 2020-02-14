import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { toggleProperty } from '../../util/util';
import './LeftPanel.scss';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

type Props = {
    photos: any[] | null | undefined,
    addPhotos: (photos: any[]) => void,
    onSearch: (searchText: string) => void,
    isLoading: boolean,
    isError: boolean
}

export const LeftPanel: React.FC<Props> = ({ photos, isLoading, isError, addPhotos, onSearch }) => {
    const [selectedPhotos, setSelectedPhotos] = useState({});

    function toggleSelectPhoto(photo) {
        let newSelectedPhotos = toggleProperty(selectedPhotos, photo, photo.id);
        setSelectedPhotos(newSelectedPhotos);
    }

    function _addPhotos(photos) {
        setSelectedPhotos([]);
        addPhotos(photos);
    }


    function getResults() {
        if (isLoading) {
            return 'Loading ...'
        }

        if (isError) {
            return 'Error getting photos'
        }

        return <List className='result-container' dense={true}>
            {photos?.map(photo => <ListItem
                dense={true}
                button={true}
                key={photo.id}
                selected={!!selectedPhotos[photo.id]}
                onDoubleClick={() => addPhotos([photo])}
                onClick={() => toggleSelectPhoto(photo)}>
                <ListItemText>{photo.title}</ListItemText></ListItem>)}
        </List>;
    }

    return (
        <div className='left-panel-container'>
            <TextField className='search-box'
                placeholder='Dog, Cat etc'
                variant='filled'
                label='Search photos'
                onChange={e => onSearch(e.target.value)} />
            {getResults()}
            <Button className='add-btn'
                variant="contained"
                onClick={() => _addPhotos(Object.values(selectedPhotos))}>
                Add Pictures
            </Button>
        </div>
    )
}