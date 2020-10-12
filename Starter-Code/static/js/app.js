var jsonFile = "../data/samples.json";

// 3 funtion definitions, 2 functions of code, run init(loads page faster), event lisntner (reads values, compare, for bar/bubble chart) 
// chart builder on click, get value build chart

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
// function unpack(rows, index) {
//     return index.array.forEach(element => {
        
//     });(function(index) {
//       return index[rows];
//     });
//   }
  

function initWebpage(){
  var dropdownMenu = d3.select("#selDataset");
  d3.json(jsonFile).then(function(data){
    data.names.forEach(function(sample){
      dropdownMenu.append("option").;
    });
  });
}
initWebpage();


// // Fetch the JSON data and console log it to display json promise(is it catching my data):
// // How will I go about parsing the data?:
// d3.json(jsonFile).then(function(data) {
// // Display Arrays: 
// console.log({"JSON Data": data});
// // set json data = variables to of seperate array data sets:
// // get the metadata info for the demographic panel
// var metadata = data.metadata;
// let names = data.names;
// let samples = data.samples;
// // var value = metadata[0].age;
// // console.log(value)

// // Declare constant variables for each data set: 
//       // Hint Look at how arrays are nested and release the content by layers.
// // const name= names;
// let [{age}, {bbtype}, {ethnicity}, {gender}, {metaSamples_id}, {location}, {wfreq}] = metadata;
// let [sample_id, {otu_ids}, {otu_labels}, {sample_values}]= samples;
// // // Wanted the information to show up user friendly:
// console.log({"Meta Data": metadata});
// console.log({"Samples": samples})
// console.log({"Names": names});


// // Take names as ID's for dropdown menu(for each works on already iterable object):  
// // <option value="volvo">Volvo</option> appen
// names.forEach(function(name){
//   var dropdownMenu = d3.select("#selDataset"); 
//   dropdownMenu.append("option")

// });



// This function is called when a dropdown menu item is selected
function updatePlot() {
// Use D3 to select the dropdown menu
var dropdownMenu = d3.select("#selDataset");
// Assign the value of the dropdown menu option to a variable
// var dataset = dropdownMenu.property("value");


// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// * Use `sample_values` as the values for the bar chart
// need as reference point:
console.log({"Sample Values" : sample_values[0]});
// samples.forEach((samples) => {
//     sampleValues = samples.sample_values;
//     console.log({"Samples Value Arrays": sampleValues});});
// The goal is to get only the top 10 sampleValues: 
// sort the array, largest numbers to lowest
// sv = sample_values.sort(function(a,b){return b - a});
var sampleValues = (sv.slice(0, 10)).reverse();
console.log({"Top 10 OTUs" :sampleValues});

// * Use `otu_ids` as the labels for the bar chart have to match the sample value ID's:
console.log({"OTU IDs": otu_ids[0]});
// var idValue = (otu_ids.slice(0, 10))
// .reverse();

// Create a custom filtering function to match ID's:
let idValues = otu_ids.filter(s1 => sampleValues.some(s2 => s1.sample_id === s2.sample_id));
console.log({"Top 10 OTU IDs": idValues})
let idValueStrings= idValues.map(String) 
console.log({"Top 10 OTU ID Strings": idValueStrings})

// * Use `otu_labels` as the hovertext for the chart:
console.log({"OTU Labels": otu_labels});
const otu_text = otu_labels.map(otu_labels => otu_labels.split(";"));
console.log({"OTU Text": otu_text});
var labelValues = otu_text.filter(s1 => sampleValues.some(s2 => s1.id === s2.sample_id));
// var labelValues = tu_labels.slice(0, 10)).reverse();
console.log({"Top 10 OTU Labels": labelValues});

var bar_trace = {
    // * Use `sample values` for the x values:
    x: sampleValues[0],
    y: idValueStrings,
    marker: {
      size: sampleValues[0],
      color:idValueStrings
  },
    // * Use `otu_labels` for the labels:
    type: 'bar',
    orientation: "h",
    text: labelValues
  };
  var belly_data = [bar_trace]
  var layout = {
  title: 'Top Ten OTUs',
  font:{
      family: 'Raleway, sans-serif'
    },
  //   showlegend: false,
    xaxis: {
      tickangle: -45
    },
    yaxis: {
      zeroline: false,
      gridwidth: 0
    },
    bargap : 0,
  // autosize: false,
  width: 800,
  height: 600,
  margin: {
    l: 100,
    r: 100,
    b: 80,
    t: 80,
    pad: 1
  },
};
Plotly.newPlot('bar', belly_data, layout);

// create the function for the change event
function optionChanged(id) {
    createFigure(id);
    getMeta(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getMeta(data.names[0]);
        createFigure(data.names[0]);
    });
}

init();