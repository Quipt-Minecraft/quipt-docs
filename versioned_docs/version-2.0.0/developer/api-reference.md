---
id: api-reference
title: API Reference & Cheatsheet
sidebar_position: 5
sidebar_label: API Reference
description: Quick lookup guide and cheatsheet for core QUIPT classes, methods, and patterns.
---

# API Reference & Cheatsheet

A concise reference of core QUIPT classes and their most common methods.

## Core Runtime (`live.qsmc.quipt.core`)

### `Quipt` (Singleton)
- `Quipt.INSTANCE`: Master root instance.
- `registries()`: Global registry dictionary (`Registries`).
- `server()`: Embedded Jetty web server (`QuiptServer`).
- `events()`: Global event bus (`EventHandler`).
- `webhooks()`: Discord webhook manager (`WebhookManager`).
- `charities()`: Charity platform manager (`CharityManager`).
- `enable(QuiptIntegration integration)`: Registers and enables an integration.
- `shutdown()`: Triggers graceful global termination.

### `QuiptIntegration`
- `name()`: Identifier string.
- `version()`: Semantic version string.
- `folder()`: Root data directory for configs and resources.
- `logger()`: Tagged logger (`Logger.log(tag, msg, args...)`).
- `heartbeat()`: Integration-level heartbeat loop (`Heartbeat`).
- `configs()`: Integration configuration manager (`ConfigManager`).
- `isShuttingDown()`: Boolean flag indicating termination state.

---

## Configuration Engine (`live.qsmc.quipt.core.config`)

### Annotations
- `@ConfigTemplate(name = "filename", ext = Extension.JSON)`: Class-level descriptor.
- `@ConfigValue`: Field-level persistence marker.

### Classes
- `ConfigManager.register(Class<T> templateClass)`: Loads or creates config.
- `Config.save()`: Writes current memory values to disk.
- `ConfigMap<T>`: Key-value map collection of `ConfigObject` entries.

---

## Server & Network (`live.qsmc.quipt.core.server` & `net`)

- `QuiptServer.handler().handle(route, servlet, filterPath)`: Mounts a servlet.
- `NetworkUtils.get(HttpConfig config, String url)`: High-performance HTTP GET.
- `NetworkUtils.post(HttpConfig config, String url, JSONObject body)`: HTTP POST.
- `NetworkUtils.patch(HttpConfig config, String url, JSONObject body)`: HTTP PATCH.

---

## Events (`live.qsmc.quipt.core.events`)

- `EventHandler.register(EventListener<?,?> listener)`: Registers a listener.
- `EventHandler.handle(Event<?> event)`: Dispatches an event.
- `Event.Cancellable.cancel(boolean)`: Cancels event propagation.

---

## Minecraft & Common (`live.qsmc.quipt.minecraft`)

- `MessageUtils.get(key, args...)`: Returns formatted Adventure `Component`.
- `MessageUtils.register(key, component)`: Registers a localization key.
- `PaperPlayers.of(Player)`: Retrieves persistent `PaperPlayer`.
- `PartyConfig.create(name)`: Creates a new `Party`.
- `Party.join(MinecraftPlayer)`: Adds player to party.
