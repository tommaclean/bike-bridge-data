let ctx = document.getElementById("bikeChart").getContext('2d')

let data = [606, 1446, 1915, 1430, 5397]

let labels = ["Brooklyn Bridge", "Manhattan Brdige", "Williamsburg Bridge", "Queensboro Bridge", "Total"]


let myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Cyclist Count on 4/1/17', // Name the series
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
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
      scales: {
            yAxes: [{
                gridLines: {
                  color: "#737373"
                },
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                gridLines: {
                  color: "#737373"
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        }

    }
});
