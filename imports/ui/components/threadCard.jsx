import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import Styles from 'material-ui/lib/styles';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CircularProgress from 'material-ui/lib/circular-progress';
import Dialog from 'material-ui/lib/dialog';

ThreadCard = React.createClass({
  propTypes: {
    thread: React.PropTypes.object,
    viewThreadHandler: React.PropTypes.func
  },

  getInitialState() {
    return {
      imageLoaded: false,
      imageUrl: this.props.thumbnail,
      open: false
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ imageLoaded: false, imageUrl: nextProps.thumbnail });
  },

  onImageLoaded() {
    this.setState({ imageLoaded: true });
  },

  preloader() {
    return <CircularProgress  />
  },

  togglePreviewImage() {
    this.setState({ open: true });
  },

  handleClose() {
    this.setState({ open: false });
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

        <Card id={this.props.thread.no} className="card">
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
