# 安装 gim

目前都是早期预发布版本，用于测试。每个应用的最新版本都列在[下载页](https://g.im/zh/download/)上。

## Android

Android 8.0 及以上，arm64 或 x86_64。从 [gim-android 发布页](https://github.com/gimhq/gim-android/releases)下载 APK 并打开。APK 使用调试密钥签名，Android 会提示你允许浏览器或文件管理器安装应用。

## macOS

macOS 15 及以上，Apple 芯片或 Intel。从 [gim-mac 发布页](https://github.com/gimhq/gim-mac/releases)下载 zip。应用使用临时（ad-hoc）签名，未经公证，所以首次打开需要多一步：

1. 解压下载的文件，把 `GIM.app` 移到“应用程序”文件夹。
2. 打开它。macOS 提示无法验证该应用时，关闭对话框。
3. 打开“系统设置 › 隐私与安全性”，向下滚动，点击“**仍要打开**”。

也可以在终端里清除隔离标记：

```sh
xattr -dr com.apple.quarantine /Applications/GIM.app
```

## iOS 和 Windows

暂未提供。iOS 需要通过 App Store 或 TestFlight 分发；Windows 应用正在开发中。

## 命令行

`gim` 是用于脚本和测试的命令行客户端，位于 [gim-client-sdk](https://github.com/gimhq/gim-client-sdk/tree/main/apps/gim-cli)。需要 Rust 工具链和 C 编译器，从源码构建：

```sh
git clone https://github.com/gimhq/gim-client-sdk.git
cd gim-client-sdk
cargo build --release -p gim-cli   # -> target/release/gim
```

每条命令都需要一个配置目录（`--profile DIR` 或 `GIM_PROFILE`），一个配置目录就是一台设备。`register` 会在内置 Hub 上创建它：

```sh
gim --profile ~/.gim register alice "Alice"
gim --profile ~/.gim whoami
```

不要让两个 `gim` 进程同时使用同一个配置目录。`gim --help` 列出全部命令。
