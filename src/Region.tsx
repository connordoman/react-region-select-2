import React from "react";
import objectAssign from "object-assign";
import style from "./style";
import { ReactPointerInputEvent } from "./RegionSelect";

export type ClientPosition = { x: number; y: number };
export type ClientDimension = { width: number; height: number };

export type RegionData = Record<string, any>;

export interface RegionInfo {
    data: RegionData;
    pos: ClientPosition;
    dim: ClientDimension;
}

export interface RegionProps {
    index: number;
    region: RegionInfo;
    customStyle?: React.CSSProperties;
    handles: boolean;
    isChanging: boolean;
    renderer?: (data: RegionInfo) => React.ReactNode;
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
    index,
    region,
    customStyle,
    isChanging,
    handles,
    renderer,
    onCropStart,
}: RegionProps): React.ReactNode => {
    const localStyle: React.CSSProperties = {
        width: `${region.dim.width}%`,
        height: `${region.dim.height}%`,
        left: `${region.pos.x}%`,
        top: `${region.pos.y}%`,
    };

    const dataRenderArgs: RegionInfo = {
        ...region,
        data: {
            ...region.data,
            isChanging,
            index,
        },
    };

    const mergedRegionStyle = objectAssign({}, style.Region, localStyle, customStyle, region.data.regionStyle);

    console.log({ dataRenderArgs });

    return (
        <div style={mergedRegionStyle} onMouseDown={onCropStart} onTouchStart={onCropStart} data-wrapper="wrapper">
            {handles ? <RegionHandles /> : null}
            {renderer ? renderer(dataRenderArgs) : null}
        </div>
    );
};

export default Region;
