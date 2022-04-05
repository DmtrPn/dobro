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
                templateString : getHtmlString(process.env.NODE_ENV === 'production'),
            }),
        ]
    });

    await fuse.run();
};



const getHtmlString = (isProduction) => `
<!-- index.html -->
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
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
    </body>
</html>
`;
