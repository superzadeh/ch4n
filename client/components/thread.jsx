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
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    threadImageUrl: React.PropTypes.string,
    viewThreadHandler: React.PropTypes.func
  },
  getDefaultProps() {
    var defaultProps = {
      tryitle: "",
      threadImageUrl: "1.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio."
    };
    return defaultProps;
  },
  render() {
    return (
      <Card id={this.props.id} className="thread">
        <CardText><div dangerouslySetInnerHTML={{
        __html: this.props.title
      }}/></CardText>
        <CardMedia style={{
          padding: "10px"
        }}>
          <img src={this.props.threadImageUrl} alt="Loading..."/>
        </CardMedia>
        <CardText>
          <div dangerouslySetInnerHTML={{
            __html: this.props.text
          }}/></CardText>
        <CardActions>
          <RaisedButton label="View" onClick={this.props.viewThreadHandler}/>
          <RaisedButton label="Post"/>
        </CardActions>
      </Card>
    );
  }
});
