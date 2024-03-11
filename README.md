# React Region Select 2

A reimplementation of [`react-region-select`](https://github.com/casavi/react-region-select) by [David Langer](https://github.com/davidlanger) of [casavi.de](http://casavi.de/), updated to use modern React and TypeScript.

## Usage

```tsx
import ReactRegionSelect from "react-region-select-2";
```

```tsx
<RegionSelect maxRegions={5} regions={this.state.regions} onChange={this.onChange} regionRenderer={this.regionRenderer}>
    <img src="/static/example-doc.jpg" width="700px" />
</RegionSelect>
```

This is "dumb component", meaning it will not track it's internal state (the regions). The parent component needs to do
that. This means implementing `onChange` and managing the `regions` (see example).

Place an image or anything else as children to draw rectangular regions above it. It supports rendering custom componentes
per region (see `regionRenderer`).

Homepage: [connordoman.dev](https://connordoman.dev)
Author: [Connor Doman](https://github.com/connordoman)

## API

### Props

#### `regions: RegionInfo[]`

Array of regions. Regions are objects with the following properties:

```tsx
interface RegionInfo {
    pos: ClientPosition;
    dim: ClientDimension;
    data: RegionData;
}

interface ClientPosition {
    x: number;
    y: number;
}

interface ClientDimension {
    width: number;
    height: number;
}

type RegionData = Record<string, any>;
```

#### `onChange: (regions: RegionInfo[]) => void`

Callback used when the regions change (moving, resizing, dragging to create new one)

#### `children: React.ReactNode`

Place objects inside the component and the regions will appear above them.

#### `maxRegions?: number`

Maximum number of allowed regions. If exceeded the last one will be replaced when dragging the canvas.

Default: `5`

#### `regionRenderer?: (data: RegionInfo) => React.ReactNode`

Optional function to render arbitrary components in a region. Can be used by the parent component to manipulate custom `RegionInfo.data`.

e.g. you can use `data.isChanging` to hide complex UI while the user is changing the region.

#### `debug?: boolean`

Display a table with information about each region. Useful for debugging.

#### `className?: string`

Use for styling the outer layer i.e. `<RegionSelect />`

#### `style?: React.CSSProperties`

Use for styling the outer layer i.e. `<RegionSelect />`

## Example

See [src/example/Demo.tsx](./src/example/Demo.tsx)

## Development

Run the Webpack development server using `npm run dev` and open `http://localhost:3000/` in your browser.

## Based on (inherited from `react-region-select`)

-   For development: [React Hot Boilerplate / Playground](https://github.com/timuric/react-prototype-playground)
-   Inspiration for region selection: [React Image Crop](https://github.com/DominicTobias/react-image-crop)
