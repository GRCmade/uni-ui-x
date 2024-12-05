const fs = require('fs');
const path = require('path');

/**
 * 递归遍历文件夹并替换 .nvue 文件扩展名为 .vue
 * @param {string} dir - 文件夹路径
 */
function replaceNvueToVue(dir) {
  // 读取文件夹内容
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 如果是文件夹，递归调用
      replaceNvueToVue(filePath);
    } else if (stat.isFile() && path.extname(file) === '.vue') {
      // 如果是 .vue 文件，替换为 .vue
      const newFilePath = path.join(dir, path.basename(file, '.vue') + '.uvue');
      fs.renameSync(filePath, newFilePath);
      console.log(`Renamed: ${filePath} -> ${newFilePath}`);
    }
  });
}

// 替换路径为你需要操作的文件夹路径
const targetDir = path.resolve(__dirname, '/Users/gaoruicheng/Documents/DcloudProject/uni-ui-x/pages'); // 替换为目标文件夹路径

try {
  replaceNvueToVue(targetDir);
  console.log('All .vue files have been renamed to .vue!');
} catch (error) {
  console.error('Error:', error.message);
}