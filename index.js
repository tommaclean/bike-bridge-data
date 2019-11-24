let ctx = document.getElementById("bikeChart").getContext('2d')

let brBridge = 606
let manBridge = 1446
let willBridge = 1915
let queenBridge = 1430
let totalRiders = 5397
let rain = 0
let dateDisplay
let labels = ["Brooklyn Bridge", "Manhattan Brdige", "Williamsburg Bridge", "Queensboro Bridge", "Total", "Rain (mm)"]
let data = [brBridge, manBridge, willBridge, queenBridge, totalRiders, rain]

let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: `Toggle Data On/Off`, // Name the series
            data: data, // Specify the data values array
            backgroundColor: [ // Specify custom colors
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [ // Add custom color borders
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2 // Specify bar border width
        }]

    },
    options: {
      legend: false,
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: true, // Add to prevent default behaviour of full-width/height
      scales: {
            yAxes: [{
                gridLines: {
                  color: "#d9d7da"
                },
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                gridLines: {
                  color: "#d9d7da"
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        },
      plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
                color: '#d9d7da',
                align: 'end',
                offset: 10,
                font: {
                  style: 'bold',
                  size: 24
                }
            }
        }
    },
    update: function(reset) {}
});

document.querySelector(".monthSelect").addEventListener("change", dateSelected)

function dateSelected(event){

    fetch('https://cors-anywhere.herokuapp.com/https://cyclist-count.herokuapp.com/db.json', {mode: 'cors'})
      .then(response => {return response.json()}).then(data => {sumDailyRiders(data, event)})
}

function sumDailyRiders(countData, event){
    let splitDate = event.target.value.split("-")
    let month = splitDate[1]
    let day = splitDate[2]
    let dateDisplay = month + day + " 2017"
    let rain = []
    let newTotal
    let totalRidersSum = []
    let brBridgeSum = []
    let manBridgeSum = []
    let willBridgeSum = []
    let queenBridgeSum = []
    countData.dates.forEach(function(entry){
      if (entry.month === month && entry.day === day){
          newTotal = parseInt(entry.total.replace(/,/g, ""));
          totalRidersSum.push(newTotal)

          newBrBridgeTotal = parseInt(entry.brBridge.replace(/,/g, ""));
          brBridgeSum.push(newBrBridgeTotal)

          newManBrTotal = parseInt(entry.manBridge.replace(/,/g, ""));
          manBridgeSum.push(newManBrTotal)

          newWillBrTotal = parseInt(entry.willBridge.replace(/,/g, ""));
          willBridgeSum.push(newWillBrTotal)

          newQueenBrTotal = parseInt(entry.queenBridge.replace(/,/g, ""));
          queenBridgeSum.push(newQueenBrTotal)

          rain.push(entry.rain)
      }
    })
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        let totalRiders = totalRidersSum.reduce(reducer, 0)
        let brBridge = brBridgeSum.reduce(reducer, 0)
        let manBridge = manBridgeSum.reduce(reducer, 0)
        let willBridge = willBridgeSum.reduce(reducer, 0)
        let queenBridge = queenBridgeSum.reduce(reducer, 0)

        myChart.data.datasets[0].data[5] = Math.round((rain * 25.4) * 100) / 100
        myChart.data.datasets[0].data[4] = totalRiders
        myChart.data.datasets[0].data[3] = queenBridge
        myChart.data.datasets[0].data[2] = willBridge
        myChart.data.datasets[0].data[1] = manBridge
        myChart.data.datasets[0].data[0] = brBridge
        myChart.update()
}
