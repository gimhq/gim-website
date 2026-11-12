# Hubs and the keep server

The apps start with two built-in servers, `hub.g.im` and `keep.g.im`. Both can be changed.

## Hubs

A hub delivers messages and files between devices. It sees ciphertext only. A chat is created on
your hub, which owns it; members can be on other hubs when the hubs federate.

An account can be listed on several hubs. While sync runs, your devices follow every hub; when one
is down, messages keep arriving through the others, each shown once. You can add or remove hubs
and pick the one that sends first in the app's server settings.

Because your hubs all carry the same messages, a hub going down does not cut you off: you keep
receiving through the others, and sending moves to the next hub in your list. One limit: a chat is
run by the hub it was created on, so while that hub is down, that chat waits for it to come back;
your other chats carry on.

Your account ID comes from your root key, not from a hub, and the list of your hubs is signed with
that key, which no hub ever holds. To move to another hub, add it and make it the one you send
through first; the hub you signed up on stays in the list as a secondary one. A username belongs
to one hub, so claim it again on the new hub if you want one there.

To use another hub from the start, change the server field before you create or restore the
account (Android), or pass `--server URL` to `gim register` (command line).

## The keep server

The keep server stores two things, and nothing else:

- **An encrypted backup of your privacy settings**, including who you blocked. It is sealed with a
  key derived from your root key, so the server cannot read it. Restoring your account brings it
  back. Per-chat settings such as mute, pin and archive are not backed up.
- **Reports you choose to send.** A report names the user and a reason, and carries the messages
  you pick, in plain text, to the server's moderators: chats are end-to-end encrypted, so what you
  pick is all they see.

There is no account on the keep server: every request is signed with your root key. Without a keep
server everything works except backup and reports. Change it or turn it off in the app's settings
(Android: Settings › Advanced › Keep server), or with `--keep-server URL` / `--no-keep` on the
command line.

To run your own hub or keep server, see [self-hosting](self-host.md).
