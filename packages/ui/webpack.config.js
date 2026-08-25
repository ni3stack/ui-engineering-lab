const path = require ("path");

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: {
            type: "commonjs2"
        },
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"] 
    },
    module: {
        rules : [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                loader: "ts-loader",
                    options: {
                        configFile: path.resolve(__dirname, "tsconfig.json")
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]

            }
        ]
    },
    externals: {
        react: "react",
        "react-dom": "react-dom"
    }

}
