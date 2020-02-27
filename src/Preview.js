import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Preview = ({name = "Default Board",to,id}) => {

    
    return (
        <Link to={to}>
             <StyledUnorderedList>
            <li>
                <h2 className="name">{name}</h2>
            </li>
            </StyledUnorderedList>
        </Link>
       
    )





}

Preview.propTypes = {
    name:PropTypes.string,
    id:PropTypes.string,
    to:PropTypes.string
}


const StyledUnorderedList = styled.ul  `
    list-style:none;
    padding:0px;
    margin:0px;
    height:200px;
    width:200px;
    box-shadow:0px 0px 1px rgb(0,0,.01);



`