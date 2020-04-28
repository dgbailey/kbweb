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
    align-items:center;
    justify-content:space-around;
    height:50px;
    background:#d3d3d35c;
    width:100%;
    
    
`