Template.loggedOut.events({
  'submit form': function (event) {
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(email, password, function (error) {
      if (error) {
        sAlert.error(error.reason, { effect: 'scale', position: 'bottom', timeout: '2000', onRouteClose: false, stack: false, offset: '0px' });

        console.log(error.reason);
      } else {
        Router.go("/dashboard");
      }
    });
  }
});
