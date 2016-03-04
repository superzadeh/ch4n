Comment  = React.createClass({
  
  getInitialState() {
    return {
      open: false,
    };
  },
  
  handleTouchTap(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  },

  handleRequestClose() {
    this.setState({
      open: false,
    });
  },

  render() {
    return (
       <div>
          <RaisedButton
              onTouchTap={this.handleTouchTap}
              label="Click me"
            />
          <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}>
              <div style={styles.popover}>
                <span>Wow much content</span>
              </div>
          </Popover>
       </div>
    );
  }
});