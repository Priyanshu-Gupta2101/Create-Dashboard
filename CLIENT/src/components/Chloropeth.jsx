import { useEffect } from "react";
import * as d3 from "d3";
import { mapData } from "../data/mapData";

const ChloroplethMap = () => {
  useEffect(() => {
    const svg = d3.select("#chloropleth-map");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    // Map and projection
    const projection = d3
      .geoMercator()
      .scale(70)
      .center([0, 20])
      .translate([width / 2, height / 2]);

    // Data and color scale
    let data = new Map();
    const colorScale = d3
      .scaleThreshold()
      .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
      .range(d3.schemeBlues[7]);

    // Load external data and boot
    Promise.all([
      d3.json(
        "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
      ), // Replace with the path to your GeoJSON data file
    ]).then(function (loadData) {
      let worldJson = loadData[0];

      // Assuming your data has a property named 'id' for matching with worldJson features
      data = new Map(mapData.map((d) => [d.id, +d.value]));

      // Draw the map
      svg
        .append("g")
        .selectAll("path")
        .data(worldJson.features)
        .join("path")
        // draw each country
        .attr("d", d3.geoPath().projection(projection))
        // set the color of each country
        .attr("fill", function (d) {
          d.total = data.get(d.id) || 0;
          return colorScale(d.total);
        });
    });
  }, []);

  return <svg id="chloropleth-map" width={600} height={400}></svg>;
};

export default ChloroplethMap;
