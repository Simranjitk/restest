Template.topNavbar.rendered = function () {

    // FIXED TOP NAVBAR OPTION
    // Uncomment this if you want to have fixed top navbar
    // $('body').addClass('fixed-nav');
    // $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');

};

Template.topNavbar.helpers({

});
Template.topNavbar.events({
    'click .logout': function (event) {
        event.preventDefault();
        Meteor.logout();
        Router.go("/signout");
    }

});
