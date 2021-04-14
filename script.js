
var tip = d3.select(".chart-container")
.append("div")
.attr("class", "tip")
.style("position", "absolute")
.style("z-index", "10")
.style("visibility", "hidden");

var svg = d3.selectAll("svg").attr("class", "background-style"),
margin = {top: 20, right: 20, bottom: 42, left: 40},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.05),y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv('https://raw.githubusercontent.com/GEOMTeam2/DataVizCSV/main/level.csv', d3.autoType).then(function (data) {
//console.log(data)
data = data;
//console.log(data);
x.domain(data.map(function(d) { 
//console.log(d.Province);
return d.Province; }));
y.domain([0, d3.max(data, function(d) {
//console.log(d['New Workers']);
return d['New Workers']; })]);

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append("text")
    .attr("y", 6)
    .attr("dy", "2.5em")
    .attr("dx", width/2 - margin.left)
    .attr("text-anchor", "start")
    .text("Province/Territory");

g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("New Worker Count");

g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { 
        //console.log(d.Province)
        return x(d.Province); })
    .attr("y", function(d) { 
        //console.log(d['New Workers'])
        return y(d['New Workers']); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d['New Workers'])})
    .on("mouseover", function(d) {
        tip.style("visibility", "visible")
        .style("left",  x(d['target']['__data__']['Province']) + x.bandwidth() -12 + "px")
        .style("top", y(d['target']['__data__']['New Workers']) - 13 + "px")
        .html(d['target']['__data__']['New Workers'])
        //console.log(d['target']['__data__']['Province'])
        })
	.on("mouseout", function(){tip.style("visibility", "hidden");});

svg.append("text")
    .attr("class", "title")
    .style("font-size", "11px")
    .attr("dx", width/2)
    .attr("dy", (margin.top / 2))
    .attr("text-anchor", "middle")
    .text("New Syrian Refugee Workers vs. Admission Province/Territory");

})