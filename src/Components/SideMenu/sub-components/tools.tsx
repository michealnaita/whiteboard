import React, { useState, useEffect } from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import Tool from "./presets";

export default function Tools({ toolsObject }) {
  let singleTool = false;
  if (toolsObject.value) {
    singleTool = true;
  }
  const [activeTool, setActiveTool] = useState(
    singleTool ? toolsObject : toolsObject[0]
  );
  useEffect(() => {}, []);
  function determineExtentions(activeTool) {
    if (singleTool) return false;
    const extentions = toolsObject.filter((tool) => tool !== activeTool);
    return extentions;
  }
  //   function determineActiveTool(activeTool) {
  //     if (singleTool) return [];
  //     const extentions = toolsObject.filter((tool) => tool !== activeTool);
  //     return extentions;
  //   }
  //   console.log(toolsObject);
  //   console.log(activeTool);
  function updateActiveTool(tool) {
    console.log(tool);
  }
  return (
    <Tool
      preset={{
        ...activeTool,
        isActive: true,
        extensions: determineExtentions(activeTool),
      }}
      activateTool={setActiveTool}
    />
  );
}
