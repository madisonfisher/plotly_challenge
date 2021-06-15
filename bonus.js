var select = d3.select("#id-select")

// pull json data in 
d3.json("samples.json").then((samples) => {

    //when an ID is selected show graphs
    select.on('change', function () {
    
        var selected_id = select.property('value');
        var spec_metadata = samples.metadata[selected_id];
        var meta_wfreq = spec_metadata.wfreq;

        var data = [
            {
              type: "indicator",
              mode: "gauge+number",
              value: meta_wfreq,
              gauge: {
                axis: { range: [null, 9] },
                bar: { color: "darkgreen" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                  { range: [0, 1], color: "rgb(225, 245, 238)" },
                  { range: [1, 2], color: "rgb(200, 245, 238)" },
                  { range: [2, 3], color: "rgb(175, 245, 238)" },
                  { range: [3, 4], color: "rgb(150, 245, 238)" },
                  { range: [4, 5], color: "rgb(125, 245, 238)" },
                  { range: [5, 6], color: "rgb(100, 245, 238)" },
                  { range: [6, 7], color: "rgb(75, 245, 238)" },
                  { range: [7, 8], color: "rgb(50, 245, 238)" },
                  { range: [8, 9], color: "rgb(25, 245, 238)" },
                ],
              }
            }
          ];
          
          var layout = {
            title: "Belly Button Wash Frequency"
          };
          
          Plotly.newPlot('gauge-chart', data, layout);
    })

});