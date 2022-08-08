// sort cities by descending pop growth
var sortedCities = cityGrowths.sort((a,b) => b.Increase_from_2016-a.Increase_from_2016);
console.log(sortedCities);

// filter for top 5 by growth
var topFiveCities = sortedCities.slice(0,5);
console.log(topFiveCities);

// create 2 arrays for graph: city names and pop growth
var topFiveCityNames = topFiveCities.map(city => city.City);
console.log(topFiveCityNames);

var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from2016));
console.log(topFiveCityGrowths);

// render arrays in Plotly
var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
};

var data = [trace];

var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: {title: "City"},
    yaxis: {title: "Population Growth, 2016-2017"}
};

Plotly.newPlot("bar-plot", data, layout);