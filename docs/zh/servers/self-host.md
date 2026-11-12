# 自己部署服务器

服务端源码公开在 GitHub 上。

## Hub

[gim-hub](https://github.com/gimhq/gim-hub) 用 Rust 编写：客户端 API（REST 和 WebSocket）、Hub 之间的联邦以及多 Hub 接入。数据保存在数据目录下的 SQLite 里。用 Docker 运行：

```sh
git clone https://github.com/gimhq/gim-hub.git
cd gim-hub
docker build -t gim-hub .
docker run -d --name gim-hub -p 8080:8080 -v gim-hub-data:/data gim-hub
curl http://127.0.0.1:8080/healthz
```

x86_64 和 aarch64 的 Linux 构建在[发布页](https://github.com/gimhq/gim-hub/releases)上。配置、备份和联邦见 [operations.md](https://github.com/gimhq/gim-hub/blob/main/docs/operations.md)。

## Keep 服务器

[gim-keep](https://github.com/gimhq/gim-keep) 运行在 Bun 上，也可以跑在 Cloudflare Workers 上。它保存加密的设置数据，并为管理员提供举报收件箱。运行方法见它的 [README](https://github.com/gimhq/gim-keep#readme)，gim 相关部分见 [docs/modules/gim.md](https://github.com/gimhq/gim-keep/blob/main/docs/modules/gim.md)。

部署好之后，把应用指向你的服务器（[Hub 与 Keep 服务器](overview.md)）。
