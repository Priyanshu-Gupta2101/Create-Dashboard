import { useRef, useEffect } from "react";
import * as d3 from "d3";

const RelevanceChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const data = [
      { category: "High", value: 15 },
      { category: "Medium", value: 25 },
      { category: "Low", value: 10 },
    ];
    const pie = d3.pie().value((d) => d.value);
    const dataPie = pie(data);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arc = d3.arc().innerRadius(35).outerRadius(100);

    const svg = d3.select(svgRef.current);

    svg
      .selectAll("path")
      .data(dataPie)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i))
      .attr("transform", "translate(150,150)")
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t));
        };
      });
  }, []);

  return <svg ref={svgRef} width={300} height={300}></svg>;
};

export default RelevanceChart;
