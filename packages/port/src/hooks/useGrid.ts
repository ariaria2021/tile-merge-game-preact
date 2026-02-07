import { useState, useCallback } from 'preact/hooks';
import type { Grid, Direction } from '../types';
import { createEmptyGrid, addRandomTile } from '../utils/gridUtils';
import { rotateRight, rotateLeft, processRow } from '../utils/moveUtils';

export const useGrid = () => {
    const [grid, setGrid] = useState<Grid>(() => {
        let initialGrid = createEmptyGrid();
        initialGrid = addRandomTile(initialGrid);
        initialGrid = addRandomTile(initialGrid);
        return initialGrid;
    });

    const move = useCallback((direction: Direction) => {
        let moved = false;
        let totalScore = 0;

        let processingGrid = [...grid];

        if (direction === 'RIGHT') processingGrid = rotateRight(rotateRight(processingGrid));
        if (direction === 'UP') processingGrid = rotateLeft(processingGrid);
        if (direction === 'DOWN') processingGrid = rotateRight(processingGrid);

        const newRows = processingGrid.map((row) => {
            const { newRow, score } = processRow(row);
            totalScore += score;
            return newRow;
        });

        let computedGrid = newRows;
        if (direction === 'RIGHT') computedGrid = rotateLeft(rotateLeft(computedGrid));
        if (direction === 'UP') computedGrid = rotateRight(computedGrid);
        if (direction === 'DOWN') computedGrid = rotateLeft(computedGrid);

        const isChanged = JSON.stringify(grid.map(r => r.map(c => c?.value))) !==
            JSON.stringify(computedGrid.map(r => r.map(c => c?.value)));

        if (isChanged) {
            moved = true;

            let finalGrid = addRandomTile(computedGrid);

            finalGrid = finalGrid.map((row, r) =>
                row.map((cell, c) =>
                    cell ? { ...cell, position: [r, c] } : null
                )
            );

            setGrid(finalGrid);
        }

        return { moved, score: totalScore };
    }, [grid]);

    const resetGrid = useCallback(() => {
        let newGrid = createEmptyGrid();
        newGrid = addRandomTile(newGrid);
        newGrid = addRandomTile(newGrid);
        setGrid(newGrid);
    }, []);

    return { grid, move, resetGrid };
};
