// Import d3
import * as d3 from 'd3'

// Read the CSV
d3.csv('https://neugymcsv.s3.amazonaws.com/data.csv', (data) => {
    // Set up the graph
    const svg = d3.select('body')
        .append('svg')
        .attr('width', 800)
        .attr('height', 600);

    // Nest the data by location
    const nestedData = d3.nest()
        .key(d => d.location)
        .entries(data);

    // Create a color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Add a group for each location
    const groups = svg.selectAll('g')
        .data(nestedData)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0, ${i * 150})`);

    // Add a path for each group
    groups.append('path')
        .attr('d', d => {
            // Compute the line
            return d3.line()
                .x(d => d3.scaleLinear().domain([0, d3.max(data, d => d.time)]).range([0, 800])(d.time))
                .y(d => d3.scaleLinear().domain([0, d3.max(data, d => d.count)]).range([600, 0])(d.count))
                (d.values);
        })
        .attr('stroke', d => color(d.key))
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    // Add a label for each group
    groups.append('text')
        .attr('x', 820)
        .attr('y', d => d3.scaleLinear().domain([0, d3.max(data, d => d.count)]).range([600, 0])(d.values[0].count))
        .text(d => d.key)
        .attr('fill', d => color(d.key))
        .attr('font-size', '14px');
});