import { Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withReport, hasReported } from 'meteor/nodepeep:report';
import { FormattedMessage, intlShape } from 'react-intl';

class Reporting extends Component {

  constructor() {
    super();
    this.report = this.report.bind(this);
    this.getActionClass = this.getActionClass.bind(this);
    // this.startLoading = this.startLoading.bind(this);
    // this.stopLoading = this.stopLoading.bind(this);
    this.state = {
      loading: false
    }
  }

  report(e) {
    e.preventDefault();

    const document = this.props.document;
    const collection = this.props.collection;
    const user = this.props.currentUser;

    if(!user){
      this.props.flash(this.context.intl.formatMessage({id: 'users.please_log_in_to_report'}));

    } else {
      const reportType = hasReported(user, document) ? "cancelReport" : "report";
      this.props.report({document, reportType, collection, currentUser: this.props.currentUser}).then(result => {

      });
    }
  }

  getActionClass() {
    const document = this.props.document;
    const user = this.props.currentUser;

    const isReported = hasReported(user, document);
    const actionsClass = classNames(
      'report',
      {reported: isReported}
    );

    return actionsClass;
  }

  render() {
    return (
      <div className={this.getActionClass()}>
        <span className="posts-stats-item" title="Report">
        <a className="report-button" onClick={this.report}>
          {this.state.loading ? <Components.Icon name="spinner" /> : <Components.Icon name="warning" /> }
          {this.props.document.reportBaseScore || 0} <span className="sr-only">Report</span>
        </a>
      </span>
      </div>
    )
  }

}

Reporting.propTypes = {
  document: PropTypes.object.isRequired, // the document to upvote
  collection: PropTypes.object.isRequired, // the collection containing the document
  report: PropTypes.func.isRequired, // mutate function with callback inside
  currentUser: PropTypes.object, // user might not be logged in, so don't make it required
};

Reporting.contextTypes = {
  intl: intlShape
};

registerComponent('Reporting', Reporting, withMessages, withReport);
