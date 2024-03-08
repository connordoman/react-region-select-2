import React from "react";
import objectAssign from "object-assign";
import style from "./style";
import { ReactPointerInputEvent } from "./RegionSelect";

export type ClientPosition = { x: number; y: number };
export type ClientDimension = { width: number; height: number };

export interface RegionData {
    position: ClientPosition;
    dimension: ClientDimension;
    dataType?: string;
    regionStyle?: React.CSSProperties;
    index?: number;
}

export interface RegionDataRenderArgs {
    data: RegionData;
    isChanging: boolean;
    index: number;
    new?: boolean;
}

export interface RegionProps {
    width: number;
    height: number;
    x: number;
    y: number;
    data: RegionData;
    changing: boolean;
    index: number;
    customStyle?: React.CSSProperties;
    handles: boolean;
    dataRenderer: (data: RegionDataRenderArgs) => React.ReactNode;
    onCropStart: (e: ReactPointerInputEvent) => void;
}

export const RegionHandles = (): React.ReactNode => {
    return (
        <div>
            <div data-dir="se" style={style.RegionHandleSE} />
            <div data-dir="sw" style={style.RegionHandleSW} />
            <div data-dir="nw" style={style.RegionHandleNW} />
            <div data-dir="ne" style={style.RegionHandleNE} />
        </div>
    );
};

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
}: RegionProps): React.ReactNode => {
    const localStyle: React.CSSProperties = {
        width: width + "%",
        height: height + "%",
        left: `${x}%`,
        top: `${y}%`,
    };
    const dataRenderArgs: RegionDataRenderArgs = {
        data: data,
        isChanging: changing,
        index: index,
    };

    return (
        <div
            style={objectAssign({}, style.Region, localStyle, customStyle, data.regionStyle)}
            onMouseDown={onCropStart}
            onTouchStart={onCropStart}
            data-wrapper="wrapper">
            {handles ? <RegionHandles /> : null}
            {dataRenderer ? dataRenderer(dataRenderArgs) : null}
        </div>
    );
};

export default Region;
