import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const propTypes = {
    description:PropTypes.string,
    children:PropTypes.element
}

const defaultProps = {
    description:'Create Column'
}


export const ActionButton = props => {

    const {description,children} = props;
    const [toggled,setToggleState] = useState(true);


    const rootToggle = (e) => {
       
        setToggleState(!toggled);
    }

    return (
        <StyledButton className={toggled ? "hidden":""} onClick={rootToggle}>
            <h4 className={`${!toggled ? 'hidden':'btn-description'}`}>{description}</h4>
            <StyledVisArea className={toggled ? "hidden":""}>
                {children}
            </StyledVisArea>
        </StyledButton>
    )



}

ActionButton.propTypes = propTypes;
ActionButton.defaultProps = defaultProps;

const StyledButton = styled.button `
    display:flex;
    flex-direction:column;
    background:gray;
    opacity:.3;
    position:relative;
    width:200px;
    height:60px;
    transition:.5s ease;
    padding: 0px;
    border: 0px;
    .hidden{
        display:none;
    }


`

const StyledVisArea = styled.form `
   
    height:60px;
    width:200px;
    ${'' /* background:lightgray; */}
    z-index:2;
    opacity:1;
    display:flex;
    flex-wrap:wrap;
  
    justify-content:space-between;
    &.hidden{
        display:none;
    }
    
        
`