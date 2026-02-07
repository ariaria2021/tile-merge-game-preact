import { signal, computed } from '@preact/signals';
import type { Grid, Direction } from '../types';
import { createEmptyGrid, addRandomTile, isGameOver } from '../utils/gridUtils';
import { rotateRight, rotateLeft, processRow } from '../utils/moveUtils';

// State Signals
const initialGridValue = () => {
    let initialGrid = createEmptyGrid();
    initialGrid = addRandomTile(initialGrid);
    initialGrid = addRandomTile(initialGrid);
    return initialGrid;
};

export const grid = signal<Grid>(initialGridValue());

export const score = signal(0);
export const bestScore = signal(0);
export const finished = computed(() => isGameOver(grid.value));

// Actions
export const resetGame = () => {
    let newGrid = createEmptyGrid();
    newGrid = addRandomTile(newGrid);
    newGrid = addRandomTile(newGrid);
    grid.value = newGrid;
    score.value = 0;
};

export const move = (direction: Direction) => {
    if (finished.value) return;

    let totalScore = 0;
    let processingGrid = [...grid.value];

    if (direction === 'RIGHT') processingGrid = rotateRight(rotateRight(processingGrid));
    if (direction === 'UP') processingGrid = rotateLeft(processingGrid);
    if (direction === 'DOWN') processingGrid = rotateRight(processingGrid);

    const newRows = processingGrid.map((row) => {
        const { newRow, score: rowScore } = processRow(row);
        totalScore += rowScore;
        return newRow;
    });

    let computedGrid = newRows;
    if (direction === 'RIGHT') computedGrid = rotateLeft(rotateLeft(computedGrid));
    if (direction === 'UP') computedGrid = rotateRight(computedGrid);
    if (direction === 'DOWN') computedGrid = rotateLeft(computedGrid);

    const isChanged = JSON.stringify(grid.value.map(r => r.map(c => c?.value))) !==
        JSON.stringify(computedGrid.map(r => r.map(c => c?.value)));

    if (isChanged) {
        let finalGrid = addRandomTile(computedGrid);

        finalGrid = finalGrid.map((row, r) =>
            row.map((cell, c) =>
                cell ? { ...cell, position: [r, c] } : null
            )
        );

        grid.value = finalGrid;

        if (totalScore > 0) {
            score.value += totalScore;
            if (score.value > bestScore.value) {
                bestScore.value = score.value;
            }
        }
    }
};
