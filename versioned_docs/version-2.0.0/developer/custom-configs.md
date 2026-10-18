---
id: custom-configs
title: Custom Configurations & Serialization
sidebar_position: 3
sidebar_label: Custom Configs
description: Advanced guide to custom ConfigObjects, ConfigMaps, and custom serializer factories.
---

# Custom Configurations & Serialization

Learn how to leverage QUIPT's configuration reflection engine to manage structured data.

## 1. Creating Polymorphic Objects (`ConfigObject`)

Objects nested inside a `@ConfigValue` field should extend `live.qsmc.quipt.core.config.objects.ConfigObject`:

```java
package com.example.config;

import live.qsmc.quipt.core.QuiptIntegration;
import live.qsmc.quipt.core.config.objects.ConfigObject;

public class ArenaSpawnPoint extends ConfigObject {

    public String name = "Default";
    public double x = 0.0;
    public double y = 64.0;
    public double z = 0.0;
    public float yaw = 0.0f;
    public float pitch = 0.0f;

    public ArenaSpawnPoint(QuiptIntegration integration) {
        super(integration);
    }
}
```

---

## 2. Dynamic Collections (`ConfigMap<T>`)

Use `ConfigMap<T>` when you need a dictionary of configurable objects keyed by string:

```java
package com.example.config;

import live.qsmc.quipt.core.QuiptIntegration;
import live.qsmc.quipt.core.config.Config;
import live.qsmc.quipt.core.config.ConfigTemplate;
import live.qsmc.quipt.core.config.ConfigValue;
import live.qsmc.quipt.core.config.objects.ConfigMap;
import java.io.File;

@ConfigTemplate(name = "arenas", ext = ConfigTemplate.Extension.JSON)
public class ArenaConfig extends Config {

    @ConfigValue
    public ConfigMap<ArenaSpawnPoint> spawns;

    public ArenaConfig(File file, String name, ConfigTemplate.Extension extension, QuiptIntegration integration) {
        super(file, name, extension, integration);
        spawns = new ConfigMap<>(integration);
    }
}
```

---

## 3. Registering Factories

If you instantiate nested objects dynamically, register a `GenericFactory`:

```java
configs().factory(new GenericFactory<>(ArenaSpawnPoint.class));
ArenaConfig config = configs().register(ArenaConfig.class);
```

---

## 4. Manipulating and Saving Data

```java
// Add spawn point
ArenaSpawnPoint point = new ArenaSpawnPoint(this);
point.name = "RedSpawn";
point.x = 100.5;
point.y = 70.0;
point.z = -50.2;

config.spawns.put(point);

// Save to disk immediately
config.save();
```
