Template.errorChart.onRendered(function () {
  Tracker.autorun(function () {
    var apiData = apiErrors.findOne({}).errors;
    var time = [];
    var values = [];
    var apis = [];
    if (apiData) {
      for (var i = 0; i < apiData.length; i++) {
        if (apiData[i].length) {
          time.push(apiData[i][0].errorTime);
          values.push(apiData[i][0].totalErrors);
          for (var j = 0; j < apiData[i].length; j++) {
            apis.push(apiData[i][j]);
          }
        }
        else {
          time.push(apiData[i].errorTime);
          values.push(apiData[i].totalErrors);
          apis.push(apiData[i]);
        }

      }
      var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var apis = (groupBy(apis, "errorTime"));
      apis = (Object.values(apis));
      try {

        var ctx = document.getElementById("errorCharts").getContext('2d');

        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: time,
            datasets: [{
              data: values,
              backgroundColor: [
                'rgba(250, 20, 20, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var names = [];
                  for (var i = 0; i < apis[tooltipItem.index].length; i++) {
                    names.push(" " + apis[tooltipItem.index][i].apiName);
                  }
                  var firstTooltip = "API(s): " + names;
                  var otherTooltip = "Errors: " + tooltipItem.yLabel;
                  var tooltip = [firstTooltip, otherTooltip]; //storing all the value here
                  return tooltip; //return Array back to function to show out
                }
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
      catch (err) {

      }
    }



  });
});
