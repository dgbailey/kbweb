import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ActionButton} from './Button';
import {ActionInput} from './ActionInput';
import {useSelector} from 'react-redux';

const propTypes = {
    name:PropTypes.string
}


export function NewBoard({name = "Get Started"}){

    const boardState = useSelector(state => state.expBoard);


    return (

        <StyledBoard>
            <h1>{name}</h1>
            <ActionButton description={"Custom Name"}>
                <ActionInput></ActionInput>
            </ActionButton>
            <section className="columns">
            {Object.keys(boardState.columns.byId).map( k => {
                const column = boardState.columns.byId[k];
                return(
                    <dl>
                        <dt>{column.name}</dt>
                    </dl>
                )
            })}
            </section>
        </StyledBoard>

    )


}

NewBoard.propTypes = propTypes;


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