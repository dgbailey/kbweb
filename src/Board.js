import React from 'react';
import styled from 'styled-components';
import uuid4 from 'uuid4';
import {Column} from './Column';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';



export const Board  = () => {
    let state = useSelector(state => state.board);
    let userMetaData = useSelector(state => state.userMetaData);
    let dispatch  = useDispatch();
    
   function addColumn(){
       let uuid = uuid4();
       let newColumn = {id:uuid,items:[]}
       dispatch({type:'APPENDCOL',payload:newColumn})
   }

   const saveBoard = state => {

      
        Object.keys(state.cols).forEach( k => {

            let content = state.cols[k];
            if(content.next){
                content.next = null;
            }
            if(content.previous){
                content.previous = null;
            }

        })
      
        let data = {boardName:state.boardName,boardId:state.boardId, cols:JSON.stringify(state.cols),userId:userMetaData.id}
        
        fetch('http://localhost:8080/boards/newBoard',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res => (res.json()))
        .then(res => console.log(res))
        .catch(err => console.log(err))
        

   }
  
    
    let head = null;

    function setColumnOrdering(){
        if(state.keys === undefined){
            let keys =  Object.keys(state.cols);
            dispatch({type:'SETCOLORDER',payload:keys});
            return keys
        }
        else{
            let keys = state.keys;
            return keys
        }

    }

   let keys = setColumnOrdering();

   
    return (

        <StyledBoard>
            <section className='board-head'>
                <h1>{state.boardName}</h1>
                <button onClick={addColumn}>Add Col</button>
                <button onClick={()=> saveBoard(state)}>Save Board</button>
                <span className='drag-image'></span>
            </section>
            <section className='board-columns'>
            {keys.map((bc,index) => {
                
                let item = state.cols[bc];

                item['prev'] = head;
              

                if(head){
                   
                    head['next'] = item;
                    head['next_id'] = item.id;
                    head['next_index'] = index;
                    item['index'] = index;
                   
                }
                else{
                    item['next'] = null;
                    item['index'] = index;
                }
                
                head = item;

              
                //on the first pass, item.next is passed to React.createElement as the undefined primitive
                //In contrast, item is passed as a mutable object.  This is why item.next value is never updated,
                //while the item object is updated.

                return <Column dispatch={dispatch} col={item} title={item.text}  id={bc} index={index} key={bc} colOrderKeys={keys} ></Column>
            })}
            </section>
           
                
                
            


        </StyledBoard>

    )

    





}


const StyledBoard = styled.div `
    border: 1px solid black;
    margin: 100px auto;
    display:flex;
    justify-content:space-evenly;
    height:800px;
    width:1000px;
  
    flex-direction:column;
    .board-head{

    }
    .board-columns{
        width:100%;
        display:flex;
        height:100%;
        overflow-x:scroll;
    }
    
    .drag-image{
        border:1px solid red;
        display: block; 
        top: 0; 
        left: 0; 
        width: 0; 
        height: 0;
        
    }


`