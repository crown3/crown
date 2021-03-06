---
sidebar: auto
---

# 更新记录

## V2.0.0

### 新增功能

- 新增对最近关闭过 `标签页` 页面进行查找, 筛选 `(默认关闭, 需要授权开启)`
- 对各种搜索子项目启用快捷键设置, 放弃了原来根据 `tab` 键来切换搜索栏目的交互方式
- **新增默认搜索设置**, 对于部分搜索栏目可以设置其是否出现在默认搜索结果中
- 搜索时, 可以 **同时搜索多个子项目**, 并使用多个单词来对结果进行筛选
- 新增插件设置页面
- 新增插件在网页中的弹出显示以及相关功能支持
- 新增插件在搜索栏中的简化支持 `(由于 chrome 默认显示数目限制, 简化筛选结果)`
- 重新设计了相关 UI 样式
- 对 **中英** 双语言的支持

### 代码优化

- 重新设计了底层代码, 使其更方便日后对其他功能的增加以及扩展
- 搜索过程中使用了并发执行来加快处理速度
- 使用 `stylus` 来替代原来使用的 `sass` css处理器

## V1.2.0 以及之前版本

::: tip
`V1.2.0`是写这个插件时的第一个完整版本, 只是简单对的自己需要的功能 (`书签` && `标签页` 的搜索以及筛选结果) 做了一次简单开发以及相关BUG的修改, 故之前的相关提交记录统一合并在这里记录
:::

### 新增功能

- 对 Chrome `书签` 进行查找并筛选结果
- 对 Chrome `标签页` 进行查找并筛选结果
- 筛选结果 (只支持单个单词)
- 使用 `tab` 键来进行 `书签` 和 `标签页` 的搜索切换
- 只能在弹出框中使用该插件
