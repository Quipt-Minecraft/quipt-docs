---
id: custom-commands
title: Building Custom Commands
sidebar_position: 2
sidebar_label: Custom Commands
description: Creating cross-platform Brigadier commands using CommonCommand, CommandBuilder, and subcommands.
---

# Building Custom Commands

QUIPT simplifies writing commands that execute seamlessly across Paper, Fabric, and Velocity.

## 1. Creating a `CommonCommand`

Extend `live.qsmc.quipt.minecraft.commands.CommonCommand<S, P>`:

```java
package com.example.commands;

import com.mojang.brigadier.arguments.StringArgumentType;
import com.mojang.brigadier.builder.LiteralArgumentBuilder;
import live.qsmc.quipt.minecraft.api.MinecraftIntegration;
import live.qsmc.quipt.minecraft.commands.Command;
import live.qsmc.quipt.minecraft.commands.CommandBuilder;
import live.qsmc.quipt.minecraft.commands.CommonCommand;

public class BroadcastCommand<S, P> extends CommonCommand<S, P> {

    public BroadcastCommand(Command<S, P> command, MinecraftIntegration<?,?> integration) {
        super(command, integration);
    }

    @Override
    public LiteralArgumentBuilder<S> arguments(CommandBuilder<S> builder) {
        return builder.literal(command().name())
            .requires(source -> command().hasPermission(source, command().permission(2)))
            .then(builder.argument("message", StringArgumentType.greedyString())
                .executes(context -> {
                    String message = StringArgumentType.getString(context, "message");
                    
                    // Broadcast to all players
                    command().broadcast(message);
                    return 1;
                }));
    }
}
```

---

## 2. Registering on Paper

In your `QuiptPaper` plugin or sub-plugin:

```java
new PaperCommandExecutor.Builder(
    new PaperCommonCommandExecutor<>(this, BroadcastCommand.class, "broadcast")
).register();
```

---

## 3. Registering on Fabric

In your `QuiptFabric` mod:

```java
new FabricCommandExecutor.Builder(
    new FabricCommonCommandExecutor<>(this, BroadcastCommand.class, "broadcast")
).register();
```

---

## 4. Registering on Velocity

In your `QuiptVelocity` proxy plugin:

```java
new VelocityCommandExecutor.Builder(
    new VelocityCommonCommandExecutor<>(this, BroadcastCommand.class, "vbroadcast")
).register();
```
