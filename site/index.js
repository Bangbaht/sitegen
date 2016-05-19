import './index.css';

import React from 'react';
import {GatewayDest, GatewayProvider} from 'react-gateway';
import {Meta} from '../';
import GitHubCorner from './GitHubCorner';
import Favicon from './favicon.ico';
import TouchIcon from './sitegen-icon.png';
import {
  Root, ContentWrapper,
  HeadingLine, SubHeadingLine,
  Section, SectionHeader,
  Par, CodeBlock, UIText,
  Heart
} from './index.component.css';
import {StickyNavBar, NavLink} from './NavBar';

const APPLE_MOBILE_WEB_APP_STATUS_BAR_STYLE = {
  name: 'apple-mobile-web-app-status-bar-style',
  content: 'black',
};

const APPLE_MOBILE_WEB_APP_TITLE = {
  name: 'apple-mobile-web-app-title',
  content: 'Sitegen',
};

const APPLE_MOBILE_WEB_APP_CAPABLE = {
  name: 'apple-mobile-web-app-capable',
  content: 'yes',
};

const VIEWPORT = {
  name: 'viewport',
  content: 'width=device-width, initial-scale=1, user-scalable=no',
};

const FAVICON = {
  rel: 'shortcut icon',
  href: Favicon,
};

const APPLE_TOUCH_ICON = {
  rel: 'apple-touch-icon',
  href: TouchIcon,
};

export default function Site({children}) {
  return (
    <GatewayProvider>
    <Root>
      <Meta
        titleTemplate="%s | Sitegen"
        title="Main"
        link={[
          FAVICON,
          APPLE_TOUCH_ICON,
        ]}
        meta={[
          VIEWPORT,
          APPLE_MOBILE_WEB_APP_CAPABLE,
          APPLE_MOBILE_WEB_APP_TITLE,
          APPLE_MOBILE_WEB_APP_STATUS_BAR_STYLE,
        ]}
        />

      <Section decorated noMargin>
        <GitHubCorner project="andreypopp/sitegen" />
        <ContentWrapper>
          <HeadingLine>Sitegen</HeadingLine>
          <SubHeadingLine>
            Static site generator
          </SubHeadingLine>
          <SubHeadingLine>
            based on React and Webpack
          </SubHeadingLine>
        </ContentWrapper>
      </Section>

      <StickyNavBar>
        <NavLink href="/">Overview</NavLink>
        <NavLink href="/tutorial">Tutorial</NavLink>
        <NavLink href="/docs">Docs</NavLink>
        <NavLink href="/community">Community</NavLink>
      </StickyNavBar>

      {children}

      <Section decorated noMargin center>
        <UIText small uppercase>
          Made with <Heart>❤</Heart> in Saint&ndash;Petersburg
        </UIText>
      </Section>
      <GatewayDest style={{width: '100%', position: 'fixed', top: 0}} name="fixedTop" />
    </Root>
    </GatewayProvider>
  );
}
