const {
  RaisedButton,
  Card,
  CardHeader,
  CardText,
  CardMedia,
  CardTitle,
  CardActions,
  Styles
} = mui;

Thread = React.createClass({
  propTypes: {
    Id: React.PropTypes.number,
    ViewThreadHandler: React.PropTypes.func
  },
  getInitialState() {
    return {Title: "Default thread title", ThreadImageUrl: "1.jpg", Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio."};
  },
  componentWillMount() {
    console.log("Thread with id " + this.props.Id + " component will mount");
    this.setState({
      Title: "Thread n°" + this.props.Id
    })
  },
  render() {
    return (
      <Card id={this.props.Id} className="thread">
        <CardTitle title={this.state.Title}/>
        <CardMedia style={{
          padding: "10px"
        }}>
          <img src={this.state.ThreadImageUrl}/>
        </CardMedia>
        <CardText>{this.state.Text}</CardText>
        <CardActions>
          <RaisedButton label="View" onClick={this.props.ViewThreadHandler}/>
          <RaisedButton label="Post"/>
        </CardActions>
      </Card>
    );
  }
});
