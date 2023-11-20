import React, { Component, ReactNode } from 'react'
import { ForceGraph2D } from 'react-force-graph';
import mapsData from '../../data/maps.json';

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
        />
      </div>
    )
  }
}
