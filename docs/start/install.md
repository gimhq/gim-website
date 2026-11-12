# Install gim

All builds are early pre-releases, for testing. The newest one of each app is linked on the
[download page](https://g.im/download/).

## Android

Android 8.0 or later, arm64 or x86_64. Download the APK from
[gim-android releases](https://github.com/gimhq/gim-android/releases) and open it. The APK is
signed with a debug key, so Android asks you to allow installing apps from your browser or file
manager.

## macOS

macOS 15 or later, Apple silicon or Intel. Download the zip from
[gim-mac releases](https://github.com/gimhq/gim-mac/releases). The app is ad-hoc signed and not
notarized, so the first launch needs one extra step:

1. Unzip the download and move `GIM.app` to Applications.
2. Open it. When macOS says it cannot verify the app, close the dialog.
3. Open System Settings › Privacy & Security, scroll down and click **Open Anyway**.

Or clear the quarantine flag in Terminal:

```sh
xattr -dr com.apple.quarantine /Applications/GIM.app
```

## iOS and Windows

Not available yet. iOS needs distribution through the App Store or TestFlight; the Windows app is
in development.

## Command line

`gim` is a command-line client for scripts and testing, in
[gim-client-sdk](https://github.com/gimhq/gim-client-sdk/tree/main/apps/gim-cli). Build it from
source with a Rust toolchain and a C compiler:

```sh
git clone https://github.com/gimhq/gim-client-sdk.git
cd gim-client-sdk
cargo build --release -p gim-cli   # -> target/release/gim
```

Every command takes a profile directory (`--profile DIR` or `GIM_PROFILE`), which holds one device.
`register` creates it on the built-in hub:

```sh
gim --profile ~/.gim register alice "Alice"
gim --profile ~/.gim whoami
```

Never use one profile from two `gim` processes at once. `gim --help` lists every command.
