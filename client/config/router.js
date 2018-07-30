var PostSubs = new SubsManager({

    // maximum number of cache subscriptions
    cacheLimit: 20,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});

Router.route('/', function () {
    if (!Meteor.userId()) {
        this.render('login');
        this.layout('blankLayout');
    }
    else {
        Router.go('/dashboard');
    }

});

Router.route('/forgotPassword', function () {
    this.render('forgotPassword');

});

Router.route('/resetPassword', function () {
    this.render('resetPassword');

});

Router.route('/signout', function () {
    this.render('loggedOut');
    this.layout('blankLayout');

});

Router.route('/register', function () {
    this.render('register');
    this.layout('blankLayout');
});


Router.route('/notFound', function () {
    this.render('notFound');
});