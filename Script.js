d3.csv('all_seasons.CSV').then(data => {
    // Convert height and rebounds to numbers
    data.forEach(d => {
        d.player_height = +d.player_height;
        d.reb = +d.reb;
    });
const margin = { top: 20, right: 20, bottom: 50, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Add an SVG element to the body
const svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

// This should load the CSV data
d3.csv('all_seasons.CSV').then(data => {
    // Convert height and rebounds to numbers
    data.forEach(d => {
        d.player_height = +d.player_height;
        d.reb = +d.reb;
    });

    // Create scales for x and y axii
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.reb)])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.player_height)])
        .range([height, 0]);

    // Create circles for the scatter plot
    svg.selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('cx', d => xScale(d.reb))
        .attr('cy', d => yScale(d.player_height))
        .attr('r', 5) // radius
        .style('fill', 'blue'); // color

    // Add x and y axii
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))
        .append('text')
        .attr('x', width / 2)
        .attr('y', 40)
        .attr('dy', '0.71em')
        .style('text-anchor', 'middle')
        .text('Rebounds');

    svg.append('g')
        .call(d3.axisLeft(yScale))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -40)
        .attr('dy', '0.71em')
        .style('text-anchor', 'end')
        .text('Height');
});
