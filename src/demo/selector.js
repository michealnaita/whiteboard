import React, { useState, useEffect, cloneElement } from "react";
import styled, { css } from "styled-components";

/*
This Component Replicates the Html selector Element
with this custom Selector Element 
*/
const ImageString =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11.777' height='6.416' viewBox='0 0 11.777 6.416'%3E%3Cpath id='angle-down' d='M6-3.9l5.361-5.361.527.527L6-2.848.111-8.736l.527-.527Z' transform='translate(-0.111 9.264)'/%3E%3C/svg%3E%0A";
const DropDown = styled.ul`
  position: absolute;
  width: max-content;
  border-radius: 5px;
  min-width: 100%;
  background-color: white;
  padding: 10px 10px;
  display: none;
  top: calc(100% + 5px);
  left: 0;
  text-align: left;
  z-index: 10;
  list-style: none;
  color: black;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
`;

const Selector = styled.button`
  cursor: pointer;
  border: 1px solid #a7a2a9;
  border-radius: 5px;
  padding: 10px;
  min-width: 150px;
  width: max-content;
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  background: none;
  outline: none;
  .selected {
    font-weight: 600;
  }
  .icon {
    margin-left: 60px;
  }
  &:focus {
    .icon {
      transform: rotateZ(180deg);
    }
    ${DropDown} {
      display: block;
    }
  }
  color: white;
`;

export default function ({ children, onChange }) {
  if (!children || !children.length)
    // check whether the selector has options
    throw new Error("Selector Component requires Options");

  const elements = children.map((el) => {
    if (typeof el.type !== "function")
      // check whether the Options where created with the
      // Option functional Componet below
      throw new Error(
        "Selector's children should be Option functional components"
      );

    // pass the a ref of function to change the selected option when click
    return cloneElement(el, { func: (option) => changeSelected(option) });
  });

  const [selected, setSelected] = useState(function () {
    // set selected option basted on the selected atribute passed to the Option element
    const selectedChild = elements.filter((el) => el.props.selected);
    if (selectedChild.length > 1)
      // check whether only one element has the seleceted atribute
      throw new Error("Selected option should be one for each selector");
    // if no option has the selected atribute, then the first Option should be selected
    return selectedChild[0] || elements[0];
  });
  const [changed, setChanged] = useState(false);

  function changeSelected(value) {
    // change the selected Option
    const newSelection = elements.filter(
      (child) => child.props.value === value
    );
    if (!newSelection.length) return;
    setSelected(newSelection[0]);
  }
  useEffect(() => {
    changed && onChange(selected.props.value);
    setChanged(true);
  }, [selected]);
  return (
    <Selector>
      <div className="selected">{selected.props.children}</div>
      <div className="icon">
        <img src={ImageString} alt="" />
      </div>
      <DropDown>{elements}</DropDown>
    </Selector>
  );
}

export function Option({ value, children, func, selected }) {
  return (
    <OptionContainer
      value={value}
      onClick={() => func(value)}
      selected={selected}
    >
      {children}
    </OptionContainer>
  );
}

const OptionContainer = styled.li`
  cursor: pointer;
  padding: 5px 0;
  &:hover {
    color: #ffb500;
  }
  ${({ selected }) =>
    selected &&
    css`
      color: #ffb500;
    `};
`;
