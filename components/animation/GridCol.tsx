/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useCallback, useEffect, useState } from 'react';

function GridCol({ size }: { size: number }) {
	const SIZE = size;
	const NEW_SPAWN_PROBABILITY = 0.05;
	const INITIAL_SPAWN_PROBABILITY = 0.05;
	const TIME_INTERVAL = 1250;

	const [cells, setCells] = useState<any[]>([]);
	const [play, setPlay] = useState(true);

	// Sets initial size of the grid
	useEffect(() => {
		const initialCells = [];
		for (let i = 0; i < SIZE; i++) {
			if (Math.random() <= INITIAL_SPAWN_PROBABILITY) {
				initialCells.push(true);
			} else {
				initialCells.push(false);
			}
		}
		setCells(initialCells);
	}, [SIZE]);

	// Calculates the positions of cells on next render and spawns in new cell from the top depending on probabiliity
	const next = useCallback(() => {
		if (!play) {
			return;
		}
		const nextCells = [...cells];

		let droppedCell = false;
		for (let i = cells.length - 1; i >= 0; i--) {
			if (i === cells.length - 1) {
				// if bottom cell is filled - remain filled and go next
				if (cells[i]) {
					continue;
				}
				// if bottom cell is empty but cell above is not - drop the cell in to the bottom one
				if (cells[i - 1]) {
					nextCells[i] = true;
					nextCells[i - 1] = false;
					droppedCell = true;
					continue;
				}
			} else if (i === 0) {
				// if top cell
				if (droppedCell) {
					// if it was dropped empty the cell
					nextCells[i] = false;
				} else {
					// if it was not dropped and filled it must be on a stack
					if (cells[i]) {
						nextCells[i] = true;
					} else {
						// otherwise if not filled remain empty
						nextCells[i] = false;
					}
				}
			} else {
				if (droppedCell) {
					// if cell has fallen down and there is room for the above cell to fall into
					// if the cell above is filled make it fall down
					if (cells[i - 1]) {
						nextCells[i] = true;
						nextCells[i - 1] = false;
						continue;
					}
					// if the cell above is not filled nothing can fall into it - make empty
					else {
						nextCells[i] = false;
						droppedCell = false;
						continue;
					}
				}
				// if the cell was not dropped - either part of a stack or empty
				else {
					// part of a stack - remain as is
					if (cells[i + 1] && cells[i]) {
						continue;
					}
					if (!cells[i]) {
						if (cells[i - 1]) {
							nextCells[i] = true;
							nextCells[i - 1] = false;
							droppedCell = true;
							continue;
						}
					}
				}
			}
		}
		// add probability to spawn new filled cell
		if (!nextCells[0]) {
			if (Math.random() <= NEW_SPAWN_PROBABILITY) {
				nextCells[0] = true;
			}
		}

		setCells(nextCells);
	}, [cells, play]);

	// Starts the interval to render next positions of cells according to the TIME_INTERVAL
	useEffect(() => {
		const interval = setInterval(() => {
			next();
		}, TIME_INTERVAL);
		return () => clearInterval(interval);
	}, [next]);

	return (
		<div className="h-full w-full">
			{/* <button onClick={() => setPlay(!play)}>{play ? 'pause' : 'play'}</button> */}
			<div
				className="grid grid-cols-1 h-full"
				style={{ gridTemplateRows: `repeat(${SIZE} 1fr)` }}
			>
				{cells.map((cell, ind) => (
					<div
						className={`outline outline-offset-0 outline-[0.25px] outline-muted/70 dark:data-[filled=true]:bg-muted/20 data-[filled=true]:bg-muted/70 data-[filled=true]:hover:bg-muted-foreground transition-colors duration-300`}
						data-filled={cell ? 'true' : 'false'}
						key={ind}
					></div>
				))}
			</div>
		</div>
	);
}

export default GridCol;
