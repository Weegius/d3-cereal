import React from "react";
import data from "./data/cereal.json";
import * as d3 from "d3";
import { useD3 } from "./useD3";

const topCereal = data.sort((a, b) => b.rating - a.rating).splice(0, 5);
console.log(topCereal);

function BarChart() {
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 1000;
      const margin = { top: 20, right: 30, bottom: 30, left: 80 };
      const colors = ["#f94144", "#f3722c", "#f8961e", "#f9844a", "#f9c74f"];

      const xScale = d3
        .scaleBand()
        .domain(topCereal.map((topCereal) => topCereal.name))
        .range([margin.left, width])
        .padding(0.125);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(topCereal, (topCereal) => topCereal.protein)])
        .rangeRound([height - margin.bottom, margin.top]);

      const bottomAxis = d3.axisBottom(xScale);
      const leftAxis = d3.axisLeft(yScale);

      svg
        .select(".x-axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(bottomAxis);

      svg
        .select(".y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(leftAxis);

      svg
        .select(".plot-area")
        .selectAll(".bar")
        .data(topCereal)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (topCereal) => xScale(topCereal.name))
        .attr("width", xScale.bandwidth())
        .attr("y", (topCereal) => yScale(topCereal.protein))
        .attr("height", (topCereal) => yScale(0) - yScale(topCereal.protein))
        .attr('fill', (d, i) => colors[i]);
    },
    [JSON.stringify(data)]
  );

  return (
    <svg
      ref={ref} // *** Don't forget to add this line! ***
      style={{
        height: 500,
        width: 1000,
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default BarChart;

// const Cereal = () => {
//   return (
//     <Flex>
//       {/* <BarGraph
//         width={600}
//         height={600}
//         yRange={5}
//         xValue="name"
//         yValue="protein"
//         data={topCereal}
//         ticks={5}
//         styles={{
//           fill: "#0BC5EA",
//         }}
//         axisStyles={{
//           color: "#0BC5EA",
//           "font-size": "15px",
//         }}
//         title="Most popular cereals and the amount of protein in each"
//         xAxisSlanted={true}
//       /> */}
//     </Flex>
//   );
// };
// export default Cereal;
