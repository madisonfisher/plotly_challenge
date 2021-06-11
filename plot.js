var select = d3.select("#id-select")

// pull json data in 
d3.json("samples.json").then((samples) => {
    //set up variables from samples
    var IDS = samples.names;

    IDS.forEach(id => {
        var option = select.append('option');
        option.text(id)
        option.property('value', id)
    })
    
    
  });
  