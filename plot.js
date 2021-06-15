var select = d3.select("#id-select")

// pull json data in 
d3.json("samples.json").then((samples) => {
    //set up drop down from ID names
    var IDS = samples.names;
    //set up counter to run through for dropdown
    count = 0
    //run through each ID and add it to the dropdown 
    IDS.forEach(id => {
        var option = select.append('option');
        option.text(id)
        option.property('value', count)
        count = count + 1
    })

    //when an ID is selected show graphs
    select.on('change', function () {
        //hbar graph
        //pulling data out of samples for hbar
        var selected_id = select.property('value');
        var spec_sample = samples.samples[selected_id];
        //modifying the list to grab the top 10 (all IDs are already in highest to lowest sample_value order)
        //reversing the list to make sure the hbar has the proper orientation
        var sample_values_10 = spec_sample.sample_values.slice(0, 10).reverse();
        var otu_ids_10 = spec_sample.otu_ids.slice(0, 10).reverse();
        var otu_labels_10 = spec_sample.otu_labels.slice(0, 10).reverse();

        //hbar trace
        var trace1 = {
            x: sample_values_10,
            y: otu_ids_10,
            text: otu_labels_10,
            type: "bar",
            orientation: "h"
        };

        //hbar data
        var data1 = [trace1];

        //hbar layout
        var layout1 = {
            title: "Top 10 Bacterial Cultures Found",
            yaxis: { type: "category", title: "OTU ID" },
            xaxis: { title: "Count of each ID" }
        };

        //hbar plot
        Plotly.newPlot('hbar', data1, layout1);

        //bubble graph
        //pull in data from samples
        var sample_values = spec_sample.sample_values;
        var otu_ids = spec_sample.otu_ids;
        var otu_labels = spec_sample.otu_labels;

        //turning the otu_ids values into rgb color
        rgb_math = x => x / 3500 * 128;
        var num_color = otu_ids.map(rgb_math);
        //making rgb series
        rgb_series = x => 'rgb(' + 1 / x + ',' + x * 2 + ',' + 150 + ')';
        var num_colors = num_color.map(rgb_series);

        //modifying the size so that the dots don't overlap as much 
        size_mod = x => x / Math.sqrt((Math.sqrt(x)));
        var size_value = sample_values.map(size_mod);

        //bubble trace
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

        //bubble data
        var data2 = [trace2];

        //bubble layout
        var layout2 = {
            title: "Bacterial Cultures per Sample",
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Count of each ID" }
        };

        //bubble plot
        Plotly.newPlot('bubble-chart', data2, layout2);

        //demographics data list
        var spec_metadata = samples.metadata[selected_id];
        var meta_id = spec_metadata.id;
        var meta_ethnicity = spec_metadata.ethnicity;
        var meta_gender = spec_metadata.gender;
        var meta_age = spec_metadata.age;
        var meta_location = spec_metadata.location;
        var meta_bbtype = spec_metadata.bbtype;
        var meta_wfreq = spec_metadata.wfreq;
        //push the data onto the webpage
        d3.select("#item1").text(`ID: ${meta_id}`);
        d3.select("#item2").text(`Ethnicity: ${meta_ethnicity}`);
        d3.select("#item3").text(`Gender: ${meta_gender}`);
        d3.select("#item4").text(`Age: ${meta_age}`);
        d3.select("#item5").text(`Location: ${meta_location}`);
        d3.select("#item6").text(`Belly Button Type: ${meta_bbtype}`);
        d3.select("#item7").text(`Wash Frequency: ${meta_wfreq}`);

        //gauge graph
        //gauge trace
        var trace3 =
        {
            type: "indicator",
            mode: "gauge+number",
            value: meta_wfreq,
            gauge: {
                axis: { range: [null, 9], nticks: 10 },
                bar: { color: "#204f38" },
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0, 1], color: "#d9fdff" },
                    { range: [1, 2], color: "#c3e4e6" },
                    { range: [2, 3], color: "#b4d2d4" },
                    { range: [3, 4], color: "#a3bdbf" },
                    { range: [4, 5], color: "#91a7a8" },
                    { range: [5, 6], color: "#7d9091" },
                    { range: [6, 7], color: "#6e7f80" },
                    { range: [7, 8], color: "#5b7070" },
                    { range: [8, 9], color: "#4e6161" },
                ],
            }
        };

        //gauge data
        var data3 = [trace3];

        //gauge layout
        var layout3 = {
            title: "Belly Button Wash Frequency",
            width: 500, 
            height: 425, 

        };

        //gauge plot
        Plotly.newPlot('gauge-chart', data3, layout3);

    })

});
