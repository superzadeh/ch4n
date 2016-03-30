import React from 'react';
import { mui } from 'material-ui';

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

PostCard = React.createClass({
  propTypes: {
    post: React.PropTypes.object,
    viewpostHandler: React.PropTypes.func
  },

  getInitialState() {
    return {
      imageLoaded: false,
      imageUrl: this.props.thumbnail,
      open: false
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.isMounted()) {
      console.log(nextProps.post);
      this.setState({ imageLoaded: false, post: nextProps.post, imageUrl: nextProps.thumbnail });
    }
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

        <Card id={this.props.post.no} className="card">
          <CardMedia className="media">
            <ImageLoader
              src={this.props.thumbnail}
              wrapper={React.DOM.div}
              preloader={this.preloader}
              onClick={this.togglePreviewImage}>
            </ImageLoader>
          </CardMedia>

          <CardText>
            <div className="content" dangerouslySetInnerHTML={{ __html: this.props.post.com }}/>
          </CardText>
        </Card>
      </div>
    );
  }
});
