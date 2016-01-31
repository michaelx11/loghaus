Logs = new Mongo.Collection("logs");

if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.subscribe("logs");

  Meteor.startup(function() {
    React.render(<App />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
  Meteor.publish("logs", function () {
    return Logs.find();
  });
}


Meteor.methods({
  addLog(lang, count) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Logs.insert({
      lang: lang,
      count: count,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  removeLog(logId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Logs.remove(logId);
  }
});
