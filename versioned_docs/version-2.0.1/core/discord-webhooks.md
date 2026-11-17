---
id: discord-webhooks
title: Discord Webhook Integration
sidebar_position: 7
sidebar_label: Discord Webhooks
description: Automated Discord notifications, webhook management, embed builders, and command integration.
---

# Discord Webhook Integration

QUIPT features a built-in **Discord Webhook Subsystem** (`WebhookManager` and `Embed`) allowing server owners and developers to dispatch rich Discord messages and server status updates without configuring a full bot.

## Webhook Architecture

```mermaid
graph LR
    Command["/webhook add <id> <token> <channel>"] --> WM[WebhookManager]
    WM --> Config["quipt/data/webhooks.json"]
    Code[Java Code / Event Handler] --> Embed[Embed.builder()]
    Embed --> WM
    WM --> DiscordAPI["Discord Webhook Endpoint (HTTP POST)"]
```

---

## Configuration (`webhooks.json`)

Webhooks are persisted in `quipt/data/webhooks.json` as a `ConfigMap<Webhook>`:

```json title="quipt/data/webhooks.json"
{
  "webhooks": {
    "announcements": {
      "uuid": "123456789012345678",
      "token": "a1b2c3d4e5f6g7h8i9j0_token",
      "id": "announcements"
    },
    "donations": {
      "uuid": "987654321098765432",
      "token": "z9y8x7w6v5u4t3s2r1q0_token",
      "id": "donations"
    }
  }
}
```

---

## In-Game Command Management

Administrators with permission level 4 (or `quipt.command.webhook`) can configure webhooks live without restarting the server:

### Adding a Webhook
```bash
/webhook add <id> <token> <channel_name>
```
*Example:*
```bash
/webhook add 123456789012345678 a1b2c3d4e5f6_token logs
```

### Removing a Webhook
```bash
/webhook remove <id_or_channel_name>
```

---

## Programmatic Webhook Dispatching & Embed Building

Developers can construct rich embeds and dispatch them asynchronously:

```java
import live.qsmc.quipt.core.Quipt;
import live.qsmc.quipt.core.discord.embed.Embed;
import java.awt.Color;

// Construct rich embed
Embed embed = Embed.builder()
    .title("Server Alert: Boss Defeated!")
    .description("The **Ender Dragon** was defeated by **PlayerOne**.")
    .color(Color.MAGENTA)
    .author("QUIPT Server Event", "https://example.com/icon.png", "https://example.com")
    .field("Location", "The End (0, 64, 0)", true)
    .field("Time Elapsed", "14 minutes", true)
    .footer("Server Event Logger", "https://example.com/footer.png")
    .build();

// Send through WebhookManager
try {
    Quipt.INSTANCE.webhooks().send("announcements", embed);
} catch (Exception e) {
    Quipt.INSTANCE.logger().error("Discord", "Failed to dispatch webhook embed", e);
}
```

### Sending Plain Text Messages

```java
Quipt.INSTANCE.webhooks().send("logs", "Server started successfully on port 25565.");
```
