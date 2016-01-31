Log = React.createClass({
  propTypes: {
    // This component gets the Log to display through a React prop.
    // We can use propTypes to indicate it is required
    log: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>{this.props.log.lang} - {this.props.log.count}</li>
    );
  }
});
