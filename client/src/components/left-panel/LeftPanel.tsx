import React, { useState, useMemo, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { toggleProperty } from '../../util/util';
import './LeftPanel.scss';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const ResultItem : React.FC<any> = React.memo(({photo, onDoubleClick, onClick, ...props}) => {
    const _onDoubleClick = () => onDoubleClick([photo]);
    const _onClick = () => onClick([photo]);

    return <ListItem
        {...props}
        dense={true}
        button={true}
        onDoubleClick={_onDoubleClick}
        onClick={_onClick}>
            <ListItemText>{photo.title}</ListItemText>
    </ListItem>
});

type Props = {
    photos: any[] | null | undefined,
    didAddPhotos: (photos: any[]) => void,
    onSearch: (searchText: string) => void,
    isLoading: boolean,
    isError: boolean,
    className?: string
}

export const LeftPanel: React.FC<Props> = React.memo(({ photos, isLoading, isError, didAddPhotos, onSearch, ...props }) => {
    const [selectedPhotos, setSelectedPhotos] = useState({});

    const toggleSelectPhoto = useCallback(photo => {
        setSelectedPhotos(selectedPhotos => {
            return toggleProperty(selectedPhotos, photo, photo.id);
        });
    }, []);

    const addPhotos = useCallback(photos => {
        setSelectedPhotos([]);
        didAddPhotos(photos);
    }, [didAddPhotos]);
    
    const results = (() => {
        if (isLoading) {
            return 'Loading ...'
        }

        if (isError) {
            return 'Error getting photos'
        }

        let prop1 = { a: 1, b: 2 };

        return <List className='result-container' dense={true}>
            {photos?.map(photo => <ResultItem
                key={photo.id}
                photo={photo}
                prop1={prop1}
                selected={!!selectedPhotos[photo.id]}
                onDoubleClick={addPhotos}
                onClick={toggleSelectPhoto}></ResultItem>)}
        </List>;
    })();

    return (
        <div className='left-panel-container'>
            <TextField className='search-box'
                placeholder='Dog, Cat etc'
                variant='filled'
                label='Search photos'
                onChange={e => onSearch(e.target.value)} />
            {results}
            <Button className='add-btn'
                variant="contained"
                onClick={() => addPhotos(Object.values(selectedPhotos))}>
                Add Pictures
            </Button>
        </div>
    )
})