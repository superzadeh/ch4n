const {
  RaisedButton,
  Card,
  CardHeader,
  CardText,
  CardMedia,
  CardTitle,
  CardActions,
  CircularProgress, 
  Styles
} = mui;

ThreadCard = React.createClass({
  propTypes: {
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    threadImageUrl: React.PropTypes.string,
    viewThreadHandler: React.PropTypes.func
  },
  
  getInitialState() {
    return {imageLoaded: false};
  },
  
  getDefaultProps() {
    var defaultProps = {
      tryitle: "",
      threadImageUrl: "1.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio."
    };
    
    return defaultProps;
  },
  
  onImageLoaded() {
    this.setState({ imageLoaded : true });
  },
  
  render() {
    return (
      <Card id={this.props.id} className="thread">        
        <CardText className="title"><div dangerouslySetInnerHTML={{ __html: this.props.title }}/>
        </CardText>
      
        <CardMedia className="media">     
          <div>
            <img src={this.props.threadImageUrl} onLoad={this.onImageLoaded} /> 
            { this.state.imageLoaded ? null : <CircularProgress  /> }
          </div>        
        </CardMedia>
        
        <CardText>
          <div className="content" dangerouslySetInnerHTML={{ __html: this.props.text }}/>
        </CardText>
        
        <CardActions>
          <RaisedButton label="View" onClick={this.props.viewThreadHandler}/>
        </CardActions>        
      </Card>
    );
  }
});
