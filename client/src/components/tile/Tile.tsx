import React from 'react';
import './Tile.scss';

type Props = {
    tile: any
}

export const Tile: React.FC<Props> = ({ tile, ...props }) => {
    return (<div className='tile' {...props}>
        <img className='tile-img' src={tile.imageUrl}></img>
    </div>)
}