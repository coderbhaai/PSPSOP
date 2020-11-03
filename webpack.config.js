const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = [{
    entry: {
        Index: [path.resolve('src', 'components', 'pages', 'Index.js')],
        FourOFour: [path.resolve('src', 'components', 'pages', 'FourOFour.js')],
        
        Register: [path.resolve('src', 'components', 'auth', 'Register.js')],
        Login: [path.resolve('src', 'components', 'auth', 'Login.js')],
        ForgotPassword: [path.resolve('src', 'components', 'auth', 'ForgotPassword.js')],
        ResetPassword: [path.resolve('src', 'components', 'auth', 'ResetPassword.js')],
        
        UserCosting: [path.resolve('src', 'components', 'user', 'UserCosting.js')],

    },
    output: {
        path: path.resolve(__dirname, 'src', 'static', 'public'),
        filename: 'js/[chunkhash].js',
        publicPath: '/public'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /static/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/transform-runtime']
                    }
                }
            }, 
            {
                test: /\.ejs$/,
                loader: 'raw-loader'
            }, 
            {
                test: /\.(css)/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '/public/css/'
                    }
                }, 'css-loader']  
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.wasm', '.mjs', '*']
    },
    optimization: {
        splitChunks: {
            automaticNameDelimiter: '.',
            cacheGroups: {
                react: {
                    chunks: 'initial',
                }
            }
        }
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ chunkFilename: 'css/[hash].css' }),
        new HtmlWebpackPlugin({ chunks: ['Index'], filename: '../views/pages/Index.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['FourOFour'], filename: '../views/pages/FourOFour.ejs', template: path.join('src', 'views', 'index.ejs') }),
        
        new HtmlWebpackPlugin({ chunks: ['Register'], filename: '../views/auth/Register.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['Login'], filename: '../views/auth/Login.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['ForgotPassword'], filename: '../views/auth/ForgotPassword.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['ResetPassword'], filename: '../views/auth/ResetPassword.ejs', template: path.join('src', 'views', 'index.ejs') }),
        
        new HtmlWebpackPlugin({ chunks: ['UserCosting'], filename: '../views/user/UserCosting.ejs', template: path.join('src', 'views', 'index.ejs') }),
    ]
}]

module.exports = config