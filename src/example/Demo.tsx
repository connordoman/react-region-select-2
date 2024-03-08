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
