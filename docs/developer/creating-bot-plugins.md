---
id: creating-bot-plugins
title: Creating Discord Bot Plugins
sidebar_position: 1
sidebar_label: Bot Plugin Development
description: Complete tutorial on authoring, packaging, and hot-loading plugins for quipt-bot.
---

# Creating Discord Bot Plugins

QUIPT's Discord bot subsystem (`quipt-bot`) allows developers to extend the bot dynamically by placing plugin JARs into `quiptbot-data/bot_plugins/`.

## 1. Project Setup (Gradle)

Create a standard Java 21+ project and add `quipt-bot` as a dependency:

```groovy title="build.gradle"
plugins {
    id 'java'
}

repositories {
    mavenCentral()
    maven { url 'https://repo.qsmc.live/repository/maven-public/' }
}

dependencies {
    compileOnly 'live.qsmc.quipt:bot:2.0.0'
}
```

---

## 2. Define the Plugin Main Class

Extend `live.qsmc.quipt.discord.plugins.BotPlugin`:

```java title="src/main/java/com/example/bot/MusicPlugin.java"
package com.example.bot;

import live.qsmc.quipt.discord.plugins.BotPlugin;
import live.qsmc.quipt.discord.plugins.BotPluginLoader;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

public class MusicPlugin extends BotPlugin {

    public MusicPlugin(BotPluginLoader pluginLoader) {
        super(pluginLoader);
    }

    @Override
    public String version() {
        return "1.0.0";
    }

    @Override
    public void enable() {
        logger().log("Music", "Enabling Music Plugin...");
        
        // Access JDA API directly
        bot().jda().addEventListener(new ListenerAdapter() {
            @Override
            public void onSlashCommandInteraction(SlashCommandInteractionEvent event) {
                if (event.getName().equals("play")) {
                    event.reply("Playing music track!").queue();
                }
            }
        });
    }

    @Override
    public void disable() {
        logger().log("Music", "Disabling Music Plugin...");
    }
}
```

---

## 3. Create `bot.plugin.properties`

Create the descriptor file in `src/main/resources/bot.plugin.properties`:

```properties title="src/main/resources/bot.plugin.properties"
name=MusicExtension
main=com.example.bot.MusicPlugin
version=1.0.0
author=QuickScythe
```

---

## 4. Building and Deploying

1. Build your plugin JAR:
   ```bash
   ./gradlew build
   ```
2. Copy the resulting JAR from `build/libs/` into `quiptbot-data/bot_plugins/`.
3. Start or reload the bot:
   ```java
   bot.plugins().reload();
   ```
