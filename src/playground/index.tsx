import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "./redux/ducks";

function Index({ itemsList, stop = false }) {
  return (
    <div>
      <Button onFocus={() => console.log("anha")}>
        am here boys: {itemsList.item}
      </Button>
      {!stop ? <Index itemsList={{ item: "normal" }} stop /> : null}
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    updateItem: (ItemValue) => dispatch(actions.updateItem(ItemValue)),
  };
}
function select(state) {
  return {
    itemsList: state.itemsList,
  };
}
export default connect(select, mapDispatchToProps)(Index);
const Button = styled.button`
  &:focus {
    background-color: red;
  }
`;
