import React from 'react';

type Props = {
	params: {
		id: number;
	};
};

function page({ params }: Props) {
	return <div>{params.id}</div>;
}

export default page;
