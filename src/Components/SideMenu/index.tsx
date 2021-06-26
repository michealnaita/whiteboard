import React, { Component } from "react";
import Tools from "./sub-components/tools";
import buttonMapping from "./sub-components/button_mapping.json";
import { SideMenu, PullOut } from "./sub-components/styled";
import ColorPicker from "./sub-components/color_picker";

export default class index extends Component {
  state = {
    sidebar_preset: {
      insert_action: "rectangle",
      eraser: "type-stroke",
      clear: "undo",
    },
    action_type: "rectangle",
    stroke_color: "#000000",
    hide: false,
  };
  hideMenu = () => {
    this.setState({ hide: !this.state.hide });
  };
  componentDidMount() {}
  render() {
    return (
      <SideMenu hide={this.state.hide}>
        <PullOut hide={this.state.hide} onClick={this.hideMenu}>
          <img src="/assets/icons/chevron-left.svg" alt="" />
        </PullOut>
        <div className="presets">
          {buttonMapping.length
            ? buttonMapping.map((toolsObject, i) => (
                <Tools key={i} toolsObject={toolsObject} />
              ))
            : null}
          <ColorPicker />
        </div>
      </SideMenu>
    );
  }
}
