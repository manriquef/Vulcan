import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { getSetting } from 'meteor/vulcan:core';
// import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
const Input = FRC.Input;

class ThumbnailURL extends Component {

  constructor(props) {
    super(props);
    this.clearThumbnail = this.clearThumbnail.bind(this);
    this.showInput = this.showInput.bind(this);
    this.state = {
      showInput: false
    };
  }

  clearThumbnail() {
    this.context.updateCurrentValues({thumbnailUrl: ""});
  }

  showInput() {
    this.setState({
      showInput: true
    });
  }

  renderThumbnail() {
    return (
      <div>
          <img
            className="embedly-thumbnail"
            src={this.props.value}
            />
          <a className="thumbnail-url-clear" onClick={this.clearThumbnail}><FormattedMessage id="posts.clear_thumbnail"/></a>
      </div>
    )
  }

  render() {

    const {name, /* value, */ label} = this.props;

    const inputType = this.state.showInput ? "text" : "hidden";

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{label}</label>
        <div className="col-sm-9">
          {this.props.value ? this.renderThumbnail() : null}
          <Input layout="elementOnly" name={name} type={inputType} value={this.props.value} />
          {!this.state.showInput ? <a className="thumbnail-show-input" onClick={this.showInput}><FormattedMessage id="posts.enter_thumbnail_url"/></a> : null}
        </div>
      </div>
    )
  }
}

ThumbnailURL.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string
}

ThumbnailURL.contextTypes = {
  addToPrefilledValues: PropTypes.func,
  updateCurrentValues: PropTypes.func,
  deleteValue: PropTypes.func
}

export default ThumbnailURL;
