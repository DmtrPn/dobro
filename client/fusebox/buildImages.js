const { src } = require("fuse-box/sparky");

module.exports = async context => {
    await src('./*.png', { base: "./assets" })
        .dest('../public/static/images')
        .exec();
};
