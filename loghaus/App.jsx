App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      logs: Logs.find({}).fetch()
    }
  },

  getLangs() {
    return [
      { name: "Javascript"},
      { name: "Python"},
      { name: "C"},
      { name: "Java"}
    ];
  },

  renderLogs() {
    return this.data.logs.map((log) => {
      return <Log key={log._id} log={log} />;
    });
  },

  renderLanguageOptions() {
    return this.getLangs().map((lang) => {
      return <option value={lang.name}>{lang.name}</option>;
    });
  }, 

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();
 
    Logs.insert({
      count: text,
      createdAt: new Date() // current time
    });
 
    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Your Logs:</h1>

          <form className="new-log" onSubmit={this.handleSubmit}>
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add a new log." />
            <select ref="languagePicker">
              {this.renderLanguageOptions()}
            </select>
          </form>
        </header>
 
        <ul>
          {this.renderLogs()}
        </ul>
      </div>
    );
  }
});
