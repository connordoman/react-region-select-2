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
}

export interface RegionInfo {
    data: RegionData;
    isChanging: boolean;
    index: number;
    new?: boolean;
}

export interface RegionProps {
    index: number;
    data: RegionData;
    customStyle?: React.CSSProperties;
    handles: boolean;
    isChanging: boolean;
    dataRenderer: (data: RegionInfo) => React.ReactNode;
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
    data,
    customStyle,
    handles,
    dataRenderer,
    onCropStart,
}: RegionProps): React.ReactNode => {
    const localStyle: React.CSSProperties = {
        width: data.dimension.width + "%",
        height: data.dimension.height + "%",
        left: `${data.position.x}%`,
        top: `${data.position.y}%`,
    };
    const dataRenderArgs: RegionInfo = {
        data,
        isChanging: false,
        index,
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
