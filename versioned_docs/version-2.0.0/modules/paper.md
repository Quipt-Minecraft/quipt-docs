---
id: paper
title: Paper / Bukkit Module
sidebar_position: 1
sidebar_label: Paper Plugin
description: In-depth guide to quipt-paper, PaperPlayers, chunk generation, commands, and Bukkit integration.
---

# Paper / Bukkit Module (`quipt-paper`)

The `quipt-paper` module connects QUIPT's core capabilities into Paper, Purpur, and Bukkit server runtimes.

## Main Entrypoint: `QuiptPaper`

`QuiptPaper` extends `live.qsmc.quipt.paper.QuiptPlugin` (which in turn extends `org.bukkit.plugin.java.JavaPlugin`).

### Initialization Flow on Paper:
1. Initializes `MessageUtils` and registers command usage strings and localized feedback.
2. Registers and loads `ResourceConfig`.
3. If resource pack sync is enabled, mounts `ResourcePackHandler` onto the embedded Jetty server at `/resources`.
4. Registers Brigadier-based commands (`/quipt`, `/webhook`, `/party`, `/sudo`) with Paper's command dispatcher.

```java
package live.qsmc.quipt.paper;

public class QuiptPaper extends QuiptPlugin {
    public static QuiptPaper instance();
    public ResourcePackHandler packHandler();
}
```

---

## Player Session Management (`PaperPlayers` & `PaperPlayer`)

QUIPT wraps Bukkit's native `Player` objects into a persistent `PaperPlayer` model:

```java
import live.qsmc.quipt.paper.QuiptPaper;
import live.qsmc.quipt.paper.api.players.PaperPlayers;
import live.qsmc.quipt.paper.api.players.PaperPlayer;
import org.bukkit.entity.Player;

// Retrieve wrapped player
PaperPlayers manager = new PaperPlayers(QuiptPaper.instance());
PaperPlayer wrappedPlayer = manager.of(bukkitPlayer);

// Access session metadata
long lastSeenTimestamp = wrappedPlayer.lastSeen();
wrappedPlayer.teleport(otherPlayer);
```

### Automatic Persistence (`players.json`)
Player records are stored in `plugins/quipt-paper/players.json` via `ConfigMap<PaperPlayer>` to preserve offline player data and custom settings across restarts.

---

## Void World Generation (`VoidChunkGenerator`)

For lobby servers, arenas, and minigames, `quipt-paper` includes a zero-overhead `VoidChunkGenerator`:

### Enabling in `bukkit.yml`

```yaml title="bukkit.yml"
worlds:
  world_the_void:
    generator: quipt-paper
```

Or programmatically in world creation:

```java
import live.qsmc.quipt.paper.world.VoidChunkGenerator;
import org.bukkit.WorldCreator;

WorldCreator creator = new WorldCreator("void_world");
creator.generator(new VoidChunkGenerator());
creator.createWorld();
```

---

## Commands Registered on Paper

| Command | Permission | Default Executor | Description |
| :--- | :--- | :--- | :--- |
| `/quipt <list\|help\|dump\|account\|update>` | `quipt.command.quipt` (OP 4) | `QuiptCommand` | Central administrative tool, update checks, and account linking. |
| `/webhook <add\|remove>` | `quipt.command.webhook` (OP 4) | `WebhookCommand` | Live Discord webhook management. |
| `/party <create\|join\|leave\|disband>` | None (Public) | `PartyCommand` | Social party grouping. |
| `/sudo <player> <command>` | `quipt.command.sudo` (OP 4) | `SudoCommand` | Execute commands on behalf of another user. |
| `/resourcepack <update\|sync>` | `quipt.command.resourcepack` (OP 4) | `ResourcePackCommand` | Trigger Git pack re-sync. |
