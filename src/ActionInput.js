import React,{useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';

const propTypes = {
    placeHolder:PropTypes.string,
    name:PropTypes.string,
    type:PropTypes.string,
    maxLength:PropTypes.number,
    submitText:PropTypes.string,
    toggleText:PropTypes.string,
    style:PropTypes.object,
    submitAction:PropTypes.func,
    relationId:PropTypes.string,
}

const defaultProps = {
    placeHolder:"Enter text default",
    name:"name default",
    type:"text",
    maxLength:1200,
    submitText:"Add",
    toggleText:"Exit",
    style:{},
    submitAction:(object,dispatch) => alert('component needs submit action')

}


export const ActionInput = props => {
    const dispatch = useDispatch();
    const {relationId, submitAction,name,placeHolder,type,maxLength,toggleText,submitText} = props;
    console.log('relationid actioninput',relationId)
    const [inputState,setInputState] = useState({});

    const stopClickPropagationToMyParents = (e) => {
        //TODO explore why we need both here
    
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }
    const clickActionAggregator = e => {
        
        stopClickPropagationToMyParents(e);
        submitAction({...inputState,relationId},dispatch);
    }
    const handleChange = e => {
        let newState = {};
        newState[e.target.name] = e.target.value;
        setInputState({...inputState,...newState});
    }

    return (
        <>
            <StyledInput onChange={handleChange} onClick={stopClickPropagationToMyParents} name={name} placeHolder={placeHolder} type={type} maxLength={maxLength}></StyledInput>
            <StyledButton onClick={clickActionAggregator} type='button'>{submitText}</StyledButton>
            <StyledButton type='button' >{toggleText}</StyledButton>
        </>
        
    )
}

const StyledInput = styled.input `

    width:100%;
    margin:0px;
    background:white;
    border-radius:inherit;


`
const StyledButton = styled.button `
    width:40px;
`

ActionInput.propTypes = propTypes;
ActionInput.defaultProps = defaultProps;