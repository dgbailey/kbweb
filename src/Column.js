import React, {useState} from 'react';
import styled from 'styled-components';
import uuid4 from 'uuid4';
import {Item} from './Item';


export const Column = (props) => {


   

    const {title,dispatch,col,id,index,colOrderKeys} = props;
    const {items,next,next_id,prev,next_index,prev_index} = col;
    
     
    const addCard = () => {
        //this now needs to dispatch an action
        let text = window.prompt();

        const card = {
            id:uuid4(),
            text:text
        }

        dispatch({type:'APPEND',destination:id,payload:card})

       
       //need new card with data
       //we need to add this card to our column state

    }

    //originally this function was pushing stale, 
    //and unecessary information back into original state which the mapping function was 
    //not written to process or reset ,causing items to have misinformation 
   
    //track of their new previous and next positions
    //solution was to match pushed state to original schema in Board
    const moveColRight = () => {
        
        let nextIndex = next.index;
        let myIndex = index;
        let temp = colOrderKeys[nextIndex];
        let colOrderCopy = [...colOrderKeys];
        colOrderCopy[nextIndex] = colOrderCopy[myIndex];
        colOrderCopy[myIndex] = temp;

       

        dispatch({type:'SETCOLORDER',payload:colOrderCopy});
     

    }
    const moveColLeft = () => {
        let prevIndex = prev.index;
 
        let myIndex = index;
        let temp = colOrderKeys[prevIndex];
        let colOrderCopy = [...colOrderKeys];
        colOrderCopy[prevIndex] = colOrderCopy[myIndex];
        colOrderCopy[myIndex] = temp;
       

        dispatch({type:'SETCOLORDER',payload:colOrderCopy});
     

    }

    function dragoverHandler(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        e.target.classList.add('dropZoneIdentifier');
        
       
    }

    function dropHandler(e) {
        e.preventDefault();
        let data = {}
        // Get the id of the target and add the moved element to the target's DOM
        data['id'] = e.dataTransfer.getData('id');
        data['text'] = e.dataTransfer.getData('text');
       //dispatch event to column with card data , append to end no considering order
       e.target.classList.remove('dropZoneIdentifier');    
       dispatch({type:'APPEND',destination:id,payload:{'id':data.id,'text':data.text}})
    }

    function handleDragExit(e){
        e.preventDefault();
        e.target.classList.remove('dropZoneIdentifier');
    }
    
    


    return(

        <StyledColumn >
            <div className= {`header ${title}`}>
                <h1>{title}</h1>
                <button onClick={moveColLeft}>Move Left</button>
                <button onClick={moveColRight}>Move Right</button>
            </div>
            <div className='dropzone' onDragOver={dragoverHandler} onDrop={dropHandler} onDragLeave={handleDragExit}>
                 
                {items.map((ci,index) => <Item  dispatch={dispatch} colid ={id} text={ci.text} prev={prev} next={next} next_id={next_id} key={ci.id} id={ci.id} index={index}></Item>)}
               
            </div>
            <button onClick={addCard}>Add Card</button>
           
        </StyledColumn>


    )







}



const StyledColumn = styled.div `

    border:1px solid black;
    min-width:218.75px;
    .header{
        height:32px;
        
       &.title1{
           background:#8E6E95;
       }

       &.title2{
           background:#39A59C;
       }

       &.title3{
           background:#344759;
       }

       &.title4{
           background:#E8741E;
       }
    }

    .dropzone{
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;

        &.dropZoneIdentifier{
        background:lightgray;
    }
    }

    


`