import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ActionButton} from './ActionButton';
import {ActionInput} from './ActionInput';



export function NewBoard({name = "Get Started"}){

    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    return (

        <StyledBoard>
            <h1>{name}</h1>
            <ActionButton description={"Custom Name"}>
                <ActionInput></ActionInput>
            </ActionButton>
        </StyledBoard>

    )


}

NewBoard.propTypes = {
    name:PropTypes.string
}



const StyledBoard = styled.section `

    height:800px;
    width:1000px;
    margin:100px auto;
    border:1px solid black;

    h1{
        font-size:20px;
        font-weight:800;
    }


`