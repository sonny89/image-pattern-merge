import React from 'react';
import classNames from 'classnames';

import styles from './ImageSizeCard.module.css';

const DISPLAY_WIDTH = 100;
const DISPLAY_GAP = 2;

export interface ImageSizeCardProps {
    width: number;
    height: number;
    rowIndex: number;
    columnIndex: number;
    selected?: boolean;
    selectable?: boolean;
    onSelect: (rowIndex: number, columnIndex: number) => void;
}

const ImageSizeCard: React.FC<ImageSizeCardProps> = ({ width, height, rowIndex, columnIndex, selected, selectable, onSelect }) => {
    const displayHeight = height * DISPLAY_WIDTH / width;

    const onClick = () => {
        onSelect(rowIndex, columnIndex);
    }

    return (
        <div
            className={classNames(styles.root, selected && styles.selected, !selectable && styles.notSelectable )}
            style={{
                width: `${DISPLAY_WIDTH}px`,
                height: `${displayHeight}px`,
                left: `${columnIndex * (DISPLAY_WIDTH + DISPLAY_GAP)}px`,
                top: `${rowIndex * (displayHeight + DISPLAY_GAP)}px`,
            }}
            onClick={onClick}
        >
            {`${width} x ${height}`}
        </div>
    )
};

export default ImageSizeCard;