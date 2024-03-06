import { useRef, useEffect } from "react";
import * as d3 from "d3";

const LikelihoodLineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const processedData = data;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    svg.selectAll("*").remove();
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(processedData.map((d) => d.year))
      .range([0, width])
      .padding(0.1);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(processedData, (d) => d.likelihood)])
      .range([height, 0]);

    chart
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    chart.append("g").call(d3.axisLeft(yScale));

    chart
      .append("path")
      .data([processedData])
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScale(d.year) + xScale.bandwidth() / 2)
          .y((d) => yScale(d.likelihood))
      );
  }, [data]);

  return <svg ref={svgRef} width={500} height={300}></svg>;
};

export default LikelihoodLineChart;
