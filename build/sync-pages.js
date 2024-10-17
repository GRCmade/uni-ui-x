#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const UIX_UVUE = "/Users/gaoruicheng/Documents/HBuilderProjects/uni-ui-x/pages";
const UIX_UNIAPP_VUE = "/Users/gaoruicheng/Documents/HBuilderProjects/uni-ui-x-uniapp/pages";
const UIX_UVUE_PAGE = "/Users/gaoruicheng/Documents/HBuilderProjects/uni-ui-x/pages.json";
const UIX_UNIAPP_VUE_PAGE = "/Users/gaoruicheng/Documents/HBuilderProjects/uni-ui-x-uniapp/pages.json";

// 递归创建目录
const mkdirRecursive = (dir) => {
  if (fs.existsSync(dir)) {
    return;
  }
  mkdirRecursive(path.dirname(dir));
  fs.mkdirSync(dir);
};

// 递归查找并处理文件
const processFilesRecursive = (sourceDir, targetDir) => {
  const items = fs.readdirSync(sourceDir);
  items.forEach(item => {
    const sourcePath = path.join(sourceDir, item);
    let targetPath = path.join(targetDir, item);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      mkdirRecursive(targetPath);
      processFilesRecursive(sourcePath, targetPath);
    } else {
      if (sourcePath.endsWith('.uvue')) {
        // 修改 .uvue 文件内容并改名为 .vue
        const content = fs.readFileSync(sourcePath, 'utf8');
        const modifiedContent = content.replace(/<script>/g, '<script lang="uts">');
        targetPath = targetPath.replace(/\.uvue$/, '.vue');
        fs.writeFileSync(targetPath, modifiedContent, 'utf8');
        // console.log(`已将 ${sourcePath} 文件中的 <script> 标签修改为 <script lang="uts"> 并保存到 ${targetPath}。`);
      } else {
        // 复制其它类型的文件
        fs.copyFileSync(sourcePath, targetPath);
        // console.log(`已将 ${sourcePath} 复制到 ${targetPath}`);
      }
    }
  });
};

// 删除目标目录中的内容（如果存在）
if (fs.existsSync(UIX_UNIAPP_VUE)) {
  fs.rmSync(UIX_UNIAPP_VUE, { recursive: true, force: true });
}

// 创建目标目录
mkdirRecursive(UIX_UNIAPP_VUE);

// 处理文件
processFilesRecursive(UIX_UVUE, UIX_UNIAPP_VUE);

console.log(`已将 ${UIX_UVUE} 中的所有文件处理并复制到 ${UIX_UNIAPP_VUE} 中。`);

// 复制 pages.json 文件
fs.copyFileSync(UIX_UVUE_PAGE, UIX_UNIAPP_VUE_PAGE);
console.log(`已将 ${UIX_UVUE_PAGE} 复制到 ${UIX_UNIAPP_VUE_PAGE}`);