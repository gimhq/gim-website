# Account and devices

## Create an account

The app creates a root key on your device and shows your **recovery kit**: your account ID and
your recovery key, written together as one text. The recovery key is stored nowhere, so it is
shown once: save the kit (copy it, share it to a password manager, or save it as a file). The app
asks for the last four characters of the key to check that you kept it.

After that you can claim a username, which others use to find you. It is optional; your account
ID always works.

## Link another device

Linking needs a device that is already signed in.

1. On the new device, choose to link it to an existing account. It shows a QR code.
2. On the signed-in device, scan the QR code.
3. Both devices show a six-digit code. Check that they match and confirm on **both** devices.

The new device then joins your chats. A link request expires after 10 minutes; start again if it
does. If the codes do not match, reject: the new device is removed.

## Restore after losing every device

On a new device, choose to restore and paste your recovery kit (in any language; the app finds
the account ID and key in the text). You can remove your old devices at the same time; they can no
longer sign in.

Your blocked users and privacy settings come back from the keep server if it was on
([servers](../servers/overview.md)). Chats are not rejoined automatically: other members, or
another of your devices, add the restored device again.

## A new recovery key

If you lose the recovery key while a device is still signed in, create a new one in the app's
settings. The old key stops working.
