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
    return { imageLoaded: false, imageUrl : this.props.thumbnail };
  },
  
  componentWillReceiveProps(nextProps) {
    this.setState({ imageLoaded : false, imageUrl : nextProps.thumbnail });
  },
  
  onImageLoaded() {
    this.setState({ imageLoaded : true });
  },
  
  preloader() {
    return <CircularProgress  />
  },
  
  togglePreviewImage() {
    if(this.state.imageUrl === this.props.fullimage) {
      this.setState({ imageUrl : this.props.thumbnail });
    } else {
      this.setState({ imageUrl : this.props.fullimage });  
    }    
  },

  render() {
    return (
      <Card id={this.props.thread.no} className="threadCard">        
        <CardText className="title"><div dangerouslySetInnerHTML={{ __html: this.props.thread.sub }}/>
        </CardText>
      
        <CardMedia className="media">   
            <ImageLoader
                src={this.state.imageUrl} 
                wrapper={React.DOM.div}
                preloader={this.preloader}
                onClick={this.togglePreviewImage}>
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
