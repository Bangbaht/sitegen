import React from 'react';
import Meta from './meta';

export default function Site({meta, bundle, content, style}) {
  meta = meta || Meta.rewind();
  return (
    <html {...meta.htmlAttributes.toComponent()}>
      <head>
        <meta charSet="utf8" />
        {meta.meta.toComponent()}
        {style && <style dangerouslySetInnerHTML={{__html: style}} />}
        {meta.link.toComponent()}
        {bundle.css && <link rel="stylesheet" href={bundle.css} />}
        {meta.title.toComponent()}
      </head>
      <body>
        <div id="main" dangerouslySetInnerHTML={{__html: content}} />
        <script async src={bundle.js} />
      </body>
    </html>
  );
}

Site.defaultProps = {
  content: '',
  bundle: {
    js: null,
    css: null,
  }
};
