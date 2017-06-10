/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router'

import {
  fontFamilyBase,
  fontSizeBase,
  lineHeightBase,
  fontWeightBase,
  navbarHeight,
  navbarPaddingHorizontal,
  navbarPaddingVertical,
  screenXsMin,
  lightBlue,
  green,
  yellow,
  red,
  aqua,
} from '../../styles/variables';

const NavLabel = styled.div`
  /* shared */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: ${fontFamilyBase};
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */

  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  display: inline;
  padding: .2em .6em .3em .6em;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
  float: left!important;
  color: #fff;

  /* ----- color ----- */
  background-color: ${(props) => {
    switch (props.type) {
      case 'primary':
        return lightBlue;
      case 'success':
        return green;
      case 'danger':
        return red;
      case 'warning':
        return yellow;
      case 'information':
        return aqua;
      default:
        return lightBlue;
    }
  }};

  /* ----- collapse ----- */
  ${props => props.collapse && `
    display: ${props.hover ? 'block' : 'none'};
    float: right;
  `}
`;

const imageSize = `${Math.floor(parseInt(navbarHeight, 10) / 2)}px`;
const imageMarginTop = `-${Math.ceil(
  ((parseInt(imageSize, 10) +
  parseInt(navbarPaddingHorizontal, 10) +
  parseInt(navbarPaddingVertical, 10)) -
  parseInt(navbarHeight, 10)) / 2)}px`;
const imageMarginBottom = `-${Math.floor(
  ((parseInt(imageSize, 10) +
  parseInt(navbarPaddingHorizontal, 10) +
  parseInt(navbarPaddingVertical, 10)) -
  parseInt(navbarHeight, 10)) / 2)}px`;

const StyledSpan = styled.span`
  @media (max-width: ${screenXsMin}) {
    display: none;
  }
`;

const StyledIcon = styled.i`
  color: inherit;
  box-sizing: border-box;
  float: left;
  border: 0;
  vertical-align: top;
  border-radius: 50%;
  margin-right: 10px;
  max-width: none;
  font-size: 28px;
  margin-top: -4px;

  &:hover {
    color: inherit;
  }

  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
`;

const StyledImage = styled.img`
  color: inherit;
  box-sizing: border-box;
  float: left;
  border: 0;
  vertical-align: middle;
  width: ${imageSize};
  height: ${imageSize};
  border-radius: 50%;
  margin-right: 10px;
  margin-top: ${imageMarginTop};
  margin-bottom: ${imageMarginBottom};
  max-width: none;

  &:hover {
    color: inherit;
  }

  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
`;

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
  height: 100%;
  color: inherit;
  display: block;
  padding: ${navbarPaddingVertical} ${navbarPaddingHorizontal};
  position: relative;
  background-color: transparent;

  &:hover {
    color: inherit;
    text-decoration: none !important;
  }

  @media (max-width: ${screenXsMin}) {
    padding: ${navbarPaddingVertical} 5px;
  }
`;

const StyledItem = styled.li`
  /* shared */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: ${fontFamilyBase};
  font-weight: ${fontWeightBase};
  font-size: ${fontSizeBase};
  line-height: ${lineHeightBase};
  box-sizing: border-box;
  height: 50px;
  float: left;
  display: block;
  background-color: transparent;
  background-image: none;
  border: none;
  outline: none;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  &:focus, &:active {
    background: transparent;
    outline: none;
  }

  /* theme */
  color: ${props => props.theme.navbarFontColor || '#fff'};
  border-left: ${props => props.theme.navbarItemBorder || 'none'};
  &:hover {
    color: ${props => props.theme.navbarHoverColor || '#fff'};
    background-color: ${props => props.theme.logoBgColor || 'transparent'};
  }
`;

const MsgSpan = styled.span`
  position: absolute;
  right: 0px;
  margin-top: -7px;
  float: right;

`;

const displayImage = (src, icon) => {
  if (src) {
    return <StyledImage src={src} />;
  } else if (icon) {
    return <StyledIcon className={icon} />;
  }
  return null;
};

const renderLabels = (labels) => (
  labels.map((l) => {
    if (l.key && l.type && l.text) {
      if (l.key === 1) {
        return (<NavLabel
          key={l.key.toString()}
          type={l.type}
        >
          {l.text}
        </NavLabel>);
      } else {
        return (<NavLabel
          key={l.key.toString()}
          type={l.type}
        >
          {l.text}
        </NavLabel>);
      }
    }
    return null;
  })
);

const NavItem = ({ title, onClick, href, image, iconClass, labels }) => (
  <StyledItem>
    {onClick &&
      <StyledLink onClick={onClick} href={null}>
        {displayImage(image, iconClass)}
        <MsgSpan>
          {(labels ? renderLabels(labels) : null )}
        </MsgSpan>
        <StyledSpan>{title}</StyledSpan>
      </StyledLink>
    }
    {(!onClick && href) &&
      <StyledLink href={href}>
        <MsgSpan>
          {(labels ? renderLabels(labels) : null )}
        </MsgSpan>
        {displayImage(image, iconClass)}
        <StyledSpan>{title}</StyledSpan>
      </StyledLink>
    }
  </StyledItem>
);

NavItem.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
  image: PropTypes.string,
  iconClass: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.object),
};

export default NavItem;
