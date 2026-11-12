# Run your own servers

The server source code is public on GitHub.

## Hub

[gim-hub](https://github.com/gimhq/gim-hub) is written in Rust: the client API (REST and
WebSocket), federation between hubs and multi-homing. It keeps its data in SQLite under a data
directory. With Docker:

```sh
git clone https://github.com/gimhq/gim-hub.git
cd gim-hub
docker build -t gim-hub .
docker run -d --name gim-hub -p 8080:8080 -v gim-hub-data:/data gim-hub
curl http://127.0.0.1:8080/healthz
```

Linux builds for x86_64 and aarch64 are on the
[releases page](https://github.com/gimhq/gim-hub/releases). Configuration, the data directory,
backups and federation are in [operating a hub](/docs/hub/operations/); the admin API and UI in
[admin API](/docs/hub/admin/); waking phones in [push gateway](/docs/hub/push/).

## Keep server

[gim-keep](https://github.com/gimhq/gim-keep) runs on Bun, or on Cloudflare Workers. It stores the
sealed settings slots and gives moderators an inbox for reports. Its
[README](https://github.com/gimhq/gim-keep#readme) covers running it, and
[docs/modules/gim.md](https://github.com/gimhq/gim-keep/blob/main/docs/modules/gim.md) the gim part.

Then point the apps at your servers ([hubs and the keep server](overview.md)).
