import React, { useState, useRef, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Tile } from '../tile/Tile';
import { Typography } from '@material-ui/core';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './Board.scss';

const ResponsiveGridLayout = (Responsive);

type Props = {
    name: string,
    tiles: any[],
    onLayout: (tiles: any[]) => void
}

export const Board: React.FC<Props> = ({ name, tiles, onLayout }) => {

    return (
        <div className='board'>
            <Typography variant='h5'>{name}</Typography>
            <ResponsiveGridLayout
                width={1024}>
                {tiles.map((t, i) => <Tile
                    data-grid={{
                        i: t.id,
                        x: (i*4) % 12,
                        y: Infinity,
                        w: 4, h: 2
                    }}
                    key={t.id}
                    tile={t}></Tile>)}
            </ResponsiveGridLayout>
        </div>)
}