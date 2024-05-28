import nodeHtmlToImage from 'node-html-to-image';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const html = `
  <html>
  <head>
    <style>
      body {
        width: 500px;
        height: 500px;
        background: #FFD23D;
      }

      .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      h1 {
        color: black;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <h1>${ body.content }</h1>
    </div>
  </body>
  </html>
  `;

  try {
    const image = await nodeHtmlToImage({
      html,
      type: 'jpeg',
      width: 500,
      height: 500,
      quality: 80,
    });
    setHeader(event, 'Content-Type', `image/jpeg`);
    return image;
  } catch (error) {
    console.error('Error generating image:', error);
    return 'Error generating image';
  }
});
