import React from 'react';
import PropTypes from 'proptypes';
import styled from 'styled-components';
import {mount} from 'enzyme';

const propTypes = {
    name:PropTypes.string,
    isActive:PropTypes.bool
}

export const PresenceIcon = (props) => {
    const {name,isActive} = props;
    const firstCharacter = name.slice(0,1);
    return <StyledPresenceIcon>{firstCharacter}</StyledPresenceIcon>
}
PresenceIcon.propTypes = propTypes;

const StyledPresenceIcon = styled.span `
    margin:-2px;
    border:1px solid black;
    border-radius:50%;
    display:inline-block;
    height:30px;
    width:30px;
    background:lightgray;
    justify-content:center;
   

`