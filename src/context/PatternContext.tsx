import React from 'react';

const DEFAULT_IMAGE_PATTERN_MAP = [
    [0,0,0,1,1,1,0,0,0],
    [0,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1],
    [0,0,1,1,1,1,1,0,0],
    [0,0,0,0,1,0,0,0,0],
];

// kereszt
// const DEFAULT_IMAGE_PATTERN_MAP = [
//     [0,0,0,0,0,1,1,0,0,0,0,0],
//     [0,0,0,0,0,1,1,0,0,0,0,0],
//     [1,1,1,1,1,1,1,1,1,1,1,1],
//     [1,1,1,1,1,1,1,1,1,1,1,1], 
//     [0,0,0,0,0,1,1,0,0,0,0,0],
//     [0,0,0,0,0,1,1,0,0,0,0,0],
//     [0,0,0,0,0,1,1,0,0,0,0,0],
//     [0,0,0,0,0,1,1,0,0,0,0,0],
//     [0,0,0,0,0,1,1,0,0,0,0,0],
//     [0,0,0,0,0,1,1,0,0,0,0,0],
//     [0,0,0,0,0,1,1,0,0,0,0,0],
//     [0,0,0,0,0,1,1,0,0,0,0,0]
// ];

const copyPatternMap = (patternMap: number[][]) => patternMap.map((row) => [...row]);

const countSelectedCells = (patternMap: number[][]) => {
    return patternMap.reduce((sum, currentRow) => sum + currentRow.reduce((rowSum, value) => rowSum + value, 0), 0);
}

export interface PatternContextProps {
    imagePatternMap: number[][];
    setImagePatternMap: (value: number[][]) => void;
    addRow: () => void;
    addColumn: () => void;
    toggleCell: (rowIndex: number, columnIndex: number) => void;
    selectedCellCount: number;
}

export const PatternContext = React.createContext<PatternContextProps | undefined>(undefined);

export const usePatternContext = () => {
    const patternContext = React.useContext(PatternContext);
    if (!patternContext)
        throw new Error(
            'No PatternContext.Provider found when calling usePatternContext.'
        );
    return patternContext;
};

export const PatternContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [imagePatternMap, setImagePatternMap] = React.useState<number[][]>([[]]);
    const [selectedCellCount, setSelectedCellCount] = React.useState(0);

    React.useEffect(() => {
        setSelectedCellCount(countSelectedCells(imagePatternMap));
    }, [imagePatternMap]);

    const addRow = () => {
        setImagePatternMap((currentPatternMap) => {
            const newRow = new Array(currentPatternMap[0].length).fill(0);
            return [...copyPatternMap(currentPatternMap), newRow];
        });
    }

    const addColumn = () => {
        setImagePatternMap((currentPatternMap) => {
            return currentPatternMap.map((row) => {
                const newRow = [...row];
                row.push(0);
                return newRow;
            });
        });
    }

    const toggleCell = (rowIndex: number, columnIndex: number) => {
        setImagePatternMap((currentPatternMap) => {
            const newPatternMap = copyPatternMap(currentPatternMap);
            const currentCellValue = newPatternMap[rowIndex][columnIndex];
            newPatternMap[rowIndex][columnIndex] = currentCellValue ? 0 : 1;
            return newPatternMap;
        });
    }

    return (
        <PatternContext.Provider value={{ imagePatternMap, setImagePatternMap, addRow, addColumn, toggleCell, selectedCellCount }}>
            {children}
        </PatternContext.Provider>
    );
}