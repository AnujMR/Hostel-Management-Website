anychart.onDocumentReady(function () {
    var data = [
        ["Jan", 15000],
        ["Feb", 12000],
        ["Mar", 10500],
        ["Apr", 4780],
        ["May", 7880],
        ["Jun", 11300],
        ["Jul", 12400],
        ["Aug", 3000],
        ["Sep", 5000],
        ["Oct", 7000],
        ["Nov", 8700],
        ["Dec", 10000],
    ];

    // create a data set
    var dataSet = anychart.data.set(data);

    // map the data for all series
    var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });

    // create a line chart
    var chart = anychart.line();

    // create the series and name them
    var firstSeries = chart.line(firstSeriesData);
    firstSeries.name("Expense");

    // add a legend
    // chart.legend().enabled(true);

    // // add a title
    // chart.title("Monthly Expenses");

    // specify where to display the chart
    chart.container("expense-graph");

    // draw the resulting chart
    chart.draw();

    firstSeries.normal().stroke("#ff0000", 2);
});