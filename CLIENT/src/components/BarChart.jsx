import { useRef, useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ data, xLabel, yLabel }) => {
  const svgRef = useRef();
  const width = 400;
  const height = 300;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height - margin.bottom, margin.top]);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.select(".x-axis").call(xAxis);
    svg.select(".y-axis").call(yAxis);

    // Create bars with transition
    svg
      .selectAll(".bar")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(d.label))
            .attr("y", height - margin.bottom)
            .attr("width", xScale.bandwidth())
            .attr("height", 0)
            .attr("fill", "steelblue")
            .transition()
            .duration(1000) // Set the duration of the transition in milliseconds
            .attr("y", (d) => yScale(d.value))
            .attr("height", (d) => height - margin.bottom - yScale(d.value)),
        (update) =>
          update
            .transition()
            .duration(1000) // Set the duration of the transition in milliseconds
            .attr("x", (d) => xScale(d.label))
            .attr("y", (d) => yScale(d.value))
            .attr("height", (d) => height - margin.bottom - yScale(d.value)),
        (exit) =>
          exit
            .transition()
            .duration(500) // Set the duration of the transition in milliseconds
            .attr("y", height - margin.bottom)
            .attr("height", 0)
            .remove()
      );
  }, [data]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <g
        className="x-axis"
        transform={`translate(0, ${height - margin.bottom})`}
      />
      <g className="y-axis" transform={`translate(${margin.left}, 0)`} />
    </svg>
  );
};

export default BarChart;
