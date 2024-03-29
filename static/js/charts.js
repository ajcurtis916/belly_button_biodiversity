function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    console.log(sampleNames);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  console.log(newSample);
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create variables that hold the samples and metadata arrays. 
    var sampleData = data.samples;
    console.log(sampleData);
    var metadata = data.metadata;
    console.log(metadata);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var desiredSamples = sampleData.filter(sampleObj => sampleObj.id == sample);
    console.log(desiredSamples);
    // Create a variable that filters the metadata array for the object with the desired sample number.
    var desiredMeta = metadata.filter((metaObj) => metaObj.id == sample);
    console.log(desiredMeta);
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = desiredSamples[0];
    console.log(firstSample);
    // Create a variable that holds the first sample in the metadata array.
    var firstMeta = desiredMeta[0];
    console.log(firstMeta);

    // 6. Create variables that hold the otu_ids, otu_labels, sample_values and washing frequency.
    var otu_ids = firstSample.otu_ids;
    console.log(otu_ids);

    var otu_labels = firstSample.otu_labels;
    console.log(otu_labels);

    var sample_values = firstSample.sample_values;
    console.log(sample_values);

    var washing_freq = parseFloat(firstMeta.wfreq);
    console.log(washing_freq);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yTicks = otu_ids.slice(0,10).map((otuID) => `OTU ${otuID}`).reverse();
    console.log(yTicks);

    var xValues = sample_values.slice(0,10).reverse();
    console.log(xValues);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: xValues,
      y: yTicks,
      text: otu_labels,
      margin: { t: 30, l: 150 },
      type: "bar",
      orientation: "h"
    }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: `Top 10 Bacteria Cultures Found in Sample ${sample}`,
      xaxis: {title: "Amount of Bacteria in Sample"}
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Jet",
      }
  }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: `Bacteria Cultures in Sample ${sample}`,
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Bacteria Count"}
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      value: washing_freq,
      type: "indicator",
      mode: "gauge+number",
      title: {text: "Belly Button Washing Frequency <br> (Scrubs per Week)"},
      gauge: {
        axis: {range: [null, 10], tickwidth: 1, tickcolor: "black"},
        bar: {color: "black"},
        borderwidth: 1,
        steps: [
          { range: [0, 2], color: "crimson" },
          { range: [2, 4], color: "orange"},
          { range: [4, 6], color: "chartreuse" },
          { range: [6, 8], color: "cyan" },
          { range: [8, 10], color: "slateblue" }
        ]
      }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "white",
      font: {color: "black", family: "sans-serif"}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  })};
