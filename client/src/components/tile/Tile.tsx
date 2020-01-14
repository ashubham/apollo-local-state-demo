import React from 'react';

type Props = {
    tile: any
}

export const Tile: React.FC<Props> = ({ tile }) => {
    return (<div>
        <img src={tile.imageUrl}></img>
    </div>)
}