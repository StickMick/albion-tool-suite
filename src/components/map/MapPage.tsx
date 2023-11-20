import React, { Component, MutableRefObject, ReactNode, useRef } from 'react'
import { ForceGraph2D } from 'react-force-graph';
import mapsData from '../../data/maps.json';
import { link } from 'fs';

type Props = {}

type State = {
  data: any;
}

export default class MapPage extends Component<Props, State> {
  state = {
    data: mapsData
  }

  render = (): ReactNode => {
    const { data } = this.state;
    return (
      <div>
        <ForceGraph2D
          graphData={data || { nodes: [], links: [] }}
          nodeCanvasObject={(node, ctx, globalScale) => {
            if (!node) return;
            if (!node.x || !node.y) return;

            const label = node.id;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions: Array<number> = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

            let color = 'rgba(255, 255, 255, 0.8)';
            switch (node.zone) {
              case "red":
                color = 'rgba(255, 0, 0, 1)';
                break;
              case "blue":
                color = 'rgba(0, 0, 255, 1)';
                break;
              case "yellow":
                color = 'rgba(255, 255, 0, 1)';
                break;
            }
            ctx.fillStyle = color;

            ctx.fillRect((node.x - bckgDimensions[0] / 2) - 5, (node.y - bckgDimensions[1] / 2) - 5, bckgDimensions[0] + 10, bckgDimensions[1] + 10);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            switch (node.zone) {
              case "red":
                color = 'rgba(0, 0, 0, 1)';
                break;
              case "blue":
                color = 'rgba(255, 255, 255, 1)';
                break;
              case "yellow":
                color = 'rgba(0, 0, 0, 1)';
                break;
            }
            ctx.fillStyle = color;
            ctx.fillText(label, node.x, node.y);

            node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            if (!node) return;
            if (!node.x || !node.y) return;

            ctx.fillStyle = color;
            const bckgDimensions = node.__bckgDimensions;
            bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);
          }}
          onNodeDragEnd={(node) => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          }}
        />
      </div>
    )
  }
}
