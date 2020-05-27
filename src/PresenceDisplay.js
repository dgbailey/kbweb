import React from "react";
import PropTypes from "proptypes";
import styled from "styled-components";
import { PresenceIcon } from "./PresenceIcon";
import { useSelector } from "react-redux";

/*
[x] This component needs a selector to connect to board metadata.
[] This component needs a limit component for presence over 6 people.
[x] This component needs membership store data of username.
[] Can two people have the same username?
[] On socket close needs to send data (userid) to be broadcast from client or from server to other relevant members
*/

const propTypes = {
  presenceMetaData: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string,
      isActive: PropTypes.bool,
    })
  ),
};
// const mockChild = { userName: "Dustin" };
// const defaultProps = {
//   presenceMetaData: Array.from(Array(7)).map((mc) => mockChild),
// };

export const PresenceDisplay = () => {
  console.log("presence render");
  //remember mutating objects in store will not cause rerender with useselector
  const { entities, fetchMembersSuccess } = useSelector(
    (state) => state.expBoard
  );
  const { byId } = entities.members;

  const renderPresenceDisplay = (memberIds) => {
    console.log("members", byId);
    return (
      <StyledPresenceDisplay>
        {Object.keys(byId).map((m) => (
          <PresenceIcon
            username={byId[m].username}
            isActive={byId[m].isActive ? true : false}
          />
        ))}
      </StyledPresenceDisplay>
    );
  };

  const renderUI = () => {
    switch (fetchMembersSuccess) {
      case true:
        return renderPresenceDisplay(byId);
      case false:
        return <div>...loading members</div>;
      default:
        return <div>...loading members</div>;
    }
  };

  return renderUI();
};

PresenceDisplay.propTypes = propTypes;
// PresenceDisplay.defaultProps = defaultProps;

const StyledPresenceDisplay = styled.div`
  display: flex;
  align-items: center;
`;
