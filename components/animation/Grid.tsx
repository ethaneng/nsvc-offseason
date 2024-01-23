/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import GridCol from './GridCol';

function Grid() {
	const CELL_SIZE = 60;

	const divRef = useRef<HTMLDivElement | null>(null);
	const [cols, setCols] = useState(0);
	const [rows, setRows] = useState(0);
	function calcGridSize() {
		if (divRef.current) {
			setCols(Math.floor(divRef.current.clientWidth / CELL_SIZE));
			setRows(Math.floor(divRef.current.clientHeight / CELL_SIZE));
		}
	}
	useEffect(() => {
		calcGridSize();
		window.addEventListener('resize', calcGridSize);
		return () => {
			window.removeEventListener('resize', calcGridSize);
		};
	}, []);

	const showGrid = useCallback(() => {
		const grid = [];

		for (let i = 0; i < cols; i++) {
			grid.push(
				<GridCol
					size={rows}
					key={`grid-col-${i}`}
				/>
			);
		}
		return grid;
	}, [cols, rows]);

	return (
		<div
			ref={divRef}
			className="absolute flex border-[0.25px] w-full h-full top-0 left-0 border-white/10 -z-10"
		>
			{showGrid()}
		</div>
	);
}

export default Grid;
