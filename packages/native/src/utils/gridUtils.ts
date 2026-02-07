import type { Grid } from '../types';

export const GRID_SIZE = 4;

export const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};

export const createEmptyGrid = (): Grid => {
    return Array.from({ length: GRID_SIZE }, () =>
        Array.from({ length: GRID_SIZE }, () => null)
    );
};

export const getEmptyCells = (grid: Grid): [number, number][] => {
    const emptyCells: [number, number][] = [];
    grid.forEach((row, r) => {
        row.forEach((cell, c) => {
            if (!cell) {
                emptyCells.push([r, c]);
            }
        });
    });
    return emptyCells;
};

export const addRandomTile = (grid: Grid): Grid => {
    const emptyCells = getEmptyCells(grid);
    if (emptyCells.length === 0) return grid;

    const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = grid.map(row => [...row]);

    const value = Math.random() < 0.9 ? 2 : 4;

    newGrid[r][c] = {
        id: generateId(),
        value,
        position: [r, c],
        isNew: true,
    };

    return newGrid;
};

export const isGameOver = (grid: Grid): boolean => {
    if (getEmptyCells(grid).length > 0) return false;

    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE - 1; c++) {
            if (grid[r][c]?.value === grid[r][c + 1]?.value) return false;
        }
    }

    for (let c = 0; c < GRID_SIZE; c++) {
        for (let r = 0; r < GRID_SIZE - 1; r++) {
            if (grid[r][c]?.value === grid[r + 1][c]?.value) return false;
        }
    }

    return true;
};
