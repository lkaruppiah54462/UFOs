// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");
  
  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");
  
    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Keep track of all filters
var filters = [{"date":""},{"city":""},{"state":""},{"country":""},{"shape":""}];


// This function will replace your handleClick function
function updateFilters() {  
  // Save the element, value, and id of the filter that was changed
  //let inputfilter = {}
  filters[0]["date"] = d3.select("#datetime").property("value");
  filters[1]["city"] = d3.select("#city").property("value");
  filters[2]["state"] = d3.select("#state").property("value");
  filters[3]["country"] = d3.select("#country").property("value");
  filters[4]["shape"] = d3.select("#shape").property("value");
  //Object.keys(inputfilter).forEach(function(key){
  //  if (filters[key] != inputfilter[key]){
  //    filters[key] = inputfilter[key]
  //  };

  

  // If a filter value was entered then add that filterId and value  
  // to the filters list. Otherwise, clear that filter from the filters object
    


  // Call function to apply all filters and rebuild the table
  
  filterTable();
}
function filterTable() {  
  // Set the filteredData to the tableData
  let filteredData = tableData;  
  // Loop through all of the filters and keep any data that
  for (var i =0; i<filters.length;i++){
    if (Object.values(filters[i])[0] != ""){
      switch(i){
        case 0: 
          filteredData = filteredData.filter(row => row.datetime === Object.values(filters[i])[0]);
          break;
        case 1: 
          filteredData = filteredData.filter(row => row.city === Object.values(filters[i])[0]);
          break;  
        case 2: 
          filteredData = filteredData.filter(row => row.state === Object.values(filters[i])[0]);
          break;  
        case 3: 
          filteredData = filteredData.filter(row => row.country === Object.values(filters[i])[0]);
          break;   
        case 4: 
          filteredData = filteredData.filter(row => row.shape === Object.values(filters[i])[0]);
          break;                                     
        }
    }
  }
  console.log(filters)
  
  // matches the filter values  
  // Finally, rebuild the table using the filtered Data  
  buildTable(filteredData);
}
function handleClick() {

    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;
  
    // Check to see if a date was entered and filter the
    // data using that date.
    if (date) {
        // Apply `filter` to the table data to only keep the
        // rows where the `datetime` value matches the filter value
        filteredData = filteredData.filter(row => row.datetime === date);
    };
  
    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
};
// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);