module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        proxy: {  
            '/api': {
                target: 'https://temp.c.fmujie.cn/api/',  
                ws: true,
                // secure: false,
                changOrigin: true,  //允许跨域
                pathRewrite: {
                    '^/api': '' 
                }
            }
        }
    }
}
