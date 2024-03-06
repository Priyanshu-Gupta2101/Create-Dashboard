// WordCloud.js
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import d3Cloud from "d3-cloud";

const WordCloud = ({ data }) => {
  const wordCloudRef = useRef();

  useEffect(() => {
    const topics = data.map((item) => item.topic);

    const wordCounts = topics.reduce((acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {});

    const wordFrequencies = Object.keys(wordCounts).map((topic) => ({
      text: topic,
      size: wordCounts[topic] * 10, // Adjust the multiplier as needed
    }));

    const layout = d3Cloud()
      .size([300, 300]) // Adjust the size as needed
      .words(wordFrequencies)
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .fontSize((d) => d.size)
      .on("end", draw);

    layout.start();

    function draw(words) {
      // Clear the existing content before appending a new SVG
      d3.select(wordCloudRef.current).selectAll("svg").remove();

      const svg = d3
        .select(wordCloudRef.current)
        .append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr(
          "transform",
          "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
        );

      svg
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", "1px") // Start with small font size
        .style("fill", (d, i) => d3.schemeCategory10[i % 10]) // Color for each word
        .attr("text-anchor", "middle")
        .attr("transform", () => {
          const randomX =
            Math.random() * layout.size()[0] - layout.size()[0] / 4;
          const randomY =
            Math.random() * layout.size()[1] - layout.size()[1] / 4;
          return "translate(" + [randomX, randomY] + ")";
        })
        .transition() // Add transition for a smooth appearance
        .duration(1000) // Adjust the duration as needed
        .style("font-size", (d) => d.size + "px")
        .attr(
          "transform",
          (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
        );
    }
  }, [data]);

  return <div ref={wordCloudRef} width="500px" height="300px"></div>;
};

export default WordCloud;
