import React from 'react';

import { useImageContext } from '../../context/ImageContext';
import { usePatternContext } from '../../context/PatternContext';

const ROW_OFFSET_INDEXES: number[] = [];
const COLUMN_OFFSET_INDEXES: number[] = [];

const ImageResult: React.FC<{}> = ({ }) => {
    const { width, height, imageElements } = useImageContext();
    const { imagePatternMap } = usePatternContext();

    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    
    const draw = (ctx: CanvasRenderingContext2D) => {
        let imageIndexes = Array.from(Array(imageElements.length).keys());
        let posX = 0;
        let posY = 0;
        imagePatternMap.forEach((row, rowIndex) => {
            row.forEach((showImage, columnIndex) => {
                if (showImage) {
                    let imageIndex = imageIndexes.splice(Math.floor(Math.random() * imageIndexes.length), 1)[0];

                    let x = ROW_OFFSET_INDEXES.includes(rowIndex) ? posX + width / 2 : posX;
                    let y = COLUMN_OFFSET_INDEXES.includes(columnIndex) ? posY + height / 2 : posY;

                    ctx.drawImage(imageElements[imageIndex], x, y);
                }
                posX += width;
            });
            posX = 0;
            posY += height;
        });
    }
  
    React.useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            canvas.width = imagePatternMap[0].length * width;
            canvas.height = imagePatternMap.length * height + (COLUMN_OFFSET_INDEXES.length ? height / 2 : 0);
            const context = canvas.getContext('2d')
            
            if (context) {
                draw(context);
            }
        }
    }, [draw])

    return (
        <React.Fragment>
            <div>Image count: {imageElements.length}</div>
            <canvas ref={canvasRef} />
        </React.Fragment>
    )
};

export default ImageResult;