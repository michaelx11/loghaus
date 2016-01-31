App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      logs: Logs.find({}, {sort: {createdAt: -1}}).fetch(),
      currentUser: Meteor.user()
    }
  },

  getLangs() {
    return [
      { _id: 1, name: "Javascript"},
      { _id: 2, name: "Python"},
      { _id: 3, name: "C"},
      { _id: 4, name: "Java"}
    ];
  },

  renderLogs() {
    return this.data.logs.map((log) => {
      return <Log key={log._id} log={log} />;
    });
  },

  renderLanguageOptions() {
    return this.getLangs().map((lang) => {
      return <option key={lang._id} value={lang.name}>{lang.name}</option>;
    });
  }, 

  handleSubmit(event) {
    event.preventDefault();
 
    var count = React.findDOMNode(this.refs.textInput).value.trim();
    var language = React.findDOMNode(this.refs.languagePicker).value.trim();

    Meteor.call("addLog", language, count);
 
    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Your Logs, total count: {this.data.totalCount}</h1>
    
          <AccountsUIWrapper />

          { this.data.currentUser ?
            <form className="new-log" onSubmit={this.handleSubmit}>
              <select ref="languagePicker">
                {this.renderLanguageOptions()}
              </select>
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add a new log." />
            </form>
            : ''
          }

        </header>
 
        <ul>
          {this.renderLogs()}
        </ul>
      </div>
    );
  }
});
