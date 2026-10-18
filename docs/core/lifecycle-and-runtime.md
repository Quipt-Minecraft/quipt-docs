---
id: lifecycle-and-runtime
title: Integration Lifecycle & Runtime
sidebar_position: 1
sidebar_label: Runtime & Lifecycle
description: Deep dive into QuiptIntegration, initialization sequence, thread coordination, and safe shutdown.
---

# Integration Lifecycle & Runtime

The core runtime orchestrates the initialization, configuration, background execution, and graceful teardown of every component across all platforms.

## The `QuiptIntegration` Class

All modules, platforms, and sub-plugins extend `live.qsmc.quipt.core.QuiptIntegration`. It provides the foundational identity and shared capabilities for any subsystem.

```java
package live.qsmc.quipt.core;

public abstract class QuiptIntegration {
    public abstract String name();
    public abstract String version();
    public abstract File folder();
    public abstract void enable();
    public void shutdown();

    public final Logger logger();
    public Heartbeat heartbeat();
    public ConfigManager configs();
    public boolean isShuttingDown();
}
```

### Key Components Provided by `QuiptIntegration`:

1. **`Logger`**: Structured logging wrapper over SLF4J that formats log statements with tagged categories, e.g. `logger().log("Category", "Message {}", arg)`.
2. **`Heartbeat`**: Integration-bound periodic execution loop for recurring background work.
3. **`ConfigManager`**: Dedicated configuration manager mapped to the integration's filesystem directory (`folder()`).
4. **Shutdown State Management**: Atomic flag `isShuttingDown` to guard against concurrent re-entry or scheduling during termination.

---

## The Master Singleton: `Quipt.INSTANCE`

At runtime, `Quipt.INSTANCE` acts as the root coordinator:

```java
Quipt root = Quipt.INSTANCE;

// Access global subsystems
Registries registries = root.registries();
QuiptServer server   = root.server();
EventHandler events  = root.events();
WebhookManager hooks = root.webhooks();
CharityManager charity = root.charities();

// Enable a platform integration
root.enable(myCustomIntegration);
```

### Integration Registry

When integrations are registered via `Quipt.INSTANCE.enable(integration)`:
- They are placed into the `integrations` registry under their `name()`.
- Duplicate initializations are rejected with a warning log.
- Their lifecycle `enable()` method is invoked.

---

## Graceful Multi-Threaded Shutdown Mechanism

Stopping a Minecraft server or proxy requires releasing all resources without leaving blocked background threads. QUIPT incorporates a **two-phase shutdown pattern** across `TaskScheduler`, `Heartbeat`, and `QuiptIntegration`.

### Shutdown Execution Sequence

```text
1. Trigger: FabricLifecycleListener / Bukkit onDisable() / SIGINT
2. Mark isShuttingDown = true
3. Heartbeat.shutdown():
   ├── Sets heartbeat running flag to false
   └── Clears pending Flutter list
4. TaskScheduler.shutdown():
   ├── Sets scheduler isShuttingDown = true
   ├── Rejects new incoming tasks
   ├── Invokes executor.shutdown()
   ├── Awaits termination (5 seconds timeout)
   └── If timeout expires:
       ├── Invokes executor.shutdownNow()
       └── Awaits final termination (2 seconds timeout)
5. Embedded Jetty Server Stop (if running)
6. All resources cleanly freed
```

### Source Implementation Reference

From `TaskScheduler.java`:
```java
public static void shutdown() {
    isShuttingDown = true;
    scheduler.shutdown();
    try {
        if (!scheduler.awaitTermination(5, TimeUnit.SECONDS)) {
            scheduler.shutdownNow();
            if (!scheduler.awaitTermination(2, TimeUnit.SECONDS)) {
                System.err.println("TaskScheduler did not terminate");
            }
        }
    } catch (InterruptedException ie) {
        scheduler.shutdownNow();
        Thread.currentThread().interrupt();
    }
}
```
