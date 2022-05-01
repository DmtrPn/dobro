const {
    FuseBox,
    WebIndexPlugin,
} = require('fuse-box');
const fs = require('fs');

const getHtmlString = (isProduction, sprites) => `
<!-- index.html -->
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%238c86ff%22></rect><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2290%22>❤️</text></svg>" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />${isProduction ? `
        <!-- Yandex.Metrika counter -->
        <script type="text/javascript" >
           (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
           m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
           (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
           ym(88165950, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
           });
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/88165950" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <!-- /Yandex.Metrika counter -->`
        : ''}
        <link rel="stylesheet" href="/static/fonts.css?${Date.now()}"/>
        <link rel="stylesheet" href="/static/styles.css?${Date.now()}"/>
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="/static/app.js?${Date.now()}"></script>
        <div hidden>
            ${sprites}
        </div>
    </body>
</html>
`;

module.exports = async context => {
    const sprites = fs.readFileSync('../public/static/sprite.svg', 'utf8');

    const fuse = FuseBox.init({
        homeDir: 'src/',
        output: '../public/$name.js',
        plugins: [
            WebIndexPlugin({
                templateString : getHtmlString(process.env.NODE_ENV === 'production', sprites),
            }),
        ],
    });

    await fuse.run();
};
