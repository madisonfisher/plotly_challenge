var select = d3.select("#id-select")

// pull json data in 
d3.json("samples.json").then((samples) => {
    //set up variables from samples
    var IDS = samples.names;

    count = 0

    IDS.forEach(id => {
        var option = select.append('option');
        option.text(id)
        option.property('value', count)
        count = count + 1
    })
    
    select.on('change', function() {
        var selected_id = select.property('value');
        console.log(selected_id);
        var spec_sample = samples.samples[selected_id];
        console.log(spec_sample);
        var sample_values = spec_sample.sample_values.slice(0,10).reverse();
        console.log(sample_values);
        var otu_ids = spec_sample.otu_ids.slice(0,10).reverse();
        console.log(otu_ids);
        var otu_labels = spec_sample.otu_labels.slice(0,10).reverse();
        console.log(otu_labels);

        var trace1 = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 Bacterial Cultures Found",
            yaxis: {type : "category", title: "OTU ID"}, 
            xaxis: {title: "Count of each ID"}
        };
        
        Plotly.newPlot('hbar', data1, layout1);

    })
    
  });
  