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
var filters = {"date":"","city":"","state":"","country":"","shape":""};
//var filters = {}

// This filter update click function 
function updateFilters() {  
  // Save the element, value, and id of the filter that was changed
  //let inputfilter = {}
  let a = "#"
  // filters[0]["date"] = d3.select("#datetime").property("value");
  // filters[1]["city"] = d3.select("#city").property("value");
  // filters[2]["state"] = d3.select("#state").property("value");
  // filters[3]["country"] = d3.select("#country").property("value");
  // filters[4]["shape"] = d3.select("#shape").property("value");
  Object.keys(filters).forEach(function(key){
    let b = a.concat(key);
    //console.log(b)
    filters[key] = d3.select(b).property("value");
    });
  // Call function to apply all filters and rebuild the table
  filterTable();
}
function filterTable() {  
  // Set the filteredData to the tableData
  let filteredData = tableData;  
  // Loop through all of the filters and keep any data that
  Object.keys(filters).forEach(function(key){
    if (filters[key] != ""){
      switch(key){
        case "date":
          filteredData = filteredData.filter(row => row.datetime === filters[key]);
          break;
        case "city":
          filteredData = filteredData.filter(row => row.city === filters[key]);
          break;
        case "state":
          filteredData = filteredData.filter(row => row.state === filters[key]);
          break;
        case "country":
          filteredData = filteredData.filter(row => row.country === filters[key]);
          break;
        case "shape":
          filteredData = filteredData.filter(row => row.shape === filters[key]);
          break;                
      };
    }
  });    
 
  // matches the filter values  
  // Finally, rebuild the table using the filtered Data  
  buildTable(filteredData);

}
// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);