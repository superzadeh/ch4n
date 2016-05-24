import React, { Component } from 'react';
import { mui } from 'material-ui';

const Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
};


export default class ImageLoader extends Component {

  constructor(props) {
    super(props);
    this.state = { status: this.props.src ? Status.LOADING : Status.PENDING };
  }

  componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? Status.LOADING : Status.PENDING,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.status === Status.LOADING && !this.img) {
      this.createLoader();
    }
  }

  componentWillUnmount() {
    this.destroyLoader();
  }

  getClassName() {
    let className = `imageloader ${this.state.status}`;
    if (this.props.className) className = `${className} ${this.props.className}`;
    return className;
  }

  createLoader() {
    this.destroyLoader();  // We can only have one loader at a time.

    this.img = new Image();
    this.img.onload = this.handleLoad.bind(this);
    this.img.onerror = this.handleError.bind(this);
    this.img.src = this.props.src;
  }

  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  }

  handleLoad(event) {
    this.destroyLoader();
    this.setState({ status: Status.LOADED });

    if (this.props.onLoad) this.props.onLoad(event);
  }

  handleError(error) {
    this.destroyLoader();
    this.setState({ status: Status.FAILED });

    if (this.props.onError) this.props.onError(error);
  }

  renderImg() {
    const {src, imgProps} = this.props;
    let props = { src };

    for (let k in imgProps) {
      if (imgProps.hasOwnProperty(k)) {
        props[k] = imgProps[k];
      }
    }

    return <img {...props} alt="ch4n"/>;
  }

  render() {
    let wrapperProps = {
      className: this.getClassName(),
    };

    if (this.props.onClick) {
      wrapperProps.onClick = this.props.onClick;
    }

    if (this.props.style) {
      wrapperProps.style = this.props.style;
    }
    let wrapperArgs = [wrapperProps];

    switch (this.state.status) {
      case Status.LOADED:
        wrapperArgs.push(this.renderImg());
        break;

      case Status.FAILED:
        if (this.props.children) wrapperArgs.push(this.props.children);
        break;

      default:
        if (this.props.preloader) wrapperArgs.push(this.props.preloader());
        break;
    }

    return this.props.wrapper(...wrapperArgs);
  }
};

ImageLoader.propTypes = {
  wrapper: React.PropTypes.func,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  preloader: React.PropTypes.func,
  src: React.PropTypes.string,
  onLoad: React.PropTypes.func,
  onError: React.PropTypes.func,
  imgProps: React.PropTypes.object
};
ImageLoader.defaultProps = {
  wrapper: React.DOM.span
};