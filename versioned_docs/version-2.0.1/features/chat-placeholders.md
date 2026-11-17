---
id: chat-placeholders
title: Chat, Formatting & Placeholders
sidebar_position: 3
sidebar_label: Chat & Formatting
description: Adventure Component utilities, token replacement, MessageUtils, and localization in message.json.
---

# Chat, Formatting & Placeholders

QUIPT centralizes in-game chat formatting, localization strings, and runtime variable replacement through `MessageUtils` and `Placeholder`.

## Message Registration & Persistence (`message.json`)

Messages can be registered at runtime and are automatically saved to `quipt/data/message.json`, allowing server operators to customize prefixes, colors, and phrasing.

```java
import live.qsmc.quipt.minecraft.utils.chat.MessageUtils;
import net.kyori.adventure.text.format.NamedTextColor;
import static net.kyori.adventure.text.Component.text;

// Register a default message if not present
MessageUtils.register(
    "welcome.message",
    text("Welcome to the server, ", NamedTextColor.GREEN)
        .append(text("[0]", NamedTextColor.YELLOW)) // [0] will be replaced by player name
);

// Save registered messages to disk
MessageUtils.save();
```

---

## Token Replacement & Placeholders

`MessageUtils.get(key, Object... args)` formats messages using positional replacement:

```java
// Replaces [0] with "Steve"
Component formatted = MessageUtils.get("welcome.message", "Steve");

// Broadcast to player
player.sendMessage(formatted);
```

### Dynamic String Placeholders

Custom string placeholder parsers can be created with `Placeholder`:

```java
import live.qsmc.quipt.minecraft.utils.chat.StringPlaceholder;

String rawText = "Hello %player_name%, your balance is %balance%!";

String result = new StringPlaceholder(rawText)
    .replace("%player_name%", player.getName())
    .replace("%balance%", "$500")
    .toString();
```
