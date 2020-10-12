// 1. Use the D3 library to read in `samples.json`.
var jsonFile = "../data/samples.json";

function initWebpage(){
    var dropdownMenu = d3.select("#selDataset");
    d3.json(jsonFile).then(function(data){
      data.names.forEach(function(sample){
        dropdownMenu.append("option").text(sample).property("value", sample); //This is setting value to sample ("value", sample) 
    });
    // 2. Update all of the plots any time that a new sample is selected.
    optionChanged(data.names[0])
    });
  }

  // 4. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  function buildBar(sample){
    d3.json(jsonFile).then(function(data){
        let samples = data.samples;
        const result = samples.filter(sampleObject => sampleObject.id == sample)[0];

        // Could of initialed all variables let [{otu_ids}, {otu_labels}, {sample_values}]= result;
        console.log({"Samples": result})

        // * Use `sample_values` as the values for the bar chart:
        let sample_values = result.sample_values 
        var sampleValues = (sample_values.slice(0, 10)).reverse();
        console.log({"Top 10 OTUs" :sampleValues});

        // * Use `otu_ids` as the labels for the bar chart:
        let otu_ids = result.otu_ids; 
        let idValues = (otu_ids.slice(0, 10)).reverse().toString();
        let newValues = idValues.split(",")
        let labelValues = newValues.map(i => 'OTU ' + i);
        console.log({"Top 10 OTU IDs" : labelValues});
        

        // * Use `otu_labels` as the hovertext for the chart:
        let otu_labels = result.otu_labels
        console.log({"OTU Labels": otu_labels});
        const otu_text = otu_labels.map(otu_labels => otu_labels.split(";").join(", ").toLowerCase());
        let otu_phrase = otu_text.map(i => 'The following samples tested postive for ' + i);
        console.log({"OTU Text": otu_phrase});
        let otu_sentence = (otu_phrase.slice(0, 10)).reverse();
        console.log({"OTU Sentence": otu_sentence});


        var bar_trace = {
            // * Use `sample values` for the x values:
            x: sampleValues,
            y: labelValues,
            marker: {
              size: sampleValues,
              color: sampleValues
          },
            // * Use `otu_labels` for the labels:
            type: 'bar',
            orientation: "h",
            text: otu_sentence
          };
          var belly_data = [bar_trace]
          var layout = {
          title: 'Top Ten OTUs',
          font:{
              family: 'Raleway, sans-serif'
            },
            showlegend: false,
            xaxis: {
              tickangle: -45
            },
            yaxis: {
              zeroline: false,
              gridwidth: 0
            },
            bargap : 0,
          autosize: false,
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
    });
  };
  

// 3. Create a bubble chart that displays each sample.
function buildBubble(sample){
  d3.json(jsonFile).then(function(data){
      let samples = data.samples;
      const result = samples.filter(sampleObject => sampleObject.id == sample)[0];
      // * Use `otu_ids` for the x values.
      let otu_ids = result.otu_ids; 
      // * Use `sample_values` for the y values.
      let sample_values = result.sample_values
      let otu_labels = samples.otu_labels

        // The bubble chart
        var bubble_trace = {
          x: otu_ids,
          y: sample_values,
          mode: "markers",
          marker: {
            // * Use `sample_values` for the marker size.
              size: sample_values,
              // Use `otu_labels` for the text values.
              color: otu_ids
          },
          text: otu_labels

      };

      // set the layout for the bubble plot
      var layout = {
          xaxis:{title: "OTU ID"},
          height: 600,
          width: 1000
      };

      // creating data variable 
      var belly_data = [bubble_trace];

      // create the bubble plot
      Plotly.newPlot("bubble", belly_data, layout); 
    });
  };  



// 5. Display the sample metadata, i.e., an individual's demographic information.
// create the function to get the necessary data
function getInfo(sample) {
  // read the json file to get data
  d3.json(jsonFile).then((data)=> {
      
      // get the metadata info for the demographic panel
      var metadata = data.metadata;

      // filter meta data info by id
      var result = metadata.filter(meta => meta.id.toString() === sample)[0];

      // 6. Display each key-value pair from the metadata JSON object somewhere on the page.
      var demographics = d3.select("#sample-metadata");
      
      // empty the demographic info panel each time before getting new id info
      demographics.html("");

      // grab the necessary demographic data data for the id and append the info to the panel
      Object.entries(result).forEach((key) => {   
              demographics.append("h4").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
      });
  });
}




        // * Update the chart whenever a new sample is selected.
function buildgauge(sample){
    d3.json(jsonFile).then(function(data){
        var metadata = data.metadata;
        // let [{age}, {bbtype}, {ethnicity}, {gender}, {id}, {location}, wfreq] = metadata;
        const result = metadata.filter(metadataObject => metadataObject.id == sample)[0];
        let wfreq = result.wfreq
        console.log({"Meta Data": metadata});
        console.log({"Belly Wash Frequency's": wfreq});

        let belly = "Belly Button Washing Frequency";
        var belly_data = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: parseFloat(wfreq),
            title: { text: belly},
            type: "indicator",
            text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
            textinfo: 'text',
            textposition:'inside',   
            mode: "gauge+number",
            // * You will need to modify the example gauge code to account for values ranging from 0 through 9.
            gauge: { axis: { range: [0, 9] },
                        steps: [
                        { range: [0, 1], color: "#f0f1f4" },
                        { range: [1, 2], color: "#eae9e4" },
                        { range: [2, 3], color: "#d3e0ce" },
                        { range: [3, 4], color: "#9cb8a0" },
                        { range: [4, 5], color: "#a4fba6" },
                        { range: [5, 6], color: "#4ae54a" },
                        { range: [6, 7], color: "#30cb00" },
                        { range: [7, 8], color: "#0f9200" },
                        { range: [8, 9], color: "#006203" },
                    ]}
                
            }
            ];
            var layout = { 

                    height: 500,
                    width: 600,
                    xaxis: {type:"category",zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
                    yaxis: {type:"category",zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
            };
        Plotly.newPlot("gauge", belly_data, layout);
    });
};  

// 7. Update all of the plots any time that a new sample is selected.
// create the function for the change event
function optionChanged(sample) {
  getInfo(sample);
  buildBar(sample);
  buildBubble(sample);
  buildgauge(sample);
};

initWebpage();