import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
import { argv } from 'process';

let env = process.env['NODE_ENV'];
let isProduction =
    (env && env.match(/production/)) ||
    argv.reduce((prev, cur) => prev || cur === '--production', false);

let config: webpack.Configuration = {
    context: path.join(__dirname, 'src'),
    entry: {
        app: './main.ts'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', 'js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    compilerOptions: {
                        isolatedModules: true
                    }
                }
            },
            {
                test: /\.wgsl/,
                type: 'asset/source'
            }
        ]
    },
    node: false,
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: '*.html',
                    to: '[name][ext]'
                }
            ]
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(
                    isProduction ? 'production' : 'development'
                )
            }
        })
    ],
    optimization: {
        minimize: isProduction ? true : false
    },
    devtool: isProduction ? false : 'inline-source-map',
};

/**
 * Start Build
 */
const compiler: webpack.Compiler = webpack(config);

if (!argv.reduce((prev, cur) => prev || cur === '--watch', false)) {
    compiler.run((err, stats) => {
        if (err) return console.error(err);

        if (stats?.hasErrors()) {
            console.log(`❌  Error · project failed to compile:`);

            let statsJson = stats.toJson();
            for (let error of statsJson?.errors ?? []) {
                console.log(error.message);
            }
            return;
        }
        console.log(`✔️️  Success · project built at ${new Date().toLocaleTimeString()} in ${+stats?.endTime - +stats?.startTime} ms.`);
    });
} else {
    compiler.watch({}, (err, stats) => {
        if (err) {
            return console.error(err);
        }

        if (stats?.hasErrors()) {
            console.log(`❌  Error · project failed to compile:`);

            let statsJson = stats.toJson();
            for (let error of statsJson?.errors ?? []) {
                console.log(error.message);
            }
            console.log('\nWatching for changes..\n');

            return;
        }


        console.log(`✔️️  Success · project built at ${new Date().toLocaleTimeString()} in ${+stats?.endTime - +stats?.startTime} ms.`);
        console.log('\nWatching for changes..\n');
    });
}
