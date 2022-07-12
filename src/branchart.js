import React, { useEffect, useState } from "react";
import data from "./data/cereal";
import * as d3 from "d3";
import { useD3 } from "./useD3";

function BranChart() {
  let newData = data.sort((a, b) => (a.rating < b.rating ? 1 : -1))[0];

  newData = [
    {
      name: "Protein",
      amount: newData.protein,
    },
    {
      name: "Fat",
      amount: newData.fat,
    },
    {
      name: "Fiber",
      amount: newData.fiber,
    },
    {
      name: "Carbs",
      amount: newData.carbo,
    },
    {
      name: "Sugars",
      amount: newData.sugars,
    },
  ];
  console.log(newData)
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 1000;
      const margin = { top: 20, right: 30, bottom: 30, left: 80 };
      const colors = ["#dad7cd", "#a3b18a", "#588157", "#3a5a40", "#344e41"];

      const xScale = d3
        .scaleBand()
        .domain(newData.map((d) => d.name))
        .range([margin.left, width])
        .padding(0.125);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(newData, (d) => d.amount)])
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
        .data(newData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.name))
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(d.amount))
        .attr("height", (d) => yScale(0) - yScale(d.amount))
        .attr("fill", (d, i) => colors[i]);
    },
    [JSON.stringify(newData)]
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

export default BranChart;
