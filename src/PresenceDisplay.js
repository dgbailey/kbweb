import React from 'react';
import PropTypes from 'proptypes';
import styled from 'styled-components';
import {PresenceIcon} from './PresenceIcon';

const propTypes = {
    presenceMetaData:PropTypes.arrayOf(PropTypes.shape({
        userName:PropTypes.string,
        isActive:PropTypes.bool
    }))
}
const mockChild = {userName:'Dustin',isActive:true}
const defaultProps = {
    presenceMetaData:Array.from(Array(7)).map(mc => mockChild)
}


export const PresenceDisplay = (props) => {
    const {presenceMetaData} = props;
    return <StyledPresenceDisplay>{presenceMetaData.map(c => <PresenceIcon name={c.userName} isActive={c.isActive}/>)}</StyledPresenceDisplay>
}

PresenceDisplay.propTypes = propTypes;
PresenceDisplay.defaultProps = defaultProps;

const StyledPresenceDisplay = styled.div `
    display:flex;
    align-items:center;

`