import React from "react";
import PropTypes from "proptypes";
import styled from "styled-components";
import { mount } from "enzyme";

/*
[x] This component needs to have an inactive class.
*/

const propTypes = {
  name: PropTypes.string,
  isActive: PropTypes.bool,
};

export const PresenceIcon = (props) => {
  const { username, isActive } = props;

  const firstCharacter = username.slice(0, 1);
  return (
    <StyledPresenceIcon className={isActive ? "" : "inactive"}>
      <span>{firstCharacter}</span>
    </StyledPresenceIcon>
  );
};
PresenceIcon.propTypes = propTypes;
const StyledMask = styled.div``;

const StyledPresenceIcon = styled.div`
   
   &.inactive{
    background: rgb(234, 234, 234);
    box-shadow: 1px 1px 1px #80808085;
    border: 1px solid #80808026;
    color:#989898ad;
\
   }

    background:white;
    box-shadow: 1px 1px 1px grey;
    margin-right:-4px;
    border: 1px solid gray;
    border-radius:50%;
    justify-content:center;
    font-weight:bold;
    height:30px;
    width:30px;
  
    display: inline-flex;
    align-items: center;
    
   

`;
