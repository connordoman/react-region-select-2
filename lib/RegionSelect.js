import React, { useEffect, useState, useRef } from "react";
import objectAssign from "object-assign";
import Region from "./Region";
export const RegionSelect = ({ constraint, regions, children, onChange, regionRenderer, maxRegions, debug, className, style, regionStyle, }) => {
    const imageRef = useRef(null);
    const [regionCounter, setRegionCounter] = useState(0);
    const [isChanging, setIsChanging] = useState(false);
    const [regionChangeData, setRegionChangeData] = useState();
    const [regionChangeIndex, setRegionChangeIndex] = useState(-1);
    const getClientPos = (e) => {
        let pageX, pageY;
        if ("touches" in e) {
            pageX = e.touches[0].pageX;
            pageY = e.touches[0].pageY;
        }
        else {
            pageX = e.pageX;
            pageY = e.pageY;
        }
        return {
            x: pageX,
            y: pageY,
        };
    };
    const getElementOffset = (element) => {
        const rect = element.getBoundingClientRect();
        const docEl = document.documentElement;
        const rectTop = rect.top + window.scrollY - docEl.clientTop;
        const rectLeft = rect.left + window.scrollX - docEl.clientLeft;
        return {
            x: rectLeft,
            y: rectTop,
        };
    };
    const handleClick = (event) => {
        const target = event.target;
        if (!target.dataset.wrapper && !target.dataset.dir) {
            return;
        }
        event.preventDefault();
        if (!imageRef.current) {
            return;
        }
        const clientPos = getClientPos(event);
        const imageOffset = getElementOffset(imageRef.current);
        const xPc = ((clientPos.x - imageOffset.x) / imageRef.current.offsetWidth) * 100;
        const yPc = ((clientPos.y - imageOffset.y) / imageRef.current.offsetHeight) * 100;
        setIsChanging(true);
        const rect = {
            x: xPc,
            y: yPc,
            width: 0,
            height: 0,
            new: true,
            data: { index: regionCounter },
            isChanging: true,
        };
        setRegionCounter(regionCounter + 1);
        setRegionChangeData({
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
        });
        if (regions.length < maxRegions) {
            onChange(regions.concat(rect));
            setRegionChangeIndex(regions.length);
        }
        else {
            onChange([...regions.slice(0, maxRegions - 1), rect]);
            setRegionChangeIndex(maxRegions - 1);
        }
    };
    const handleClickMove = (event) => {
        if (!isChanging || regionChangeIndex === -1 || !regionChangeData) {
            return;
        }
        const index = regionChangeIndex;
        const updatingRegion = regions[index];
        const clientPos = getClientPos(event);
        const currentRegionChangeData = regionChangeData;
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
        }
        else {
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
            width = updatingRegion.width;
            height = updatingRegion.height;
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
        const rect = {
            x: x,
            y: y,
            width: width,
            height: height,
            isChanging: true,
        };
        onChange([...regions.slice(0, index), objectAssign({}, updatingRegion, rect), ...regions.slice(index + 1)]);
    };
    const handleClickEnd = () => {
        if (isChanging) {
            setIsChanging(false);
            const index = regionChangeIndex;
            const updatingRegion = regions[index];
            const changes = {
                new: false,
                isChanging: false,
            };
            setRegionChangeIndex(-1);
            setRegionChangeData(null);
            onChange([
                ...regions.slice(0, index),
                objectAssign({}, updatingRegion, changes),
                ...regions.slice(index + 1),
            ]);
        }
    };
    const regionMoveStart = (event, index) => {
        const target = event.target;
        if (!target.dataset.wrapper && !target.dataset.dir) {
            return;
        }
        event.preventDefault();
        if (!imageRef.current) {
            return;
        }
        const clientPos = getClientPos(event);
        const imageOffset = getElementOffset(imageRef.current);
        const currentRegion = regions[index];
        const regionLeft = (currentRegion.x / 100) * imageRef.current.offsetWidth + imageOffset.x;
        const regionTop = (currentRegion.y / 100) * imageRef.current.offsetHeight + imageOffset.y;
        const regionWidth = (currentRegion.width / 100) * imageRef.current.offsetWidth;
        const regionHeight = (currentRegion.height / 100) * imageRef.current.offsetHeight;
        const clientPosDiffX = regionLeft - clientPos.x;
        const clientPosDiffY = regionTop - clientPos.y;
        const resizeDir = target.dataset.dir;
        let clientPosXStart = clientPos.x;
        let clientPosYStart = clientPos.y;
        if (resizeDir) {
            if (resizeDir === "se") {
                clientPosXStart = regionLeft;
                clientPosYStart = regionTop;
            }
            else if (resizeDir === "sw") {
                clientPosXStart = regionLeft + regionWidth;
                clientPosYStart = regionTop;
            }
            else if (resizeDir === "nw") {
                clientPosXStart = regionLeft + regionWidth;
                clientPosYStart = regionTop + regionHeight;
            }
            else if (resizeDir === "ne") {
                clientPosXStart = regionLeft;
                clientPosYStart = regionTop + regionHeight;
            }
        }
        setIsChanging(true);
        setRegionChangeData({
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
        });
        setRegionChangeIndex(index);
    };
    useEffect(() => {
        document.addEventListener("mousemove", handleClickMove);
        document.addEventListener("touchmove", handleClickMove);
        document.addEventListener("mouseup", handleClickEnd);
        document.addEventListener("touchend", handleClickEnd);
        document.addEventListener("touchcancel", handleClickEnd);
        // The returned function will be called on component unmount
        return () => {
            document.removeEventListener("mousemove", handleClickMove);
            document.removeEventListener("touchmove", handleClickMove);
            document.removeEventListener("mouseup", handleClickEnd);
            document.removeEventListener("touchend", handleClickEnd);
            document.removeEventListener("touchcancel", handleClickEnd);
        };
    }, []);
    const regionRects = regions.map((rect, index) => {
        return (React.createElement(Region, { x: rect.x, y: rect.y, width: rect.width, height: rect.height, handles: !rect.new, data: rect.data, key: index, index: index, customStyle: regionStyle, dataRenderer: regionRenderer, onCropStart: (event) => regionMoveStart(event, index), changing: index === regionChangeIndex }));
    });
    return (React.createElement("div", { ref: imageRef, style: objectAssign({}, style.RegionSelect, style), className: className, onTouchStart: handleClick, onMouseDown: handleClick },
        regionRects,
        debug ? (React.createElement("table", { style: { position: "absolute", right: 0, top: 0 } },
            React.createElement("tbody", null, regions.map((rect, index) => {
                return (React.createElement("tr", { key: index },
                    React.createElement("td", null,
                        "x: ",
                        rect.x.toFixed(1)),
                    React.createElement("td", null,
                        "y: ",
                        rect.y.toFixed(1)),
                    React.createElement("td", null,
                        "width: ",
                        rect.width.toFixed(1)),
                    React.createElement("td", null,
                        "height: ",
                        rect.height.toFixed(1))));
            })))) : null,
        children));
};
