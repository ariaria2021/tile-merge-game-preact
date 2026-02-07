import type { Grid, Cell } from '../types';
import { GRID_SIZE } from './gridUtils';

export const rotateRight = (grid: Grid): Grid => {
    const newGrid: Grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            newGrid[c][GRID_SIZE - 1 - r] = grid[r][c];
        }
    }
    return newGrid;
};

export const rotateLeft = (grid: Grid): Grid => {
    const newGrid: Grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            newGrid[GRID_SIZE - 1 - c][r] = grid[r][c];
        }
    }
    return newGrid;
};

export const processRow = (row: (Cell | null)[]): { newRow: (Cell | null)[], score: number } => {
    let cells = row.filter((cell) => cell !== null) as Cell[];
    let score = 0;

    const mergedCells: Cell[] = [];
    let skip = false;

    for (let i = 0; i < cells.length; i++) {
        if (skip) {
            skip = false;
            continue;
        }

        const current = cells[i];
        const next = cells[i + 1];

        if (next && current.value === next.value) {
            const doubledValue = current.value * 2;
            score += doubledValue;

            mergedCells.push({
                ...current,
                id: Math.random().toString(36).substr(2, 9),
                value: doubledValue,
                mergedFrom: [current, next],
                isNew: false,
            });
            skip = true;
        } else {
            mergedCells.push({
                ...current,
                mergedFrom: undefined,
                isNew: false,
            });
        }
    }

    const newRow = [...mergedCells, ...Array(4 - mergedCells.length).fill(null)];
    return { newRow, score };
};
