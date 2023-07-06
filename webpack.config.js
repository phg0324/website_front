module.exports = {
    entry: {
        dev: "./src/index.tsx",
    },
    output: {
        filename: "./build/index.tsx",
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        loaders: [
            // Typescript
            { test: /\.tsx?$/, loader: "ts-loader" },
        ],
        rules:[
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
};
