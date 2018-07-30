Meteor.publish("apiaddress", function () {

  return apiAddress.find({createdBy: this.userId});
});

Meteor.publish("addingapisearch", function () {

  return addingApiSearch.find({createdBy: this.userId});
});

Meteor.publish("apierrors", function () {

  return apiErrors.find({createdBy: this.userId});
});
