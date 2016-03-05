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
  
  componentWillReceiveProps(nextProps) {
    this.setState({ imageLoaded : false });
  },
  
  onImageLoaded() {
    this.setState({ imageLoaded : true });
  },
  
  preloader() {
    return <CircularProgress  />
  },
  
  render() {
    return (
      <Card id={this.props.thread.no} className="threadCard">        
        <CardText className="title"><div dangerouslySetInnerHTML={{ __html: this.props.thread.sub }}/>
        </CardText>
      
        <CardMedia className="media">     
          <ImageLoader
              src={this.props.thumbnail} 
              wrapper={React.DOM.div}
              preloader={this.preloader}>
          </ImageLoader>
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
