// This is the configuration file for babel
/* eslint-env node */
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current"
                }
            }
        ],
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-async-to-generator",
	"@babel/plugin-proposal-object-rest-spread"
    ]
};
