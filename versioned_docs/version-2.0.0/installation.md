---
id: installation
title: Installation & Quick Start
sidebar_position: 3
sidebar_label: Installation
description: Step-by-step setup and configuration guide for Paper, Fabric, Velocity, and Discord Bot environments.
---

# Installation & Quick Start

QUIPT is distributed as modular binaries tailored to specific target runtimes. This guide covers setup across all supported platforms.

## Prerequisites

| Requirement | Minimum Version | Recommended Version |
| :--- | :--- | :--- |
| **Java Runtime Environment (JRE)** | Java 21 | Java 25 |
| **Minecraft Server** | 1.21.x / 26.x | Latest supported release |
| **Network Ports** | 1 open TCP port (default `5252`) | Configurable via `quipt.json` |

---

## 1. Paper / Purpur / Bukkit Installation

QUIPT runs natively on Paper servers running Minecraft 1.21+.

### Steps
1. Download the latest `quipt-paper-*.jar` from [Modrinth](https://modrinth.com/plugin/QUIPT) or the [GitHub Releases](https://github.com/Quipt-Minecraft/quipt/releases).
2. Place the JAR file into your server's `plugins/` directory:
   ```text
   server-root/
   ├── plugins/
   │   └── quipt-paper-2.0.0.jar
   ```
3. Start the server once to generate default configuration files:
   ```bash
   java -Xmx4G -jar paper.jar --nogui
   ```
4. Stop the server, configure settings under `plugins/quipt-paper/quipt.json`, and restart.

---

## 2. Fabric Server / Client Installation

QUIPT provides server-side and client-side functionality for Fabric.

### Steps
1. Ensure your server has **Fabric Loader** and **Fabric API** installed.
2. Download `quipt-fabric-*.jar`.
3. Place the JAR into the `mods/` directory:
   ```text
   server-root/
   ├── mods/
   │   ├── fabric-api-*.jar
   │   └── quipt-fabric-2.0.0.jar
   ```
4. Launch the server. Configurations will be generated in `config/quipt/` or `quipt/data/`.

---

## 3. Velocity Proxy Installation

QUIPT can be deployed directly to your Velocity proxy to provide network-wide commands and synchronization.

### Steps
1. Download `quipt-velocity-*.jar`.
2. Place the JAR into your Velocity `plugins/` directory:
   ```text
   velocity-root/
   ├── plugins/
   │   └── quipt-velocity-2.0.0.jar
   ```
3. Launch Velocity. Commands `/vquipt` and `/vwebhook` will be registered on proxy startup.

---

## 4. Standalone Discord Bot Installation

QUIPT can be executed as a dedicated Discord bot daemon independent of any Minecraft server.

### Steps
1. Download `quipt-bot-*.jar`.
2. Create a dedicated directory and start the application:
   ```bash
   mkdir quipt-bot && cd quipt-bot
   java -jar quipt-bot-2.0.0.jar
   ```
3. On first startup, the bot creates `quiptbot-data/BotConfig.json` and prompts for your token:
   ```json title="quiptbot-data/BotConfig.json"
   {
     "token": "<YOUR_DISCORD_BOT_TOKEN>"
   }
   ```
4. Replace `<YOUR_DISCORD_BOT_TOKEN>` with your Discord application token, then restart the application.
5. Drop custom bot extension plugins into `quiptbot-data/bot_plugins/`.

---

## Default Directory Structure

Once launched, QUIPT creates a standard filesystem hierarchy:

```text
server-root/
├── plugins/ (or mods/)
│   └── quipt-paper-2.0.0.jar
└── quipt/ (or plugins/quipt-paper/)
    └── data/
        ├── quipt.json           # Embedded web server & master access tokens
        ├── webhooks.json        # Discord webhook mappings & credentials
        ├── message.json         # Localized message templates & formatting
        ├── resources.qpt        # Git resource pack configuration & commit hashes
        ├── party.json           # Active player party states
        ├── donations.json       # ExtraLife charity donation tracking
        └── tiltify_config.json  # Tiltify API credentials & token caches
```
