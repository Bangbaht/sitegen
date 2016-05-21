import React from 'react';
import {routerShape} from 'react-router/lib/PropTypes';
import {Link} from '../lib';
import {Sticky} from './Sticky';
import {
  NavBar as NavBarBase,
  NavLink as NavLinkBase,
  NavBarWrapper
} from './NavBar.rcss';
import {HeadingLine} from './Site.rcss';

export function NavBar({children, ...props}) {
  return (
    <Sticky to="fixedTop">
      <NavBarRegular {...props}>
        {children}
      </NavBarRegular>
    </Sticky>
  );
}

function NavBarRegular({children, ...props}) {
  return (
    <NavBarBase {...props}>
      <NavBarWrapper>
        {props.sticky &&
          <HeadingLine
            inline small decorated
            style={{marginLeft: 10, marginRight: 10}}>
            SG
          </HeadingLine>}
        {children}
      </NavBarWrapper>
    </NavBarBase>
  );
}

export function NavLink(props) {
  return <Link {...props} Component={NavLinkBase} />;
}
