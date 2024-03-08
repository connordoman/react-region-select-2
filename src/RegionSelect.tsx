import React, { useEffect, useState, useRef } from "react";
import objectAssign from "object-assign";
import styleSheet from "./style";
import Region, { ClientPosition, RegionData, RegionInfo, RegionProps } from "./Region";

export type ReactPointerInputEvent = React.MouseEvent | React.TouchEvent<HTMLElement>;
export type DOMPointerEvent = MouseEvent | TouchEvent;
export type ReactPointerEventHandler = React.TouchEventHandler<HTMLElement> & React.MouseEventHandler<HTMLElement>;

interface RegionChangeData {
    imageOffsetLeft: number;
    imageOffsetTop: number;
    clientPosXStart: number;
    clientPosYStart: number;
    imageWidth: number;
    imageHeight: number;
    isMove: boolean;
    clientPosXOffset?: number;
    clientPosYOffset?: number;
    resizeDir?: string;
}

interface RegionSelectProps {
    constraint: boolean;
    regions: RegionInfo[];
    children: React.ReactNode;
    onChange: (regions: RegionInfo[]) => void;
    regionRenderer: (data: RegionInfo) => React.ReactNode;
    maxRegions: number;
    debug: boolean;
    className?: string;
    style?: React.CSSProperties;
    regionStyle?: React.CSSProperties;
}

