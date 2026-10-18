---
id: velocity
title: Velocity Proxy Module
sidebar_position: 3
sidebar_label: Velocity Proxy
description: Proxy-level command dispatching and network-wide coordination with quipt-velocity.
---

# Velocity Proxy Module (`quipt-velocity`)

The `quipt-velocity` module provides proxy-level integration for high-performance networks running the **Velocity** proxy.

## Main Entrypoint: `QuiptVelocity`

`QuiptVelocity` extends `live.qsmc.quipt.velocity.QuiptProxy`:

```java
package live.qsmc.quipt.velocity;

import com.google.inject.Inject;
import com.velocitypowered.api.plugin.annotation.DataDirectory;
import com.velocitypowered.api.proxy.ProxyServer;
import java.nio.file.Path;

public class QuiptVelocity extends QuiptProxy {

    @Inject
    public QuiptVelocity(ProxyServer server, @DataDirectory Path dataDirectory) {
        super(server, dataDirectory);
    }

    @Override
    public void enable() {
        new VelocityCommandExecutor.Builder(new VelocityCommonCommandExecutor<>(this, QuiptCommand.class, "vquipt")).register();
        new VelocityCommandExecutor.Builder(new VelocityCommonCommandExecutor<>(this, WebhookCommand.class, "vwebhook")).register();
    }
}
```

---

## Velocity Commands

Commands at the proxy tier are prefixed with `v` to prevent collisions with backend Minecraft server commands:

| Command | Executor | Description |
| :--- | :--- | :--- |
| `/vquipt` | `VelocityCommonCommandExecutor` | Proxy-level QUIPT diagnostics, status dump, and account linking. |
| `/vwebhook` | `VelocityCommonCommandExecutor` | Proxy-level Discord webhook management. |

---

## Command Bridging Architecture

`VelocityCommandExecutor` adapts Brigadier `LiteralArgumentBuilder` trees into Velocity's native `BrigadierCommand` API:

```mermaid
graph LR
    User[Proxy Player / Console] --> Input["/vquipt list"]
    Input --> VCE[VelocityCommandExecutor]
    VCE --> CC[CommonCommand (QuiptCommand)]
    CC --> Execution[Execute Command Handler]
```
