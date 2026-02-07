import type { Grid } from '../types';
import { Tile } from './Tile';
import styles from '../styles/Board.module.css';

type Props = {
    grid: Grid;
};

export const Board = ({ grid }: Props) => {
    const tiles = grid.flat().filter(cell => cell !== null);

    return (
        <div className={styles.boardContainer}>
            <div className={styles.gridContainer}>
                {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className={styles.gridCell} />
                ))}
            </div>

            <div className={styles.tileContainer}>
                {tiles.map((cell) => (
                    <Tile key={cell!.id} cell={cell!} />
                ))}
            </div>
        </div>
    );
};
