const { getAccessToken, isAuthorized, getContact, getAccountInfo } = require('../auth/hubspotAuth');
const logger = require('../utils/logger'); // Add logger

const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://hs-app-lemon.vercel.app"
// const BASE_URL = "https://app.dataformatter.my.id"

// Utility function to log with portal ID and email
const logWithDetails = (level, message, req) => {
  const portalId = req.session.portalId || 'unknown';
  const email = req.session.email || 'unknown';
  logger.log({ level, message, portalId, email });
};

exports.install = (req, res) => {
  const authUrl = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${BASE_URL}/oauth-callback&scope=oauth`;
  res.redirect(authUrl);
  logWithDetails('info', 'Redirected user to HubSpot OAuth URL for installation', req);
};

exports.oauthCallback = async (req, res) => {
  const { exchangeForTokens } = require('../auth/hubspotAuth');
  if (req.query.code) {
    const authCodeProof = {
      grant_type: 'authorization_code',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: BASE_URL + '/oauth-callback',
      code: req.query.code
    };
    const token = await exchangeForTokens(req, authCodeProof);
    if (token.message) {
      logWithDetails('error', `Error during OAuth callback: ${token.message}`, req);
      return res.redirect(`/error?msg=${token.message}`);
    }
    logWithDetails('info', 'OAuth callback successful, redirecting to home', req);
    res.redirect(`https://app.hubxpert.com/thank-you`);
  } else {
    logWithDetails('warn', 'OAuth callback received without a code', req);
    res.redirect('/error?msg=No%20code%20provided');
  }
};

exports.home = async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hubxpert App</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f1f1f1;
        }
        header {
          background-color: #004080;
          color: white;
          text-align: center;
          padding: 20px 0;
        }
        header .logo {
          width: 200px;
          margin-bottom: 10px;
        }
        header h1 {
          margin: 0;
          font-size: 2em;
        }
        main {
          flex: 1;
          padding: 20px;
          text-align: center;
        }
        .description {
          max-width: 600px;
          margin: 0 auto;
        }
        .description h2 {
          font-size: 2em;
          color: #004080;
        }
        .description p {
          font-size: 1.2em;
          color: #333;
        }
        footer {
          background-color: #f1f1f1;
          text-align: center;
          padding: 10px 0;
        }
        footer p {
          margin: 0;
          color: #555;
        }
        footer a {
          color: #004080;
          text-decoration: none;
        }
        .success {
          background-color: #64bae2;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          margin-bottom: 20px;
        }
        .success h2 {
          color: #fff;
          margin-top: 0;
        }
        .success p {
          color: #fff;
        }
        .install-button {
          padding: 10px 20px;
          font-size: 20px;
          font-weight: bold;
          background-color: #f2750e;
          border: none;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          transition: transform 0.2s ease;
          text-decoration: none;
        }
        .install-button:hover {
          transform: scale(1.1);
        }
      </style>
    </head>
    <body>
      <header>
        <a href="https://www.hubxpert.com/"><img src="https://static.wixstatic.com/media/2369f3_e7a786f139044881883babb752b00212~mv2.png/v1/fill/w_388,h_154,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2369f3_e7a786f139044881883babb752b00212~mv2.png" alt="Hubxpert Logo" class="logo"></a>
        <h1>Data Formatter App By HubXpert</h1>
      </header>
      <main>
        <section class="description">
          <h2>About Our App</h2>
          <p>Welcome to the Hubxpert App, your go-to solution for seamless HubSpot integration and data formatting. Our app provides custom workflow actions to format data, making your HubSpot experience more efficient and effective.</p>
        </section>
  `);

  if (isAuthorized(req)) {
    const accessToken = await getAccessToken(req);
    const accInfo = await getAccountInfo(accessToken);
    res.write(`
        <section class="description success">
          <h2>🎉🥳SUCCESSFULLY INSTALLED on ${JSON.stringify(accInfo.portalId)}🥳🎉</h2>
          <h2>You can now use data formating actions in workflow..</h2>
        </section>
    `);
    logWithDetails('info', 'Displayed home page with account info and access token', req);
  } else {
    res.write(`
      <a href="/install" class="install-button">Click Here To Install</a>
    `);
    logWithDetails('info', 'Displayed home page with install link', req);
  }

  res.write(`
      </main>
      <footer>
        <p>&copy; 2024 <a href="https://www.hubxpert.com/">Hubxpert</a>. All rights reserved.</p>
      </footer>
    </body>
    </html>
  `);
  res.end();
};

exports.error = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(`
    <h4>Error: ${req.query.msg}</h4>
    <footer>
      <p>&copy; 2024 <a href="https://www.hubxpert.com/">Hubxpert</a>. All rights reserved.</p>
    </footer>
  `);
  res.end();
  logWithDetails('error', `Displayed error page: ${req.query.msg}`, req);
};
