const { src } = require("fuse-box/sparky");

module.exports = async context => {
    await src('./*.ttf', { base: "./assets" })
        .dest('../public/static/fonts')
        .exec();
    await src('./*.css', { base: "./assets" })
        .dest('../public/static')
        .exec();
};
