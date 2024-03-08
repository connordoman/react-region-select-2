import React, { useState } from "react";
import RegionSelect from "../RegionSelect";
import objectAssign from "object-assign";

import "./style.css";
import exampleDoc from "./example-doc.jpg";
import { RegionData, RegionInfo, RegionProps } from "../Region";

export default function Demo() {
    const [regions, setRegions] = useState<RegionInfo[]>([]);
    const handleRegionChange = (regions: RegionInfo[]) => {
        setRegions(regions);
    };
    const onSelectRegionDataType = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
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
        handleRegionChange([
            ...regions.slice(0, index),
            objectAssign({}, region, {
                data: objectAssign({}, region.data, { dataType: event.target.value }),
            }),
            ...regions.slice(index + 1),
        ]);
    };

    const regionRenderer = (regionProps: RegionInfo) => {
        if (!regionProps.isChanging) {
            return (
                <div style={{ position: "absolute", right: 0, bottom: "-1.5em" }}>
                    <select
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                            onSelectRegionDataType(regionProps.index, event)
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
                    maxRegions={5}
                    regions={regions}
                    regionStyle={regionStyle}
                    constraint
                    onChange={handleRegionChange}
                    regionRenderer={regionRenderer}
                    style={{ border: "1px solid black" }}>
                    <img src={exampleDoc} width="100%" style={{ pointerEvents: "none" }} />
                </RegionSelect>
            </div>
            <div style={{ flexGrow: 1, flexShrink: 1, width: "50%", padding: 15 }}>
                Select something with your mouse on the left side
            </div>
        </div>
    );
}
