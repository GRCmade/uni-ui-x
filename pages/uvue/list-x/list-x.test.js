// uni-app自动化测试教程: uni-app自动化测试教程: https://uniapp.dcloud.net.cn/worktile/auto/hbuilderx-extension/

// describe('uni-list-item-x测试后', () => {

//     let page;
//     beforeAll(async () => {
//         page = await program.currentPage();
//         await page.waitFor(3000);
// 				const el = await page.$$('.uni-list-item');
// 				console.log("============================")
// 				console.log(JSON.stringify(el))
//     });

//     it('check page title', async () => {
//         const el = await page.$$('.uni-list-item');
//         const titleText = await el[0].text();
//         expect(titleText).toEqual('列表文字');
//     });
// });

describe('test Run Sequence', () => {
	beforeAll(async () => {
		console.log('1 - beforeAll');
	});
	afterAll(() => {
		console.log('1 - afterAll');
	});
	beforeEach(() => {
		console.log('1 - beforeEach');
	});
	afterEach(() => {
		console.log('1 - afterEach');
	});
	test('test', () => {
		console.log('1 - test')
	});
});