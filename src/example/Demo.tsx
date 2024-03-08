import React, { useState } from "react";
import RegionSelect from "../RegionSelect";
import objectAssign from "object-assign";

import "./style.css";
import exampleDoc from "./example-doc.jpg";
import { RegionData, RegionDataRenderArgs, RegionProps } from "../Region";

export default function Demo() {
    const [regions, setRegions] = useState<RegionDataRenderArgs[]>([]);
    const onChange = (regions: RegionDataRenderArgs[]) => {
        setRegions(regions);
    };
    const changeRegionData = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
        const region = regions[index];
        let color;
        switch (event.target.value) {
            case "1":
                color = "rgba(0, 255, 0, 0.5)";
                break;
            case "2":
                color = "rgba(0, 0, 255, 0.5)";
                break;
            case "3":
                color = "rgba(255, 0, 0, 0.5)";
                break;
            default:
                color = "rgba(0, 0, 0, 0.5)";
        }

        region.data.regionStyle = {
            background: color,
        };
        onChange([
            ...regions.slice(0, index),
            objectAssign({}, region, {
                data: objectAssign({}, region.data, { dataType: event.target.value }),
            }),
            ...regions.slice(index + 1),
        ]);
    };

    const regionRenderer = (regionProps: RegionDataRenderArgs) => {
        if (!regionProps.isChanging) {
            return (
                <div style={{ position: "absolute", right: 0, bottom: "-1.5em" }}>
                    <select
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                            changeRegionData(regionProps.index, event)
                        }
                        value={regionProps.data.dataType}>
                        <option value="1">Green</option>
                        <option value="2">Blue</option>
                        <option value="3">Red</option>
                    </select>
                </div>
            );
        }
    };
    const regionStyle = {
        background: "rgba(255, 0, 0, 0.5)",
    };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1, flexShrink: 1, width: "50%" }}>
                <RegionSelect
                    debug={true}
                    maxRegions={1}
                    regions={regions}
                    regionStyle={regionStyle}
                    constraint
                    onChange={onChange}
                    regionRenderer={regionRenderer}
                    style={{ border: "1px solid black" }}>
                    <img src={exampleDoc} width="100%" style={{ pointerEvents: "none" }} />

                    {/* <div
                        style={{
                            position: "relative",
                            width: "40rem",
                            height: "40rem",
                            backgroundSize: "cover",
                        }}></div> */}
                </RegionSelect>
            </div>
            <div style={{ flexGrow: 1, flexShrink: 1, width: "50%", padding: 15 }}>
                Select something with your mouse on the left side
            </div>
        </div>
    );
}
