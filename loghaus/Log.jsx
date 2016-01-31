Log = React.createClass({
  propTypes: {
    // This component gets the Log to display through a React prop.
    // We can use propTypes to indicate it is required
    log: React.PropTypes.object.isRequired
  },
  deleteThisLog() {
    Meteor.call("removeLog", this.props.log._id);
  }, 
  render() {
    return (
      <li>
        <button className="delete" onClick={this.deleteThisLog}>
                  &times;
        </button>
        <span className="text">{this.props.log.lang} - {this.props.log.count}</span>
      </li>
    );
  }
});
