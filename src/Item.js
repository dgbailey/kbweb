import React, {useState} from 'react';
import styled from 'styled-components';
import uuid4 from 'uuid4';




export const Item = (props) => {

    const {text,dispatch,item,colid,id,next_id,prev,index} = props;

    //click triggers deletion and copy of item content to prev or next
    //changes to column state

    //onDragStart
    const [isGrabbing,setIsGrabbing] = useState(false);

    function onDragStart(e){
        handleGrab();
        e.dataTransfer.setData('id',id);
        e.dataTransfer.setData('text',text)
        
        e.dataTransfer.dropEffect = 'copyMove';
    
        // dispatch({type:"DELETEITEM",origin:colid,itemId:id});
       
    }

    function handleDragEnd(e){
        handleGrab();
      
        dispatch({type:"DELETEITEM",origin:colid,itemId:id});
    }

    function handleGrab(){
        setIsGrabbing(!isGrabbing);
    }


    function dragoverHandler(e) {
        //this should not be touching the dom directly
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
       
        
        //need initial condition for within column movement same column gt id, same column lt id

        let target = e.target;
        let family = []
        while(target){
            family.push(target);
            target = target.nextElementSibling;
        }
        //sliding logic

        family.forEach(element => {
            
            if(element.classList.contains('slide-trigger-up')){
                if(element.dataset.index === e.target.dataset.index){
                    element.classList.remove('slide-trigger-up');
                }
              
            
            }
           else{
                element.classList.add('slide-trigger-up');
            
           }



        })
       
       
       
       
        
       
    }

    function handleDragExit(e){
        e.preventDefault();
     
        // e.target.style.transform = `translate3d(0px,0px,0px)`;
    }

   

    const changeColumnsRight = () => {
        let addition = {id:id,text:text};
        dispatch({type:'DELETE',colId:colid,itemId:id});
        dispatch({type:'APPEND',destination:next_id,payload:addition});
      
        
        
       



    }

    const changeColumnsLeft = () => {
        let addition = {id:id,text:text};
        dispatch({type:'DELETE',colId:colid,itemId:id});
        dispatch({type:'APPEND',destination:prev.id,payload:addition});
       
      
        
        
       



    }


    return (

        <StyledItem className={colid} data-index={index} onDragEnter={dragoverHandler}  onDragExit={handleDragExit} draggable={true} onDragStart={onDragStart} onDragEnd={handleDragEnd}>
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
    transition:.2s ease;
    

   z-index:1;

    &:hover{
        cursor:pointer;
    }
    &.grabbing:active{
        transform:scale(1.1);
        background:red;
        cursor: -webkit-grabbing; cursor:-moz-grabbing;
    }
    &.slide-trigger-up{
        transform:translate3d(0px,100px,0px);
    }

    &.slide-trigger-down{
        transform:translate3d(0px,-100px,0px);
    }


   

`