import React, { useState,useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
    description:PropTypes.string,
    children:PropTypes.element
}

const defaultProps = {
    description:'Create Column'
}
export const ActionButtonContext = React.createContext();
//dear dustin you don't even need context here.  The onclick toggle will bubble up from children.  You just need to decide which children you want to exclude from this bubbling.
export const ActionButton = props => {
  
    const {description,children} = props;
    const [toggled,setToggleState] = useState(true);

    const savedRootToggleIdentity = useRef();

    const stopPropagation = (e) => {
        //https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events
        e.nativeEvent.stopImmediatePropagation();
    }

    const rootToggle = (e) => {
        setToggleState(!toggled);
    }

    useEffect(() => {
        savedRootToggleIdentity.current = rootToggle;
    })

    useEffect(() => {

        function documentToggleListener(){
            
            document.addEventListener('click',() => {
                console.log('listener fire')
                savedRootToggleIdentity.current();
            })
        }
        documentToggleListener();
        return () => {document.removeEventListener('click',documentToggleListener)}
    },[])

    return (    
        <ActionButtonContext.Provider value={savedRootToggleIdentity}>
            <StyledButton   onClick={(e) => {stopPropagation(e);rootToggle()}}>
                <h4 className={`${!toggled ? 'hidden':'btn-description'}`}>{description}</h4>
                <StyledVisArea className={toggled ? "hidden":""}>
                    {children}
                </StyledVisArea>
            </StyledButton>
        </ActionButtonContext.Provider>
    )



}

ActionButton.propTypes = propTypes;
ActionButton.defaultProps = defaultProps;

const StyledButton = styled.button `
    display:flex;
    flex-direction:column;
    background:gray;
    opacity:.3;
    position:relative;
    width:200px;
    height:50px;
    border-radius:3px;

    
    padding: 0px;
    border: 0px;
    .hidden{
        display:none;
    }


`

const StyledVisArea = styled.form `
   
    height:60px;
    transition:2s ease;
    width:200px;
    ${'' /* background:lightgray; */}
    z-index:2;
    opacity:1;
    display:flex;
    flex-wrap:wrap;
  
    justify-content:space-between;
    &.hidden{
        height:0px;
        opacity:.2;
        display:none;
    }
    
        
`

