import React, { useState } from 'react';
import { toggleProperty } from '../../util/util';

type Props = {
    photos: any[] | null | undefined,
    addPhotos: (photos: any[]) => void,
    onSearch: (searchText: string) => void,
    isLoading: boolean
}

export const LeftPanel: React.FC<Props> = ({ photos, isLoading, addPhotos, onSearch }) => {
    const [selectedPhotos, setSelectedPhotos] = useState({});
    
    function toggleSelectPhoto(photo) {
        let newSelectedPhotos = toggleProperty(selectedPhotos, photo, photo.id);
        setSelectedPhotos(newSelectedPhotos);
    }

    return (
        <div className='left-panel-container'>
            <input className='search-box' onChange={e => onSearch(e.target.value)}/>
            <div className='result-container'>
                {(isLoading) ? 'Loading ...'
                    : photos?.map(photo => <div
                    key={photo.id}
                    className={(selectedPhotos[photo.id]) ? 'selected': ''}
                    onDoubleClick={() => addPhotos([photo])}
                    onClick={() => toggleSelectPhoto(photo)}>
                    {photo.title}</div>)}
            </div>
            <button className='add-btn'
                onClick={() => addPhotos(Object.values(selectedPhotos))}>
                Add Pictures
            </button>
        </div>
    )
}