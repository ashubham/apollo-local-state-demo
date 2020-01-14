import React, { useState, useRef, useEffect } from 'react';
import reactPackery from 'react-packery-component';
import { Tile } from '../tile/Tile';

const Packery = reactPackery(React);

const packeryOptions = {
    transitionDuration: 0
};

type Props = {
    tiles: any[],
    onLayout: (tiles: any[]) => void 
}

export const Board: React.FC<Props> = ({ tiles, onLayout }) => {
    const containerRef: any = useRef(null);
    useEffect(() => {
        containerRef?.current?.packery.on('layoutComplete', onLayout);
    })

    return (
        <Packery
            ref={containerRef}
            className={'board'} // default ''
            elementType={'div'} // default 'div'
            options={{
                transitionDuration: 0,
            }} // default {}
            disableImagesLoaded={false}> 
            {tiles?.map(tile => <Tile tile={tile}></Tile>)}
        </Packery >)    
}