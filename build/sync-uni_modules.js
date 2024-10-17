#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const UIX_MODULES = "/Users/gaoruicheng/Documents/HBuilderProjects/uni-ui-x/uni_modules";
const UIX_UNIAPP_MODULES = "/Users/gaoruicheng/Documents/HBuilderProjects/uni-ui-x-uniapp/uni_modules";

// 递归创建目录
const mkdirRecursive = (dir) => {
  if (fs.existsSync(dir)) {
    return;
  }
  mkdirRecursive(path.dirname(dir));
  fs.mkdirSync(dir);
};

// 递归查找并复制文件
const copyFilesRecursive = (sourceDir, targetDir) => {
  const items = fs.readdirSync(sourceDir);
  items.forEach(item => {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      mkdirRecursive(targetPath);
      copyFilesRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
      // console.log(`已将 ${sourcePath} 复制到 ${targetPath}`);
    }
  });
};

// 删除目标目录中的内容（如果存在）
if (fs.existsSync(UIX_UNIAPP_MODULES)) {
  fs.rmSync(UIX_UNIAPP_MODULES, { recursive: true, force: true });
}

// 创建目标目录
mkdirRecursive(UIX_UNIAPP_MODULES);

// 复制文件
copyFilesRecursive(UIX_MODULES, UIX_UNIAPP_MODULES);

console.log(`已将 ${UIX_MODULES} 中的所有文件复制到 ${UIX_UNIAPP_MODULES} 中。`);