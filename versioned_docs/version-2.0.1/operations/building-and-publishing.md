---
id: building-and-publishing
title: Building, Testing & Publishing
sidebar_position: 1
sidebar_label: Building & Publishing
description: Gradle multi-project build setup, publication workflows, Maven metadata generation, and Modrinth integration.
---

# Building, Testing & Publishing

QUIPT uses a multi-module Gradle build structure configured with Java 21+ toolchains, Shadow JAR creation, and automated Modrinth / Maven publishing plugins.

## Building from Source

### Prerequisites
- JDK 21 or JDK 25 installed.
- Git.

### Build Commands

```bash
# Windows (PowerShell)
.\gradlew.bat build

# Linux / macOS
./gradlew build
```

Compiled artifacts for each submodule will be generated under their respective `build/libs/` directory:
- `modules/core/build/libs/core-*.jar`
- `modules/common/build/libs/common-*.jar`
- `modules/paper/build/libs/paper-*.jar`
- `modules/fabric/build/libs/fabric-*.jar`
- `modules/velocity/build/libs/velocity-*.jar`
- `modules/bot/build/libs/bot-*.jar`

---

## Running Unit Tests

```bash
./gradlew test
```

Unit and integration tests are organized under each module's `src/test/java/` directory:
- `modules/core`: Tests event bus handling, network requests, and configuration serialization.
- `modules/common`: Tests command parsing and location math.
- `modules/paper`: Tests Bukkit player integration.
- `modules/bot`: Tests Discord entity mocking and plugin loader.

---

## Publishing to Maven & Modrinth

QUIPT includes automated publishing tasks configured in `build.gradle`:

### Generating Maven Metadata
```bash
./gradlew preparePublish
```

### Publishing Submodules
```bash
./gradlew publish
```

### Modrinth Release Sync
The `paper`, `fabric`, and `velocity` modules use the `minotaur` and `outlet` plugins to synchronize descriptions and upload releases directly to Modrinth:
```bash
./gradlew modrinth
```
