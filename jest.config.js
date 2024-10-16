module.exports = {
	testTimeout: 10000,
	reporters: [
		'default'
	],
	watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
	moduleFileExtensions: ['js', 'json'],
	rootDir: __dirname,
	testMatch: ["<rootDir>/pages/uvue/list-x/list-x.test.js"],
	testPathIgnorePatterns: ['/node_modules/'],
	testEnvironmentOptions: {
		compile:true,
		h5: { // 为了节省测试时间，可以指定一个 H5 的 url 地址，若不指定，每次运行测试，会先 npm run dev:h5
			url: "http://192.168.31.184:5173",
			options: {
				headless: false // 配置是否显示 puppeteer 测试窗口
			}
		},
	}
}