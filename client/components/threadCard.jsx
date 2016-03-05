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
    thread: React.PropTypes.object,
    viewThreadHandler: React.PropTypes.func
  },
  
  getInitialState() {
    return {imageLoaded: false};
  },
  
  onImageLoaded() {
    this.setState({ imageLoaded : true });
  },
  
  render() {
    return (
      <Card id={this.props.thread.no} className="threadCard">        
        <CardText className="title"><div dangerouslySetInnerHTML={{ __html: this.props.thread.sub }}/>
        </CardText>
      
        <CardMedia className="media">     
          <div>
            <img src={this.props.thumbnail} onLoad={this.onImageLoaded} /> 
            { this.state.imageLoaded ? null : <CircularProgress  /> }
          </div>        
        </CardMedia>
        
        <CardText>
          <div className="content" dangerouslySetInnerHTML={{ __html: this.props.thread.com }}/>
        </CardText>
        
        <CardActions>
          <RaisedButton label="View" onClick={this.props.viewThreadHandler}/>
        </CardActions>        
      </Card>
    );
  }
});
