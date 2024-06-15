import React from 'react';
import { usePatternContext } from './PatternContext';

export interface ImageContextProps {
    width: number;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    imageElements: HTMLImageElement[];
    setImageElements: (elements: HTMLImageElement[]) => void;
}

export const ImageContext = React.createContext<ImageContextProps | undefined>(undefined);

export const useImageContext = () => {
    const imageContext = React.useContext(ImageContext);
    if (!imageContext)
        throw new Error(
            'No ImageContext.Provider found when calling useImageContext.'
        );
    return imageContext;
};

export const ImageContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [width, setWidth] = React.useState<number>(0);
    const [height, setHeight] = React.useState<number>(0);
    const [imageElements, setImageElements] = React.useState<HTMLImageElement[]>([]);

    const { setImagePatternMap } = usePatternContext();

    const handleSetImageElements = (elements: HTMLImageElement[]) => {
        setImageElements(elements);

        const size = Math.ceil(Math.sqrt(elements.length));
        setImagePatternMap(new Array(size).fill(new Array(size).fill(0)));
    }

    return (
        <ImageContext.Provider value={{ width, setWidth, height, setHeight, imageElements, setImageElements: handleSetImageElements }}>
            {children}
        </ImageContext.Provider>
    );
}