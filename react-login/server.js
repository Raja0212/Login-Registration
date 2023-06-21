import express from 'express';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import App from './src/App';

const app = express();
const port = 3000;

app.use(express.static('build'));

app.get('*', (req, res) => {
  const context = {};

  const appMarkup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR React App</title>
        </head>
        <body>
          <div id="root">${appMarkup}</div>
          <script src="/static/js/bundle.js"></script>
        </body>
      </html>
    `);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
