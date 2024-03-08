import React from "react";
import objectAssign from "object-assign";
import style from "./style";
export const RegionHandles = () => {
    return (React.createElement("div", null,
        React.createElement("div", { "data-dir": "se", style: style.RegionHandleSE }),
        React.createElement("div", { "data-dir": "sw", style: style.RegionHandleSW }),
        React.createElement("div", { "data-dir": "nw", style: style.RegionHandleNW }),
        React.createElement("div", { "data-dir": "ne", style: style.RegionHandleNE })));
};
export const Region = ({ width, height, x, y, data, changing, index, customStyle, handles, dataRenderer, onCropStart, }) => {
    const localStyle = {
        width: width + "%",
        height: height + "%",
        left: `${x}%`,
        top: `${y}%`,
    };
    const dataRenderArgs = {
        data: data,
        isChanging: changing,
        index: index,
    };
    return (React.createElement("div", { style: objectAssign({}, style.Region, localStyle, customStyle, data.regionStyle), onMouseDown: onCropStart, onTouchStart: onCropStart, "data-wrapper": "wrapper" },
        handles ? React.createElement(RegionHandles, null) : null,
        dataRenderer ? dataRenderer(dataRenderArgs) : null));
};
export default Region;
