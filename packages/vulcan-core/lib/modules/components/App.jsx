import { Components, registerComponent, getSetting, Strings } from 'meteor/vulcan:lib';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, intlShape} from 'react-intl';
import withCurrentUser from '../containers/withCurrentUser.js';


class App extends Component {

  getLocale() {
    return getSetting("locale", "en");
  }

  getChildContext() {

    const messages = Strings[this.getLocale()] || {};
    const intlProvider = new IntlProvider({locale: this.getLocale()}, messages);

    const {intl} = intlProvider.getChildContext();

    return {
      intl: intl
    };
  }

  render() {
    return (
      <IntlProvider locale={this.getLocale()} messages={Strings[this.getLocale()]}>
        {
          this.props.currentUserLoading ?
            <Components.Loading /> :
            <Components.Layout>{this.props.children}</Components.Layout>
        }
      </IntlProvider>
    )
  }

}

App.propTypes = {
  currentUserLoading: PropTypes.bool,
}

App.childContextTypes = {
  intl: intlShape,
}

App.displayName = 'App';

registerComponent('App', App, withCurrentUser);

export default App;
