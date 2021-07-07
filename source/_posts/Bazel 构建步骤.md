---
title: Bazel 构建步骤
tags:
- iOS
- Bazel
categories:
- 构建工具
---

1. 根目录创建 `WORKSPACE` 文件，填写。
2. 项目目录创建 `BUILD` 文件，填写。
3. 根目录运行 `bazel build //xxx:xxx` 编译项目。
4. 使用 `Tusli` 创建 `Xcode` 工程。 https://tulsi.bazel.build/docs/gettingstarted.html
5. 自动打开，运行。

