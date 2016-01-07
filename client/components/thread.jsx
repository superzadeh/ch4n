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
    Title: React.PropTypes.string,
    Text: React.PropTypes.string,
    ThreadImageUrl: React.PropTypes.string,
    ViewThreadHandler: React.PropTypes.func
  },
  getDefaultProps() {
    var defaultProps = {
      Title: "",
      ThreadImageUrl: "1.png",
      Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio."
    };
    return defaultProps;
  },
  componentWillMount() {
    this.setState({
      Title: "Thread n°" + this.props.Id
    })
  },
  render() {
    return (
      <Card id={this.props.Id} className="thread">
        <CardTitle><div dangerouslySetInnerHTML={{
          __html: this.props.Title
        }}/></CardTitle>
        <CardMedia style={{
          padding: "10px"
        }}>
          <img src={this.props.ThreadImageUrl}/>
        </CardMedia>
        <CardText>
          <div dangerouslySetInnerHTML={{
            __html: this.props.Text
          }}/></CardText>
        <CardActions>
          <RaisedButton label="View" onClick={this.props.ViewThreadHandler}/>
          <RaisedButton label="Post"/>
        </CardActions>
      </Card>
    );
  }
});
