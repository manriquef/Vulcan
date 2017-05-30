/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Navbar from './Navbar/Navbar';
import Logo from './Navbar/Logo';
import UserMenu from './Navbar/UserMenu';
import NavItem from './Navbar/NavItem';
import SearchForm, { Components } from 'meteor/vulcan:core';

import {
  fontFamilyBase,
  fontSizeBase,
  fontWeightBase,
  lineHeightBase,
} from './../styles/variables';

const StyledHeader = styled.header`
  /* clearfix */
  &:before, &:after {
    display: table;
    content: " ";
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  &:after {
    clear: both;
  }

  position: ${props => (props.fixed ? 'fixed' : 'relative')};
  width: ${props => (props.boxed ? '1024px' : '100%')};
  max-height: 100px;
  z-index: 1030;

  /* theme */
  ${props => props.theme.headerBoxShadow && `
    -webkit-box-shadow: ${props.theme.headerBoxShadow};
    box-shadow: ${props.theme.headerBoxShadow};
  `}
`;

const Header = props => (
  <StyledHeader fixed={props.fixed} >
    <Logo
      collapse={props.sidebarCollapse}
      sidebarMini={props.sidebarMini}
      onClick={props.logoOnClick}
      href={props.logoHref}
      logoLg={props.logoLg}
      logoSm={props.logoSm}
    />
    <Navbar
      toggle={props.sidebarToggle}
      collapse={props.sidebarCollapse}
      sidebarMini={props.sidebarMini}
    >
      
      {props.children}
    </Navbar>
  </StyledHeader>
);

Header.propTypes = {
  children: PropTypes.node,
  fixed: PropTypes.bool,
  logoOnClick: PropTypes.func,
  logoHref: PropTypes.string,
  logoLg: PropTypes.element,
  logoSm: PropTypes.element,
  sidebarMini: PropTypes.bool,
  sidebarCollapse: PropTypes.bool,
  sidebarToggle: PropTypes.func.isRequired,
};

Header.defaultProps = {
  fixed: false,
  sidebarMini: false,
  sidebarCollapse: false,
  logoLg: <span><b>nodepeep</b></span>,
  logoSm: <span><b>np</b></span>,
};

Header.UserMenu = UserMenu;
Header.Item = NavItem;

export default Header;
