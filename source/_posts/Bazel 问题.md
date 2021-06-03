# Bazel 问题



### Proxy address 127.0.0.1:xxxx is not a valid URL

```
An error occurred during the fetch of repository 'build_bazel_rules_apple':
   Traceback (most recent call last):
	File "/private/var/tmp/_bazel_yanqizhao/041075cb14947c9864d661ff83fcfc83/external/bazel_tools/tools/build_defs/repo/http.bzl", line 111, column 45, in _http_archive_impl
		download_info = ctx.download_and_extract(
Error in download_and_extract: java.io.IOException: Error downloading [https://github.com/bazelbuild/rules_apple/archive/762e3270c1b45cdf6755ad494ce4069fc9243b9d.tar.gz] to /private/var/tmp/_bazel_yanqizhao/041075cb14947c9864d661ff83fcfc83/external/build_bazel_rules_apple/temp6297134644689352116/762e3270c1b45cdf6755ad494ce4069fc9243b9d.tar.gz: Proxy address 127.0.0.1:7890 is not a valid URL
```

修改代理为：https://127.0.0.1:xxxx

执行命令：`bazel clean --expunge`

参考：https://stackoverflow.com/a/39173790/9049347



### Error in int: invalid base-10 literal: "0-homebrew"

```
Traceback (most recent call last):
	File "/Users/yanqizhao/examples/tutorial/WORKSPACE", line 46, column 28, in <toplevel>
		java_appengine_repositories()
	File "/private/var/tmp/_bazel_yanqizhao/041075cb14947c9864d661ff83fcfc83/external/io_bazel_rules_appengine/appengine/java_appengine.bzl", line 321, column 35, in java_appengine_repositories
		bazel_version = tuple([int(n) for n in native.bazel_version.split(".")])
Error in int: invalid base-10 literal: "0-homebrew"
```

修改 `appengine` 使用的 `commit`

参考：https://github.com/bazelbuild/rules_appengine/issues/122