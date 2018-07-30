Template.mainDashboard.onRendered(function () {

  Tracker.autorun(function () {
    $(".btn-group > .btn").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
      $(this).addClass("active");
    });
    var apiData = apiAddress.find({}).fetch();

    for (var i = 0; i < apiData.length; i++) {
      try {
        var ctx = document.getElementById("statusChart-" + apiData[i]._id).getContext('2d');
        var days = [];
        var values = [];
        for (var j = 0; j < apiData[i].statusRecord.length; j++) {
          days.push(apiData[i].statusRecord[j].time);
          values.push(apiData[i].statusRecord[j].responseTime);
        }
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: days,
            datasets: [{
              label: 'Response Time',
              data: values,
              backgroundColor: [
                'rgba(20, 250, 20, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(2, 110, 2,1)',
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
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      } catch (err) {

      }

    }

  });
});

Template.mainDashboard.events({
  "click #add": function (event, template) {
    var apiName = document.getElementById('formGroupExampleInput').value;
    var apiAddress1 = document.getElementById('formGroupExampleInput2').value;
    if (apiAddress.find({ apiAddress: apiAddress1 }).count() > 0) {
      toastr.error("You have used this API url for a different API already", 'Duplicate URL');
    }
    else {
      var e = document.getElementById("getOrPost");
      var getOrPost = e.options[e.selectedIndex].text;
      var a = document.getElementById("usageOrStatus");
      var usageOrStatus = a.options[a.selectedIndex].text;
      var authentication = document.getElementById('authorization').value;
      var b = document.getElementById("addingFrequency");
      var frequency = b.options[b.selectedIndex].text;
      console.log(frequency);

      Meteor.call("updateApi", apiName, apiAddress1, getOrPost, usageOrStatus, authentication, frequency, function (error, result) {
        if (error) {
          console.log("error", error);
        }
        if (result) {
          toastr.error(JSON.stringify(result, null, "\t"), 'Error');
        }
      });
    }
  },
  "click #removeApi": function (event, template) {
    result = event.currentTarget.dataset.value;
    Meteor.call("removeApi", result, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {

      }
    });
  },
  "click #changeFreqency": function (event, template) {
    result = event.currentTarget.dataset.value;
    var b = document.getElementById("dashboardFrequency-" + result);
    var frequency = b.options[b.selectedIndex].text;
    Meteor.call("changeFreqency", frequency, result, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {

      }
    });
  },
  "click #frequencyButton": function (event, template) {
    result = event.currentTarget.dataset.value;
    var frequency = result.split(/,(.+)/)[0];
    var id = result.split(/,(.+)/)[1];
    Meteor.call("changeFreqency", frequency, id, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {

      }
    });
  }

});

Template.mainDashboard.helpers({
  apis: function () {
    var apiAddress1 = apiAddress.find({}).fetch();
    var final = [];
    for (var i = 0; i < apiAddress1.length; i++) {
      if (apiAddress1[i].updatedTime) {
        final.push({
          _id: apiAddress1[i]._id,
          apiName: apiAddress1[i].apiName,
          apiAddress: apiAddress1[i].apiAddress,
          getOrPost: apiAddress1[i].getOrPost,
          usageOrStatus: apiAddress1[i].usageOrStatus,
          path: apiAddress1[i].path,
          response: (JSON.stringify(apiAddress1[i].response, null, 4)),
          header: (JSON.stringify(apiAddress1[i].headers, null, 4)),
          status: apiAddress1[i].status,
          frequency: apiAddress1[i].frequency,
          updatedTime: apiAddress1[i].updatedTime,
          responseTime: apiAddress1[i].responseTime,
          statusRecord: apiAddress1[i].statusRecord
        })
      } else {
        final.push({
          _id: apiAddress1[i]._id,
          apiName: apiAddress1[i].apiName,
          apiAddress: apiAddress1[i].apiAddress,
          getOrPost: apiAddress1[i].getOrPost,
          usageOrStatus: apiAddress1[i].usageOrStatus,
          path: apiAddress1[i].path,
          response: (JSON.stringify(apiAddress1[i].response, null, 4)),
          header: (JSON.stringify(apiAddress1[i].headers, null, 4)),
          status: apiAddress1[i].status,
          frequency: apiAddress1[i].frequency,
          responseTime: apiAddress1[i].responseTime,
          statusRecord: apiAddress1[i].statusRecord
        })
      }

    }
    return final;
  },
  loading: function () {
    if (addingApiSearch.find({}).count() > 0) {
      return 1;
    } else {
      return 0;
    }
  },
  errors: function () {
    return apiErrors.findOne({}).errors;
  },
  todaysDate: function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    return today;
  }
});
