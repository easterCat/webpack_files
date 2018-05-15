/**
 * Created by EmmaWu on 2017/1/9.
 */

module.exports = {
    plugins: [
        require('postcss-smart-import')({ /* ...options */ }),
        require('precss')({ /* ...options */ }),
        require('autoprefixer')({ /* ...options */ })
    ]
};