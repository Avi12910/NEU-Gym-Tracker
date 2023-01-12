const Plotly = require('plotly.js-dist');
const Papa = require('papaparse');

// Read CSV file
Papa.parse("data.csv", {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function (results) {
        let data = results.data;

        // Organize data by location
        let locations = {};
        data.forEach(row => {
            let location = row.location;
            let count = row.count;
            let time = row.time;

            if (!locations[location]) {
                locations[location] = {
                    x: [],
                    y: [],
                    mode: 'lines',
                    name: location
                };
            }

            locations[location].x.push(time);
            locations[location].y.push(count);
        });

        // Create line chart for each location
        let plotData = Object.values(locations);
        Plotly.newPlot('chart', plotData);
    }
});