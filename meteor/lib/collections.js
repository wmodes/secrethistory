// Declate all collections and subscriptions

// Chapters
ChapterCollection = new Mongo.Collection("ChapterCollection");

if(Meteor.isClient){
    Meteor.startup(function() {
        Session.set('dataReady', false); 
    }); 

    Meteor.subscribe('users');
    Meteor.subscribe('roles');

    Meteor.subscribe('ChapterCollection', function onReady(){
        // Set the reactive session as true to indicate that the data 
        // have been loaded
        Session.set('dataReady', true); 
    });

    Meteor.Spinner.options = {
        lines: 13, // The number of lines to draw
        length: 10, // The length of each line
        width: 5, // The line thickness
        radius: 15, // The radius of the inner circle
        corners: 0.7, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#fff', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 300, // Top position relative to parent in px
        left: 800 // Left position relative to parent in px
    };

}
