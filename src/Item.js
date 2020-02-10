import React, {useState} from 'react';
import styled from 'styled-components';
import uuid4 from 'uuid4';




export const Item = (props) => {

    const {text,dispatch,item,colid,id,next_id,prev} = props;

    //click triggers deletion and copy of item content to prev or next
    //changes to column state

    const changeColumnsRight = () => {
        let addition = {id:id,text:text};
        dispatch({type:'DELETE',colId:colid,itemId:id});
        dispatch({type:'APPEND',destination:next_id,payload:addition});
      
        
        
       



    }

    const changeColumnsLeft = () => {
        let addition = {id:id,text:text};
        dispatch({type:'DELETE',colId:colid,itemId:id});
        dispatch({type:'APPEND',destination:prev.id,payload:addition});
        console.log('left shift',prev)
      
        
        
       



    }


    return (

        <StyledItem>
            <button className='prev' onClick={changeColumnsLeft}></button>
            <p>{text}</p>
            <button className='next' onClick={changeColumnsRight}></button>
        </StyledItem>
    )





}


const StyledItem = styled.div `


    height:100px;
    border:1px solid black;
    display:flex;

`