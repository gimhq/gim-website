import type { Copy } from './types'

export const zh: Copy = {
  label: '简体中文',
  meta: {
    htmlLang: 'zh-CN',
    title: 'gim：端到端加密的即时通讯',
    description: 'gim 是端到端加密的即时通讯。Hub 负责投递消息，但读不到内容；你的账号是一把由你掌握的密钥。',
    downloadTitle: '下载 gim',
    downloadDescription: 'gim 的 Android、macOS 和命令行客户端。',
  },
  nav: {
    home: 'gim 首页',
    download: '下载',
    github: 'GitHub',
    themeLabel: '主题',
    themeAuto: '跟随系统',
    themeLight: '浅色',
    themeDark: '深色',
    langLabel: '语言',
  },
  hero: {
    eyebrow: '端到端加密的即时通讯',
    title: '只有聊天里的人，才能读到消息',
    sub: 'gim 在你的设备上加密每一条消息和每一个文件，然后才发出。负责投递的服务器读不到内容；你的账号是一把由你掌握的密钥，而不是手机号。',
    cta: '下载',
    source: '在 GitHub 查看源码',
  },
  diagram: {
    label: '一条消息经过 Hub 的过程',
    sender: '你的设备',
    hub: 'Hub',
    receiver: '对方的设备',
    message: '晚上八点见？',
    cipher: '密文',
    caption: '在你的设备上加密，在对方的设备上解密。Hub 只负责转交。',
  },
  features: {
    title: 'gim 如何工作',
    sub: '几个核心设计，每一条都能在代码里找到。',
    items: [
      {
        icon: 'lock',
        title: '端到端加密',
        body: '聊天使用 MLS（RFC 9420）。消息、图片和文件在发送方设备上加密，只有聊天成员能解密。',
      },
      {
        icon: 'key',
        title: '账号就是密钥',
        body: '创建账号时，设备上会生成一把根密钥，账号 ID 由它派生。不需要手机号，也不需要邮箱。',
      },
      {
        icon: 'life-buoy',
        title: '恢复包',
        body: '账号 ID 和恢复密钥一起保存一次。即使所有设备都丢了，也能用恢复包在新设备上找回账号。',
      },
      {
        icon: 'server',
        title: 'Hub 只投递，不读取',
        body: 'Hub 是在设备之间传递消息的服务器。它经手的只有密文，看不到你写了什么。',
      },
      {
        icon: 'network',
        title: '不止一个 Hub',
        body: '一个账号可以同时使用多个 Hub。其中一个宕机时，消息仍会从其他 Hub 送达。互相联邦的 Hub，其用户之间也能互相聊天。',
      },
      {
        icon: 'smartphone',
        title: '多设备',
        body: '添加手机或电脑时，扫描二维码，再确认两块屏幕上的六位数字一致即可。',
      },
    ],
  },
  servers: {
    title: '内置服务器，可以替换',
    sub: '应用默认使用这两台服务器。两者都可以在应用里更改，Keep 服务器也可以关闭。',
    hub: {
      name: 'Hub',
      body: '在设备之间投递消息和文件，全程端到端加密。',
    },
    keep: {
      name: 'Keep 服务器',
      body: '只保存两样东西：隐私设置（包括屏蔽名单）的加密备份，用根密钥派生的密钥封存；以及你主动提交的举报。举报会以明文附上你选中的消息，供管理员查看。',
    },
  },
  selfHost: {
    title: '自己部署',
    sub: '服务端源码公开在 GitHub 上。',
    hub: 'Hub，Rust 编写：客户端 API、Hub 之间的联邦和多 Hub 接入。提供 Linux 构建和 Dockerfile。',
    keep: 'Keep 服务器，运行在 Bun 上：加密设置存储和管理员的举报收件箱。',
    repo: '代码仓库',
  },
  download: {
    title: '下载 gim',
    sub: '目前都是早期预发布版本，用于测试。链接指向每个应用的最新版本。',
    get: '下载',
    releases: '全部版本',
    released: '发布于',
    version: '版本',
    size: '大小',
    sha256: 'SHA-256',
    unavailable: '暂时无法获取最新版本，请到发布页面选择。',
    soon: '即将推出',
    source: '源码：',
    platforms: {
      android: {
        name: 'Android',
        req: 'Android 8.0 及以上 · arm64 与 x86_64',
        note: '使用调试密钥签名，用于在设备上测试。Android 提示时，允许浏览器或文件管理器安装应用。',
      },
      macos: {
        name: 'macOS',
        req: 'macOS 15 及以上 · Apple 芯片与 Intel',
        note: '使用临时（ad-hoc）签名，未经公证。首次打开：',
        steps: [
          '解压下载的文件，把 GIM.app 移到“应用程序”文件夹。',
          '打开它。macOS 提示无法验证该应用时，关闭对话框。',
          '打开“系统设置 › 隐私与安全性”，向下滚动，点击“仍要打开”。',
        ],
        terminal: '也可以在终端里清除隔离标记：',
      },
      ios: {
        name: 'iOS',
        req: '',
        note: '需要通过 App Store 或 TestFlight 分发，目前尚未开通。',
      },
      windows: {
        name: 'Windows',
        req: '',
        note: 'Windows 应用正在开发中。',
      },
      cli: {
        name: '命令行',
        req: 'Linux · 从源码构建',
        note: 'gim 是用于脚本和测试的命令行客户端，位于 gim-client-sdk。需要 Rust 工具链和 C 编译器：',
        usage: '每条命令都需要一个配置目录；register 会在 hub.g.im 上创建它：',
      },
    },
  },
  footer: {
    org: 'GitHub',
    tagline: '端到端加密的即时通讯',
  },
}