export const RegionSelect = ({
    constraint,
    regions,
    children,
    onChange,
    regionRenderer,
    maxRegions,
    debug,
    className,
    style,
    regionStyle,
}: RegionSelectProps) => {
    const regionCounter = useRef(0);
    const imageRef = useRef<HTMLImageElement>(null);
    const isChanging = useRef(false);
    const regionChangeData = useRef<RegionChangeData | null>(null);
    const regionChangeIndex = useRef(-1);

    // const [regionCounter, setRegionCounter] = useState(0);
    // const [regionChangeData, setRegionChangeData] = useState<RegionChangeData | null>();
    // const [regionChangeIndex, setRegionChangeIndex] = useState<number>(-1);

    const getClientPos = (e: ReactPointerInputEvent | DOMPointerEvent): ClientPosition => {
        let pageX, pageY;

        if ("touches" in e) {
            pageX = e.touches[0].pageX;
            pageY = e.touches[0].pageY;
        } else {
            pageX = e.pageX;
            pageY = e.pageY;
        }

        return {
            x: pageX,
            y: pageY,
        };
    };

    const getElementOffset = (element: HTMLElement): ClientPosition => {
        const rect = element.getBoundingClientRect();
        const docEl = document.documentElement;

        const rectTop = rect.top + window.scrollY - docEl.clientTop;
        const rectLeft = rect.left + window.scrollX - docEl.clientLeft;

        return {
            x: rectLeft,
            y: rectTop,
        };
    };
    const handleClickStart = (event: ReactPointerInputEvent) => {
        console.log("handleClickStart");

        const target = event.target as HTMLElement;
        if (target.dataset.wrapper || target.dataset.dir) {
            console.log("No dataset wrapper or dir");
            return;
        }
        // Rest of the code...
        event.preventDefault();

        if (!imageRef.current) {
            console.log("No imageRef");
            return;
        }

        if (isChanging.current) {
            console.log("isChanging");
            return;
        }

        const clientPos = getClientPos(event);
        const imageOffset = getElementOffset(imageRef.current);
        const xPc = ((clientPos.x - imageOffset.x) / imageRef.current.offsetWidth) * 100;
        const yPc = ((clientPos.y - imageOffset.y) / imageRef.current.offsetHeight) * 100;
        console.log("xPc", xPc);
        console.log("yPc", yPc);
        isChanging.current = true;
        const rect: RegionInfo = {
            data: {
                position: { x: xPc, y: yPc },
                dimension: { width: 0, height: 0 },
            },
            new: true,
            isChanging: true,
            index: regionCounter.current,
        };
        regionCounter.current = regionCounter.current + 1;

        regionChangeData.current = {
            imageOffsetLeft: imageOffset.x,
            imageOffsetTop: imageOffset.y,
            clientPosXStart: clientPos.x,
            clientPosYStart: clientPos.y,
            imageWidth: imageRef.current.offsetWidth,
            imageHeight: imageRef.current.offsetHeight,
            isMove: false,
            clientPosXOffset: 0,
            clientPosYOffset: 0,
            resizeDir: "",
        };

        if (regions.length < maxRegions) {
            onChange(regions.concat(rect));
            regionChangeIndex.current = regions.length;
        } else {
            onChange([...regions.slice(0, maxRegions - 1), rect]);
            regionChangeIndex.current = maxRegions - 1;
        }
    };
    const regionMoveStart = (event: ReactPointerInputEvent, index: number) => {
        console.log("regionMoveStart");
        const target = event.target as HTMLElement;
        if (!target.dataset.wrapper && !target.dataset.dir) {
            // console.log("No dataset wrapper or dir");
            return;
        }
        event.preventDefault();

        if (!imageRef.current) {
            console.log("No imageRef");
            return;
        }

        const clientPos = getClientPos(event);
        const imageOffset = getElementOffset(imageRef.current);

        const regionPos = regions[index].data.position;
        const regionDim = regions[index].data.dimension;

        if (!regionPos || !regionDim) {
            console.log("No regionPos or regionDim");
            return;
        }

        const regionLeft = (regionPos.x / 100) * imageRef.current.offsetWidth + imageOffset.x;
        const regionTop = (regionPos.y / 100) * imageRef.current.offsetHeight + imageOffset.y;
        const regionWidth = (regionDim.width / 100) * imageRef.current.offsetWidth;
        const regionHeight = (regionDim.height / 100) * imageRef.current.offsetHeight;
        const clientPosDiffX = regionLeft - clientPos.x;
        const clientPosDiffY = regionTop - clientPos.y;

        const resizeDir = target.dataset.dir;

        let clientPosXStart = clientPos.x;
        let clientPosYStart = clientPos.y;

        if (resizeDir) {
            if (resizeDir === "se") {
                clientPosXStart = regionLeft;
                clientPosYStart = regionTop;
            } else if (resizeDir === "sw") {
                clientPosXStart = regionLeft + regionWidth;
                clientPosYStart = regionTop;
            } else if (resizeDir === "nw") {
                clientPosXStart = regionLeft + regionWidth;
                clientPosYStart = regionTop + regionHeight;
            } else if (resizeDir === "ne") {
                clientPosXStart = regionLeft;
                clientPosYStart = regionTop + regionHeight;
            }
        }

        isChanging.current = true;
        regionChangeData.current = {
            imageOffsetLeft: imageOffset.x,
            imageOffsetTop: imageOffset.y,
            clientPosXStart: clientPosXStart,
            clientPosYStart: clientPosYStart,
            clientPosXOffset: clientPosDiffX,
            clientPosYOffset: clientPosDiffY,
            imageWidth: imageRef.current.offsetWidth,
            imageHeight: imageRef.current.offsetHeight,
            isMove: resizeDir ? false : true,
            resizeDir: resizeDir,
        };

        regionChangeIndex.current = index;
    };

    const handleClickEnd = () => {
        console.log("handleClickEnd");
        if (!isChanging) {
            console.log("No isChanging");
            return;
        }

        if (regionChangeIndex.current < 0) {
            console.log("regionChangeIndex is -1");
            return;
        }
        if (!regionChangeData.current) {
            console.log("No regionChangeData");
            return;
        }

        isChanging.current = false;
        const index = regionChangeIndex.current;
        const updatedRegions = [...regions];
        console.log("updatedRegions", updatedRegions);
        updatedRegions[index] = {
            new: false,
            isChanging: false,
            data: updatedRegions[regionChangeIndex.current].data,
            index: regionChangeIndex.current,
        };
        regionChangeIndex.current = -1;
        regionChangeData.current = null;
        onChange(updatedRegions);
    };

    const handlePointerMove: ReactPointerEventHandler = (event: DOMPointerEvent | ReactPointerInputEvent) => {
        // console.log("handlePointerMove");
        if (!isChanging) {
            // console.log("Move: No isChanging");
            return;
        }
        if (!regionChangeData.current) {
            console.log("No regionChangeData");
            return;
        }
        if (regionChangeIndex.current === -1) {
            console.log("regionChangeIndex is -1");
            return;
        }
        const index = regionChangeIndex.current;
        const updatingRegion = regions[index];
        const clientPos = getClientPos(event);
        const currentRegionChangeData = regionChangeData.current;

        let x, y, width, height;
        if (!currentRegionChangeData.isMove) {
            let x1Pc, y1Pc, x2Pc, y2Pc;
            x1Pc =
                ((currentRegionChangeData.clientPosXStart - currentRegionChangeData.imageOffsetLeft) /
                    currentRegionChangeData.imageWidth) *
                100;
            y1Pc =
                ((currentRegionChangeData.clientPosYStart - currentRegionChangeData.imageOffsetTop) /
                    currentRegionChangeData.imageHeight) *
                100;
            x2Pc = ((clientPos.x - currentRegionChangeData.imageOffsetLeft) / currentRegionChangeData.imageWidth) * 100;
            y2Pc = ((clientPos.y - currentRegionChangeData.imageOffsetTop) / currentRegionChangeData.imageHeight) * 100;
            x = Math.min(x1Pc, x2Pc);
            y = Math.min(y1Pc, y2Pc);
            width = Math.abs(x1Pc - x2Pc);
            height = Math.abs(y1Pc - y2Pc);
            if (constraint) {
                if (x2Pc >= 100) {
                    x = x1Pc;
                    width = 100 - x1Pc;
                }
                if (y2Pc >= 100) {
                    y = y1Pc;
                    height = 100 - y1Pc;
                }
                if (x2Pc <= 0) {
                    x = 0;
                    width = x1Pc;
                }
                if (y2Pc <= 0) {
                    y = 0;
                    height = y1Pc;
                }
            }
        } else {
            x =
                ((clientPos.x +
                    (currentRegionChangeData.clientPosXOffset ?? 0) -
                    currentRegionChangeData.imageOffsetLeft) /
                    currentRegionChangeData.imageWidth) *
                100;
            y =
                ((clientPos.y +
                    (currentRegionChangeData.clientPosYOffset ?? 0) -
                    currentRegionChangeData.imageOffsetTop) /
                    currentRegionChangeData.imageHeight) *
                100;
            width = updatingRegion.data.dimension?.width ?? 0;
            height = updatingRegion.data.dimension?.height ?? 0;
            if (constraint) {
                if (x + width >= 100) {
                    x = Math.round(100 - width);
                }
                if (y + height >= 100) {
                    y = Math.round(100 - height);
                }
                if (x <= 0) {
                    x = 0;
                }
                if (y <= 0) {
                    y = 0;
                }
            }
        }

        const rect: RegionInfo = {
            data: {
                position: { x: x, y: y },
                dimension: { width: width, height: height },
            },
            isChanging: true,
            index,
        };
        const updatedRegions = [...regions];
        updatedRegions[index] = rect;
        onChange(updatedRegions);
    };

    useEffect(() => {
        console.log({ regions: regions });
    }, [regions]);

    useEffect(() => {
        console.log({ isChanging });
    }, [isChanging]);

    const regionRects = regions.map((reg, index) => {
        const rect = reg.data;
        if (!rect) {
            console.log("No rect");
            return null;
        }
        return (
            <Region
                handles={!reg.new}
                data={rect}
                key={index}
                index={index}
                customStyle={regionStyle}
                dataRenderer={regionRenderer}
                onCropStart={(event: ReactPointerInputEvent) => regionMoveStart(event, index)}
                isChanging={index === regionChangeIndex.current}
            />
        );
    });

    return (
        <div
            ref={imageRef}
            style={objectAssign({}, styleSheet.RegionSelect, style)}
            className={className}
            onTouchStart={handleClickStart}
            onMouseDown={handleClickStart}
            onMouseUp={handleClickEnd}
            onMouseMove={handlePointerMove}
            onTouchMove={handlePointerMove}>
            {regionRects}
            {debug ? (
                <table style={{ position: "absolute", right: 0, top: 0 }}>
                    <tbody>
                        {regions.map((rect, index) => {
                            if (!rect.data) {
                                return null;
                            }
                            return (
                                <tr key={index}>
                                    <td>x: {rect.data.position.x.toFixed(1)}</td>
                                    <td>y: {rect.data.position.y.toFixed(1)}</td>
                                    <td>width: {rect.data.dimension.width.toFixed(1)}</td>
                                    <td>height: {rect.data.dimension.height.toFixed(1)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : null}
            {children}
        </div>
    );
};

export default RegionSelect;
