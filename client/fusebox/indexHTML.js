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
        <!-- <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700|Roboto:100,300,400,500,700,900&display=swap" rel="stylesheet"> -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/static/styles.css?${Date.now()}"/>
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="/static/app.js?${Date.now()}"></script>
    </body>
</html>
`;
