const {
  RaisedButton,
  Card,
  CardHeader,
  CardText,
  CardMedia,
  CardTitle,
  CardActions,
  CircularProgress,
  Dialog, 
  Styles
} = mui;

ThreadCard = React.createClass({
  propTypes: {
    thread: React.PropTypes.object,
    viewThreadHandler: React.PropTypes.func
  },
  
  getInitialState() {
    return { 
      imageLoaded: false, 
      imageUrl : this.props.thumbnail,
      open : false 
    };
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
    this.setState({ open : true });
  },
  
  handleClose() {
    this.setState({open: false});
  },

  render() {
    const customContentStyle = {
      width: '100%',
      height: '450px'
    };

    return (
      <div>            
        <Dialog
          actions={[]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          contentClassName={"modal-image-content"}
          autoDetectWindowHeight={true}
          repositionOnUpdate={true}
          autoScrollBodyContent={true}>
            <ImageLoader
              src={this.props.fullimage} 
              wrapper={React.DOM.div}
              preloader={this.preloader}
              onClick={this.handleClose}>
            </ImageLoader>
        </Dialog>
        <Card id={this.props.thread.no} className="threadCard">        
          <CardText className="title"><div dangerouslySetInnerHTML={{ __html: this.props.thread.sub }}/>
          </CardText>
        
          <CardMedia className="media">   
              <ImageLoader
                  src={this.props.thumbnail} 
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
      </div>
    );
  }
});
