import { grid } from '../state/gameState';
import { Tile } from './Tile';
import styles from '../styles/Board.module.css';

export const Board = () => {
    // grid signal を直接参照。信号が変化するとこの盤面全体が再描写されるが、
    // タイルのIDによってキー管理されているためDOMの再利用は効率的に行われる。
    const tiles = grid.value.flat().filter(cell => cell !== null);

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
