import React, { useEffect } from "react";
import * as d3 from "d3";
import graphData from "./miserables.json";
import './d3.css';
import tip from "d3-tip";
const Chart = () => {
  const svgRef = React.useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = +svg.node().getBoundingClientRect().width;
    const height = +svg.node().getBoundingClientRect().height;

    let link, node, simulation;

    //툴팁 설정
    const tooltip = tip()
      .attr("class", "d3-tip")
      .html((d) => `${d.id} : ${d.value}`);
      
    // 툴팁 호출 
      svg.call(tooltip);

    const initializeDisplay = () => {
      // set the data and properties of link lines
      link = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graphData.links)
        .enter()
        .append("line")
        .attr("marker-end", "url(#arrowhead)");

      // set the data and properties of node circles
      node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graphData.nodes)
        .enter()
        .append("circle")
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        )
        .on("click", (d) => {
          window.location.href = `https://www.google.com/search?q=${d.id}`;
        })
        .style("cursor", "pointer"); // 마우스 커서를 포인터로 변경
        
        
      

      node.call(tooltip);

      node.on("mouseover", tooltip.show);
      node.on("mousemove", tooltip.show);
      node.on("mouseout", () => { //마우스가 툴팁 밖으로 벗어나면 사라지게 설정
        if (!d3.event.relatedTarget || !d3.event.relatedTarget.classList.contains("d3-tip")) {
          tooltip.hide();
        }
      });
      
      // Update the 'node' and 'link' variables with the selection of nodes and links
      node = svg.selectAll(".nodes circle");
      link = svg.selectAll(".links line");

      // Update the 'node' variable with the selection of nodes
      node = node.merge(node);

      // generate the svg objects and force simulation
      simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink().id((d) => d.id))
        .force("charge", d3.forceManyBody())
        .force("collide", d3.forceCollide())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .stop();


      // set up the simulation and event to update locations after each tick
      simulation.on("tick", ticked);

      initializeForces();
      updateDisplay();
      simulation.restart(); // Restart the simulation
    };

    const initializeForces = () => {
      // add forces and associate each with a name
      simulation
        .force(
          "link",
          d3.forceLink().id((d) => {
            return d.id;
          })
        )
        .force("charge", d3.forceManyBody())
        .force("collide", d3.forceCollide())
        .force("center", d3.forceCenter(width / 2, height / 2));
      updateForces();
    };

    const updateForces = () => {
      // get each force by name and update the properties
      simulation.force("charge").strength(-120);

      simulation
        .force("link")
        .distance(30)
        .iterations(1)
        .links(graphData.links);
    };

    const updateDisplay = () => {
      node
        .attr("r", 5)
        .attr("stroke", "red")
        .attr("stroke-width", Math.abs(-120) / 15);
      
      link.attr("stroke-width", 1).attr("opacity", 1);
    };
    
    const ticked = () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    };

    // 화살표 만들기
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "#999")
      .style("stroke", "none");

    const dragstarted = (d) => {
      if (simulation && !d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (d) => {
      d.fx = Math.max(0, Math.min(d3.event.x, 800));
      d.fy = Math.max(0, Math.min(d3.event.y, 500));
    };

    const dragended = (d) => {
      if (simulation && !d3.event.active) simulation.alphaTarget(0.0001);
      d.fx = null;
      d.fy = null;
    };
    
    //< 툴팁 클릭 이벤트 처리
    const handleTooltipClick = (d) => {
      window.location.href = `https://search.naver.com/search.naver?query=${encodeURIComponent(d.id)}`;
    };
    
    const tooltips = document.getElementsByClassName("d3-tip");

    for (let i = 0; i < tooltips.length; i++) {
      tooltips[i].addEventListener("click", handleTooltipClick);
    }
    //>

    initializeDisplay();

    const handleWindowResize = () => {
      const width = +svg.node().getBoundingClientRect().width;
      const height = +svg.node().getBoundingClientRect().height;
      simulation.force("center", d3.forceCenter(width / 2, height / 2));
      updateForces();
      updateDisplay();
    };

    
    
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      //< 시뮬레이션 정리
      if (simulation) {
        simulation.stop();
        simulation = null;
      }
      //>
    };
  }, []);

  return <svg ref={svgRef} width={800} height={500}></svg>;
};

export default Chart;
