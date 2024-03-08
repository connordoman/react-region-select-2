import React from "react";
import objectAssign from "object-assign";
import style from "./style";

export const RegionHandles = () => {
    return (
        <div>
            <div data-dir="se" style={style.RegionHandleSE} />
            <div data-dir="sw" style={style.RegionHandleSW} />
            <div data-dir="nw" style={style.RegionHandleNW} />
            <div data-dir="ne" style={style.RegionHandleNE} />
        </div>
    );
};

interface RegionProps {
    width: number;
    height: number;
    x: number;
    y: number;
    data: any;
    changing: boolean;
    index: number;
    customStyle: any;
    handles: boolean;
    dataRenderer: any;
    onCropStart: any;
}

export const Region = ({
    width,
    height,
    x,
    y,
    data,
    changing,
    index,
    customStyle,
    handles,
    dataRenderer,
    onCropStart,
}: RegionProps) => {
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

    <div
        style={objectAssign({}, style.Region, localStyle, customStyle, data.regionStyle)}
        onMouseDown={onCropStart}
        onTouchStart={onCropStart}
        data-wrapper="wrapper">
        {handles ? <RegionHandles /> : null}
        {dataRenderer ? dataRenderer(dataRenderArgs) : null}
    </div>;
};
