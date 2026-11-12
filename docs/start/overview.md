# What gim is

gim is an end-to-end encrypted instant messenger. It has apps for Android and macOS, and a
command-line client for scripts and testing ([install](install.md)).

## Encrypted on your device

Chats use MLS (RFC 9420). Messages, images and files are encrypted on the sender's device and
decrypted only by the members of the chat. Each media file gets its own random key, which travels
inside the encrypted message, never to a server.

## Your account is a key

Creating an account makes a root key on your device; your account ID is derived from it. No phone
number or email is asked for. A username (handle) is optional. Your recovery kit brings the account
back if you lose every device ([account and devices](account.md)).

## Hubs deliver, they do not read

Hubs are the servers that pass messages between devices. They hold ciphertext until your devices
fetch it. An account can be on several hubs, and hubs that federate let their users talk to each
other. The keep server stores only an encrypted backup of your privacy settings and the reports
you choose to send ([servers](../servers/overview.md)).
