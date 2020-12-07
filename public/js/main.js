// Create instances of all charts
let list = new List();
let spendChart = new SpendChart();


let allYears = {}
calls = []
for (let i = 1997; i < 2019; i++) {
  calls.push(d3.csv(`data/${i}.csv`))
}
let buttons = document.getElementsByClassName('grad_rate');
for (var i = 0; i < buttons.length; i++) {
  if (buttons[i].value == 'C150_4') {
    buttons[i].checked = true;
  }
}
// Using a Promise instead for reading multiple CSVs
Promise.all(calls).then(data => {
  for (let yr in data) {
    allYears[parseInt(data[yr][0].YEAR)] = data[yr];
  }

  // Load the data corresponding to all the years.
  d3.csv("data/yearwiseDropouts.csv").then(yearlyDropouts => {
    let data = yearlyDropouts.map(d => { return parseFloat(d.Completion) });
    let years = yearlyDropouts.map(d => { return parseInt(d.YEAR) });

    const usLine = new LineChart('us', null, years);
    const stLine = new LineChart('st', allYears, years);
    const map = new Map(stLine);
    let demographic = new Demographic(map);

    let yearChart = new YearChart(map, spendChart, yearlyDropouts, usLine, stLine, demographic, list);// TODO: pass chart instances 
    yearChart.update();



    usLine.update(data, true);
    stLine.update(null);

    let yr = 2018
    let s = d3.select(`#y${yr}`);
    yearChart.selectYear(s, s.data()[0]);

    // console.log(data)

    // d3.csv(`data/${d.YEAR}.csv`).then(year => {
    //   demographic.update(map, year;
    // });


    // demographic.addOnClick(s.data()[0])


  });

});
