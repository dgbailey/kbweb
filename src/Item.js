import React, {useState} from 'react';
import styled from 'styled-components';





export const Item = (props) => {

    const {text,dispatch,colid,id,next_id,prev,index} = props;

    //click triggers deletion and copy of item content to prev or next
    //changes to column state

    //onDragStart
    const [isGrabbing,setIsGrabbing] = useState(false);
    const [originDragCoords,setOriginDragCoords] = useState(null);

    function grabDragImage(){
        return document.querySelector('.drag-image')
    }


    function onDragStart(e){
        
        setOriginDragCoords([e.clientX,e.clientY]);
        //set up conditional data transfer operations
        // applyHidden(e);
        handleGrab();
        let dragImage = grabDragImage();
       
        e.dataTransfer.setData('id',id);
        e.dataTransfer.setData('text',text);
        // e.target.appendChild(dragImage)
        e.dataTransfer.setDragImage(e.target,100,50);
        // e.target.style.visibility = 'hidden';
        
        
        e.dataTransfer.dropEffect = 'move';
     
        dispatch({type:"UPDATE_CURRENT_COL",payload:colid});
        
       
    }

    function applyHidden(e){
        let target = e.target;
        setTimeout(() => target.classList.add('hidden'));
    }
    

    // function handleDragEnd(e){
        
    //     handleGrab();
    //     console.log('drag ended')
    //     dispatch({type:"DELETEITEM",origin:colid,itemId:id});
    // }
    function setItemCoordinates(e){
        e.preventDefault();
        
        e.target.style.top = originDragCoords[1];
        e.target.style.left = originDragCoords[0];
        e.target.style.position = 'fixed';
        // e.target.style.width = '100px';
        // e.target.style.height = '100px';
        e.target.style.display = 'none';
       
        let currentY = e.clientY;
        let currentX = e.clientX;

        let mapX = currentX - originDragCoords[0];
        let mapY = currentY - originDragCoords[1];
        
        e.target.style.transform = `translate3d(${mapX}px,${mapY}px,0px)`;
    
        
    }

    function handleGrab(){
        setIsGrabbing(!isGrabbing);
    }


    function dragoverHandler(e) {
        //this should not be touching the dom directly
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        
        let target = e.target;
        let cId = colid;
        let qString = `[data-colid='${cId}']`;
            
        let family = document.querySelector(qString).children;
        console.log(family)

        // while(target){
        //     family.push(target);
        //     target = target.nextElementSibling;
        // }
       
        
       
        //need initial condition for within column movement same column gt id, same column lt id

        for(let i = 0; i < family.length; i ++){
            
                
            
            family[i].classList.remove('slide-trigger-up');
               //slide over
            
            
          
           
        }
        
        for(let i = 0; i < family.length; i ++){
            if( family[i].dataset.index === target.dataset.index){
            
                family[i].classList.add('slide-trigger-up');
            
            }
            else if(family[i].dataset.index > target.dataset.index){

                family[i].classList.add('slide-trigger-up');
            }
            else if(family[i].dataset.index < target.dataset.index){

                family[i].classList.remove('slide-trigger-up');
            }

        }
          
           
        
    
            
           
           

    
       
         //conditional dragenter data transfer
       
       
       
       
       
        
       
    }

    function handleDragEnd(e){
        e.preventDefault();
     
        
       
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

    // function handleDrag(e){
    //     setItemCoordinates(e);
    // }


    return (

        <StyledItem className={colid} data-index={index} onDragEnter={dragoverHandler} onDrag={setItemCoordinates}  onDragEnd={handleDragEnd} draggable={true} onDragStart={onDragStart}>
            <button className='prev' onClick={changeColumnsLeft}></button>
            <p>{text}</p>
            <button  className='next' onClick={changeColumnsRight}></button>
        </StyledItem>
    )





}


const StyledItem = styled.div `


    height:100px;
    border:1px solid black;
    display:flex;
    transition:.2s ease;
    margin:5px 4px;
   

    &:hover{
        cursor:pointer;
    }
    &.grabbing:active{
        transform:scale(1.1);
        background:red;
        cursor: -webkit-grabbing; cursor:-moz-grabbing;
    }
    &.slide-trigger-up{
        transform:translate3d(0px,108px,0px);
    }

    &.slide-trigger-down{
        transform:translate3d(0px,-100px,0px);
    }

    &.hidden{
        visibility:hidden;
    }
   

`