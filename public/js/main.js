
// Create instances of all charts
let map = new Map();
let list = new List();
// let USlineChart = new LineChart('us');
// let STlineChart = new LineChart('st');
let spendChart = new SpendChart();
let usLine = new LineChart('us');
let stLine = new LineChart('st');
// Load the data corresponding to all the years.
d3.csv("data/yearwiseDropouts.csv").then(yearlyDropouts => {
  // let yearChart = new YearChart(map, spendChart, yearlyDropouts);// TODO: pass chart instances 

  let yearChart = new YearChart(map, spendChart, yearlyDropouts, usLine, stLine);// TODO: pass chart instances 
  yearChart.update();

  let data = yearlyDropouts.map(d => { return parseFloat(d.Completion) })
  let years = yearlyDropouts.map(d => { return parseInt(d.YEAR) })

  usLine.update(data, years, true)

  let s = d3.select('#y2018');
  yearChart.selectYear(s, s.data()[0]);

  d3.csv(`data/${s.data()[0].YEAR}.csv`).then(data => {
    map.update(data);
    list.update(data);
  })
});
