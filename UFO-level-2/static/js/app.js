var tbody = d3.select("tbody");

function buildTable(d)
{
    d.forEach(sighting =>
    {
        // creating the row variable here adds a new row in the table
        let row = tbody.append("tr");
        Object.entries(sighting).forEach(([k, v]) =>
        {
            // using it here does not add a new row
            let cell = row.append("td"); 
            cell.text(v);   
        });
    });
}


buildTable(data);


var filterBtn = d3.select("#filter-btn");

filterBtn.on("click", function()
{
    // remove existing items from table
    tbody.selectAll("td").remove();

    // Select the input elements and get their value properties
    let inputDate = d3.select("#datetime").property("value");
    let inputCity = d3.select("#city").property("value").toLowerCase();
    let inputState = d3.select("#state").property("value").toLowerCase();
    let inputCountry = d3.select("#country").property("value").toLowerCase();
    let inputShape = d3.select("#shape").property("value").toLowerCase();

    let filterObject = {};

    // add items to the filter object if they exist 
    if (!!inputDate) {filterObject.datetime = inputDate;}
    if (!!inputCity) {filterObject.city = inputCity;}
    if (!!inputState) {filterObject.state = inputState;}
    if (!!inputCountry) {filterObject.country = inputCountry;}
    if (!!inputShape) {filterObject.shape = inputShape;}

    // if there are no inputs, the whole table will be rebuilt
    let filteredData = data;
    
    Object.entries(filterObject).forEach(([k,v]) =>
    {
        // this is the first time I've found javascript to be actually useful, because I'm not sure
        // that k is a string and it's not fussing about that when using it in [] to look up values
        filteredData = filteredData.filter(sighting => sighting[k] === v);
    });

    // build table from the data matching the search criteria
    buildTable(filteredData);
});


var clearBtn = d3.select("#clear-btn");
clearBtn.on("click", function()
{
    // set the input fields to blank
    d3.select("#datetime").property("value", "");
    d3.select("#city").property("value", "");
    d3.select("#state").property("value", "");
    d3.select("#country").property("value", "");
    d3.select("#shape").property("value", "");

    // remove existing items from table and build the table from all data
    tbody.selectAll("td").remove();
    buildTable(data);
});