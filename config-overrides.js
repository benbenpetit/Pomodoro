const path = require('path');

module.exports = function override(config, env) {
    config["resolve"] = {
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            views: path.resolve(__dirname, 'src/views/'),
        },
        extensions: ['.js']
    }

    return config;
}
