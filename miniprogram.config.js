module.exports = {
    origin: 'https://test.miniprogram.com',
    entry: '/',
    router: {"app":["/"]},
    redirect: {
        notFound: 'app',
        accessDenied: 'app',
    },
    generate: {
        app: 'default',
        appWxss: 'default',
        autoBuildNpm: 'npm',
    },
    app: {
        backgroundTextStyle: 'dark',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: 'kbone',
    },
    appExtraConfig: {
        sitemapLocation: 'sitemap.json',
    },
    global: {
        share: true,
        windowScroll: false,
        backgroundColor: '#F7F7F7',
        rem: false,
    },
    pages: {},
    optimization: {
		domSubTreeLevel: 10,

		elementMultiplexing: true,
		textMultiplexing: true,
		commentMultiplexing: true,
		domExtendMultiplexing: true,

		styleValueReduce: 5000,
		attrValueReduce: 5000,
	},
    projectConfig: {
        appid: 'wx078f615f998073aa',
        projectname: 'hpvue',
    },
    packageConfig: {
        name: 'hpvue',
    },
    // vue-cli 相关配置
    vue: {
        entryFileName: 'main.mp.js',
        cdnPath: '/',
        cdnLimit: 10240,
    },
}
