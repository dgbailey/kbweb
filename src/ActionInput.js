import React,{useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';



const propTypes = {
    placeHolder:PropTypes.string,
    name:PropTypes.string,
    type:PropTypes.string,
    maxLength:PropTypes.number,
    submitText:PropTypes.string,
    toggleText:PropTypes.string
}

const defaultProps = {
    placeHolder:"Type column name",
    name:"name",
    type:"text",
    maxLength:1200,
    submitText:"Add",
    toggleText:"Exit"

}


export const ActionInput = props => {

    const {name,placeHolder,type,maxLength,toggleText,submitText} = props;
    const [inputState,setInputState] = useState({});
    const stopPropagation = (e) => {
        e.stopPropagation();
    }
    const handleChange = e => {
        let newState = {};
        newState[e.target.name] = e.target.value;
        setInputState({...inputState,...newState});
    }
    return (
        <>
            <StyledInput onChange={handleChange} onClick={stopPropagation} name={name} placeHolder={placeHolder} type={type} maxLength={maxLength}></StyledInput>
            <StyledButton>{submitText}</StyledButton>
            <StyledButton>{toggleText}</StyledButton>
        </>
        
    )
}

const StyledInput = styled.input `

    width:100%;
    height:100%;
    margin:0px;


`
const StyledButton = styled.button `
    width:40px;
`

ActionInput.propTypes = propTypes;
ActionInput.defaultProps = defaultProps;