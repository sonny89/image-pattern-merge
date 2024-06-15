import React from "react";

import ImageSizeCard from "../../component/ImageSizeCard";
import { useImageContext } from "../../context/ImageContext";
import { usePatternContext } from "../../context/PatternContext";

import styles from './PatternSelect.module.css';

const countSelectedCells = (patternMap: number[][]) => {
    return patternMap.reduce((sum, currentRow) => sum + currentRow.reduce((rowSum, value) => rowSum + value, 0), 0);
}

const PatternSelect: React.FC<{}> = ({ }) => {
    const { width, height, imageElements } = useImageContext();
    const { imagePatternMap, toggleCell, selectedCellCount } = usePatternContext();

    const onSelect = (rowIndex: number, columnIndex: number) => {
        if (imagePatternMap[rowIndex][columnIndex] === 1 || selectedCellCount < imageElements.length) {
            toggleCell(rowIndex, columnIndex);
        }
    }
    
    return (
        <div className={styles.root}>
            {imagePatternMap.map((patternRow, rowIndex) => {
                return patternRow.map((value, columnIndex) => (
                    <ImageSizeCard
                        width={width}
                        height={height}
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        selected={!!value}
                        selectable={!!value || selectedCellCount < imageElements.length}
                        onSelect={onSelect}
                    />
                ));
            })}
        </div>
    )
}

export default PatternSelect;