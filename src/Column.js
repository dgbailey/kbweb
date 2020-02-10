import React, {useState} from 'react';
import styled from 'styled-components';
import uuid4 from 'uuid4';
import {Item} from './Item';


export const Column = (props) => {


   

    const {title,dispatch,col,id} = props;
    const {items,next,next_id,prev} = col;
    
     
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
        let prevColRight= {};
        let newColRight = {};
        newColRight[next_id] = {id:next_id,items:[...col.items]};
        prevColRight[id] = {id:id,items:[...next.items]};
    
        dispatch({type:'MOVECOL',payload:{...prevColRight,...newColRight}});
     

    }
    const moveColLeft = () => {
        let prevColLeft= {};
        let newColLeft = {};
        newColLeft[prev.id] = {id:prev.id,items:[...col.items]};
        prevColLeft[id] = {id:id,items:[...prev.items]};
    
        dispatch({type:'MOVECOL',payload:{...prevColLeft,...newColLeft}});
     

    }


    return(

        <StyledColumn>
            <div className= {`header ${title}`}>
                <h1>{title}</h1>
                <button onClick={moveColLeft}>Move Left</button>
                <button onClick={moveColRight}>Move Right</button>
            </div>
            <div>
                 
                {items.map(ci => <Item dispatch={dispatch} colid ={id} text={ci.text} prev={prev} next={next} next_id={next_id} key={ci.id} id={ci.id}></Item>)}
               
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


`