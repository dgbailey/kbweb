import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NewColumnItem } from "./NewColumnItem";
import { useSelector } from "react-redux";
const propTypes = {
  items: PropTypes.array,
};

export const NewColumnBody = (props) => {
  const itemEntity = useSelector((state) => state.expBoard.entities.items.byId);

  const { items } = props;

  function grabItemContentById(items) {
    //needs to handle blank objects due to async modification of board
    let hydratedItems = items.map((id) => itemEntity[id]);

    return hydratedItems;
  }

  return (
    <StyledNewColumnBody>
      {grabItemContentById(items).map((i) => (
        <NewColumnItem name={i.item_content} />
      ))}
    </StyledNewColumnBody>
  );
};

const StyledNewColumnBody = styled.ul`
  list-style: none;
  max-height: 500px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5px;
`;

NewColumnBody.propTypes = propTypes;
