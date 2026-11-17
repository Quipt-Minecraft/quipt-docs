---
id: fabric
title: Fabric Mod Module
sidebar_position: 2
sidebar_label: Fabric Mod
description: Architecture of quipt-fabric, lifecycle listeners, custom blocks, items, particle types, and networking.
---

# Fabric Mod Module (`quipt-fabric`)

The `quipt-fabric` module brings QUIPT to the Fabric ecosystem, providing server and client functionality alongside custom modding APIs.

## Main Entrypoint: `QuiptFabric`

`QuiptFabric` implements Fabric's `ModInitializer` (via `QuiptMod`) and handles networking payloads.

```java
package live.qsmc.quipt.fabric;

public class QuiptFabric extends QuiptMod implements ServerPlayNetworking.PlayPayloadHandler<PluginMessagePacket> {
    public static QuiptFabric instance();
    public ResourcePackHandler packHandler();
}
```

### Initialization Steps
1. Registers localized Adventure chat messages via `MessageUtils`.
2. Registers server commands (`/quipt`, `/webhooks`) via `FabricCommandExecutor`.
3. Discovers other Quipt-based Fabric mods using `FabricLoader.getInstance().getEntrypointContainers("quipt", QuiptMod.class)`.
4. Registers the `FabricLifecycleListener` for clean server shutdown.

---

## Graceful Server Stopping (`FabricLifecycleListener`)

To prevent Fabric servers from hanging during `/stop`, `FabricLifecycleListener` hooks into `ServerLifecycleEvents.SERVER_STOPPING`:

```java
package live.qsmc.quipt.fabric.listener;

import net.fabricmc.fabric.api.event.lifecycle.v1.ServerLifecycleEvents;
import net.minecraft.server.MinecraftServer;
import live.qsmc.quipt.core.Quipt;
import live.qsmc.quipt.fabric.QuiptFabric;

public class FabricLifecycleListener implements ServerLifecycleEvents.ServerStopping {
    @Override
    public void onServerStopping(MinecraftServer server) {
        QuiptFabric fabricInstance = QuiptFabric.instance();
        if (fabricInstance != null) {
            fabricInstance.shutdown();
        }
        Quipt.INSTANCE.shutdown();
    }
}
```

---

## Custom Block & Item Abstractions

`quipt-fabric` provides abstract base classes for registering content with minimal boilerplate:

### Custom Blocks (`QuiptBlock`)
- `QuiptFullBlock`: Standard solid cube blocks.
- `QuiptCarpetBlock`: Thin carpet/layer blocks.
- `QuiptPillarBlock`: Rotatable directional pillars.
- `QuiptBlockWithEntity`: Blocks binding custom `BlockEntity` instances.
- **Properties**: `BlockBooleanProperty`, `BlockIntProperty`, `BlockEnumProperty`.

### Custom Items (`QuiptItem`)
- `QuiptNormalItem`: Standard items with custom max count and durability.
- `FoodSettings`: Declarative nutrition, saturation modifier, and status effect triggers.

---

## Client Datagen & Particle System

- **`EntrypointDataGenerator`**: Automates model, blockstate, and localization JSON generation during Gradle `runDatagen`.
- **`QuiptParticleEffect` & `QuiptParticleType`**: Dynamic particle rendering hooks for custom spell and visual effects on the client.
