const { src } = require('fuse-box/sparky');

module.exports = async context_ => {
    await src('./*.png', { base: './assets' })
        .dest('../public/static/images')
        .exec();
};
