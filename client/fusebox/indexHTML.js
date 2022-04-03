const {
    FuseBox,
    WebIndexPlugin,
} = require('fuse-box');

module.exports = async context => {
    const fuse = FuseBox.init({
        homeDir: 'src/',
        output: '../public/$name.js',
        plugins: [
            WebIndexPlugin({
                templateString : getHtmlString(),
            }),
        ]
    });

    await fuse.run();
};



const getHtmlString = () => `
<!-- index.html -->
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="/static/fonts.css?${Date.now()}"/>
        <link rel="stylesheet" href="/static/styles.css?${Date.now()}"/>
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="/static/app.js?${Date.now()}"></script>
    </body>
</html>
`;
