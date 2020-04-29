import React from 'react';
import { ModalContext } from './modalProvider';
export const ModalConsumer = ModalContext.Consumer;

export const ModalRoot = (props) => {
	return (
		<ModalConsumer>
			{({ data, toggleModal }) => {
				let Component = data.component;
				return Component ? <Component toggleModal={toggleModal} /> : null;
			}}
		</ModalConsumer>
	);
};
