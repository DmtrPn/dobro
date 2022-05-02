const { src } = require('fuse-box/sparky');

module.exports = async context_ => {
    await src('./')
        .clean('../public/')
        .exec();
};
