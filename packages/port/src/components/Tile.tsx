import { memo } from 'preact/compat';
import type { Cell } from '../types';
import styles from '../styles/Tile.module.css';

type Props = {
    cell: Cell;
};

export const Tile = memo(({ cell }: Props) => {
    const { value, position, isNew, mergedFrom } = cell;
    const [row, col] = position;

    const positionStyle = {
        width: `calc((100% - 3 * var(--gap)) / 4)`,
        height: `calc((100% - 3 * var(--gap)) / 4)`,
        left: `calc(${col} * (25% + var(--gap) / 4))`,
        top: `calc(${row} * (25% + var(--gap) / 4))`,
    };

    const classes = [
        styles.tile,
        styles[`tile${value}`],
        isNew ? styles.newTile : '',
        mergedFrom ? styles.mergedTile : '',
    ].join(' ');

    return (
        <div className={classes} style={positionStyle}>
            {value}
        </div>
    );
});
