var ufoData = data;


var resetButton = d3.select("#reset-btn");
var dateInput = d3.select("#datetime");
var citySelector = d3.select("#inputCity");
var stateSelector = d3.select("#inputState");
var countrySelector = d3.select("#inputCountry");
var shapeSelector = d3.select("#inputShape");
var submmitTable = d3.select("#filter-btn");
var cityList = [...new Set(ufoData.map(row => row.city))].sort();
var stateList = [...new Set(ufoData.map(row => row.state))].sort();
var countryList = [...new Set(ufoData.map(row => row.country))].sort();
var shapeList = [...new Set(ufoData.map(row => row.shape))].sort();
function getThatTable(dataTable) {

    
    d3.select("tbody").selectAll("tr").remove();

    
    dataTable.forEach((row) => {

        
        var tableRowData = d3.select("tbody").append("tr");

        
        Object.values(row).forEach(value => tableRowData.append("td").text(`${value}`));
    });
};
function filterMyTable(row) {

    
    var filterOuput = (new Date(row.datetime)).getTime() >= (new Date(dateInput.property("value"))).getTime();

    
    if (citySelector.property("value") != "Select Parameter") {
        filterOuput = (filterOuput && (row.city === citySelector.property("value")));
    };

    
    if (stateSelector.property("value") != "Select Parameter") {
        filterOuput = (filterOuput && (row.state === stateSelector.property("value")));
    };

    
    if (countrySelector.property("value") != "Select Parameter") {
        filterOuput = (filterOuput && (row.country === countrySelector.property("value")));
    };

  
    if (shapeSelector.property("value") != "Select Parameter") {
        filterOuput = (filterOuput && (row.shape === shapeSelector.property("value")));
    };

    return filterOuput;
};
submmitTable.on("click", function() {

    
    d3.event.preventDefault();

    
    var filteredTable = ufoData.filter(filterMyTable);

    
    getThatTable(filteredTable);
});
resetButton.on("click", function() {

    
    d3.event.preventDefault();

    
    dateInput.property("value", "1/1/2010");
    
    
    var htmlElements = document.getElementsByTagName('select');
    for (var i = 0; i < htmlElements.length; i++) {
        htmlElements[i].selectedIndex = 0;

     
    initComponents();
    };
});
function dropDownComponents(){

    
    cityList.forEach((city) => {
        
        citySelector.append("option").text(`${city}`);
    });

    
    stateList.forEach((state) => {
        stateSelector.append("option").text(`${state}`);
    });

    
    countryList.forEach((country) => {
        countrySelector.append("option").text(`${country}`);
    });

    
    shapeList.forEach((shape) => {
        shapeSelector.append("option").text(`${shape}`);
    });
};



function initComponents() {

    
    dropDownComponents();

    
    getThatTable(ufoData);
};


initComponents();