import React, { useState } from 'react';

export const ModalContext = React.createContext();
export const ModalProvider = (props) => {
	const [ modalState, toggleModal ] = useState({ component: null, isOpen: false });
	const { children } = props;
	return (
		<ModalContext.Provider
			value={{
				data: modalState,
				toggleModal: (c) => {
					if (modalState.isOpen) {
						toggleModal({ ...modalState, component: null, isOpen: !modalState.isOpen });
					} else {
						toggleModal({ ...modalState, component: c, isOpen: !modalState.isOpen });
					}
				}
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};
