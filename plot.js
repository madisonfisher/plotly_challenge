var select = d3.select("#id-select")

// pull json data in 
d3.json("samples.json").then((samples) => {
    //set up drop down from ID names
    var IDS = samples.names;

    count = 0

    IDS.forEach(id => {
        var option = select.append('option');
        option.text(id)
        option.property('value', count)
        count = count + 1
    })

    //when an ID is selected show graphs
    select.on('change', function () {
        //hbar graph
        var selected_id = select.property('value');
        var spec_sample = samples.samples[selected_id];
        var sample_values_10 = spec_sample.sample_values.slice(0, 10).reverse();
        var otu_ids_10 = spec_sample.otu_ids.slice(0, 10).reverse();
        var otu_labels_10 = spec_sample.otu_labels.slice(0, 10).reverse();

        var trace1 = {
            x: sample_values_10,
            y: otu_ids_10,
            text: otu_labels_10,
            type: "bar",
            orientation: "h"
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 Bacterial Cultures Found",
            yaxis: { type: "category", title: "OTU ID" },
            xaxis: { title: "Count of each ID" }
        };

        Plotly.newPlot('hbar', data1, layout1);

        //bubble graph
        var sample_values = spec_sample.sample_values;
        var otu_ids = spec_sample.otu_ids;
        var otu_labels = spec_sample.otu_labels;

        //turning the otu_ids values into rgb color
        rgb_math = x => x / 3500 * 128;
        var num_color = otu_ids.map(rgb_math);
        //making rgb series
        rgb_series = x => 'rgb(' + 1/x + ',' + x*2 + ',' + 150 +')';
        var num_colors = num_color.map(rgb_series);

        //modifying the size so that the dots don't overlap as much 
        size_mod = x => x / Math.sqrt((Math.sqrt(x)));
        var size_value = sample_values.map(size_mod);

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                size: size_value,
                color: num_colors
            },
            text: otu_labels
        };
        var data2 = [trace2];

        var layout2 = {
            title: "Bacterial Cultures per Sample",
            xaxis: {title: "OTU ID" },
            yaxis: { title: "Count of each ID" }
        };

        Plotly.newPlot('bubble-chart', data2, layout2);

    })

});
