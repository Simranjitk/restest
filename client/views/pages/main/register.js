Template.register.events({
  'submit form': function () {
    // code goes here
    event.preventDefault();
    var username = $('[name=name]').val();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Accounts.createUser({
      username: username,
      email: email,
      password: password
    }, function (error) {
      if (error) {
        //console.log(error.reason); // Output error if registration fails
        sAlert.error(error.reason, { effect: 'scale', position: 'bottom', timeout: '2000', onRouteClose: false, stack: false, offset: '0px' });
      } else {
        Router.go("/"); // Redirect user if registration succeeds
      }
    });
  }
});
