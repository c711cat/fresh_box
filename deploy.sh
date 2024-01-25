#!/usr/bin/env sh

# 發生錯誤時執行終止指令
set -e

# 打包編譯
yarn build

# 移動到打包資料夾下，若有調整的話打包後的資料夾需調整
cd dist

git init
git add -A
git commit -m 'deploy'

# HTTPS 模式
git push -f https://github.com/c711cat/fresh_box.git master:gh-pages

cd -