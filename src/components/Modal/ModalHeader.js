import React from 'react';
import styled from 'styled-components';
export const ModalHeader = (props) => {
    const {children} = props;
    return (
    <>
    <StyledModalHeader>
        {React.Children.map(children,(c) => <li>{c}</li>)}
    </StyledModalHeader>
    </>
    )
}

const StyledModalHeader = styled.ul `
    margin:0px;
    padding:5px;
    display:flex;
    justify-content:space-between;
    height:70px;
    border:1px solid blue;
    width:100%;
    
    
`