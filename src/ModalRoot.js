import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
