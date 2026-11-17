---
id: assembler
title: Quipt Assembler
sidebar_position: 1.5
sidebar_label: Structure Assembler
description: Budget-based procedural structure assembler for Minecraft — generate dungeons, vaults, and custom structures from datapack-defined rooms.
---

# Quipt Assembler — Budget-Based Jigsaw Structure Assembler

> **Availability**: Paper module only. The assembler is not available on Fabric, Velocity, or Discord Bot modules.

A Minecraft plugin framework that generates procedural structures on demand from datapack-defined "rooms" with costs, respecting a hard budget invariant. Triggered by commands or API calls — never during natural worldgen.

---

## 1. Overview

The assembler framework lets you define Minecraft structures as individual "rooms" and then procedurally assemble them into larger structures. Each room has an associated cost, and each generation has a budget that is **never exceeded**.

### Key Features

- **Budget-aware planning**: The planner guarantees `total_cost <= budget` before placing any blocks.
- **Deterministic results**: Seeded random number generator means the same seed always produces the same structure.
- **Collision detection**: Rooms never overlap — the planner rejects placements that would intersect existing pieces.
- **Two-phase generation**: The full layout is planned in memory first, then placed. A half-planned structure is never built.
- **Batch placement**: Structures are placed in batches of 8 pieces per tick to avoid server lag.
- **Dry-run mode**: Preview the planned structure without placing any blocks.

### Architecture

```
Command → Service → Loader → Planner → Placer
                     ↓           ↓
                  Room Cache  NBT Parser
```

---

## 2. Prerequisites

### Server Requirements

- **Minecraft version**: 1.21.8 (Paper API 26.3)
- **Server platform**: Paper or compatible
- **Required plugins**:
  - **Quipt Paper** — the base quipt plugin framework

---

## 3. Quick Start

### 1. Create a Datapack Folder Structure

Place your datapack files in the world's datapack directory:

```
world/
└── datapacks/
    └── mystructures/
        └── data/
            └── myns/
                ├── quipt_assembler/
                │   └── dungeon.json
                └── structure/
                    ├── start.nbt
                    ├── hall.nbt
                    ├── vault.nbt
                    └── cap.nbt
```

### 2. Define Your Assembler

Create `dungeon.json` in `data/myns/quipt_assembler/`:

```json
{
  "start": "myns:structure/start",
  "budget": 120,
  "max_depth": 12,
  "max_pieces": 64,
  "rooms": {
    "myns:structure/hall":  { "cost": 10, "weight": 5 },
    "myns:structure/vault": { "cost": 40, "weight": 1 },
    "myns:structure/cap":   { "cost": 1,  "terminator": true }
  }
}
```

### 3. Reload and Generate

In-game, run:

```
/quipt assembler reload
/quipt assembler generate myns:dungeon
```

The structure will generate at your current location.

---

## 4. Data Formats

### Structure Rooms (.nbt)

Rooms are standard Minecraft structure `.nbt` files. They must contain **jigsaw blocks** that define how rooms connect to each other.

#### Creating Room Files

1. Build your room in Minecraft using WorldEdit or a structure block.
2. Ensure the room contains jigsaw blocks at connection points.
3. Each jigsaw block needs:
   - **Name**: A unique identifier for this connection point (e.g., `north_exit`, `south_exit`).
   - **Target**: The name of the jigsaw block it connects to in the next room.
   - **Pool**: The pool of rooms that can fill this jigsaw (or leave empty for the planner to decide).
   - **Joint**: `aligned` or `rolling`.
   - **Final State**: Whether the jigsaw block should be replaced after generation.

#### Jigsaw Block Properties

| Property | Description | Example |
|----------|-------------|---------|
| `name` | Unique connector name | `"north_exit"` |
| `target` | Name to match in the next room | `"entrance"` |
| `pool` | Pool of candidate rooms | `"#myns:corridors"` |
| `joint` | Connection type | `"aligned"` or `"rolling"` |
| `final_state` | Replace jigsaw after gen | `true` or `false` |
| `facing` | Direction the jigsaw faces | `north`, `south`, `east`, `west`, `up`, `down` |

#### Connector Matching Rules

When the planner connects two rooms:
1. The connector's `target` must match the next room's jigsaw `name`.
2. The facing directions must be opposite (e.g., `north` connects to `south`).
3. The connection respects rotation and mirroring.

### Assembler Definitions (.json)

Assembler definitions control how rooms are assembled. Place them in `data/<namespace>/quipt_assembler/<id>.json`.

#### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `start` | String | The namespaced key of the starting room (e.g., `"myns:structure/start"`) |
| `budget` | Integer | Maximum total cost for the generation. **Never exceeded.** |
| `max_depth` | Integer | Maximum connection depth from the start room |
| `max_pieces` | Integer | Maximum number of rooms that can be placed |

#### Room Entries

The `rooms` object maps room keys to their properties:

```json
"rooms": {
  "myns:structure/hall":  { "cost": 10, "weight": 5 },
  "myns:structure/vault": { "cost": 40, "weight": 1 },
  "myns:structure/cap":   { "cost": 1,  "terminator": true }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `cost` | Integer | Cost of placing this room. Deducted from the budget. |
| `weight` | Integer | Selection weight. Higher = more likely to be chosen. |
| `terminator` | Boolean | If `true`, this room is a terminator (caps off a branch). |

#### Optional Pools

You can define named pools of rooms for jigsaw block references:

```json
"pools": {
  "corridors": ["myns:structure/hall", "myns:structure/corridor"],
  "rooms":     ["myns:structure/vault", "myns:structure/treasure"]
}
```

Jigsaw blocks with `pool: "#myns:corridors"` will select from the `corridors` pool.

---

## 5. Commands

All commands are executed in-game by operators.

### `/quipt assembler generate <id> [seed]`

Generate a structure at the executor's location.

| Argument | Required | Description |
|----------|----------|-------------|
| `<id>` | Yes | The assembler definition ID (e.g., `myns:dungeon`) |
| `[seed]` | No | Random seed for deterministic generation. Omit for random. |

**Examples:**

```
# Generate with random seed
/quipt assembler generate myns:dungeon

# Generate with specific seed (deterministic)
/quipt assembler generate myns:dungeon 12345
```

### `/quipt assembler generate <id> --dry-run [seed]`

Preview the plan without placing blocks.

| Argument | Required | Description |
|----------|----------|-------------|
| `<id>` | Yes | The assembler definition ID (e.g., `myns:dungeon`) |
| `--dry-run` | Yes | Flag to enable dry-run mode |
| `[seed]` | No | Random seed for deterministic generation. Omit for random. |

**Examples:**

```
# Preview without placing (random seed)
/quipt assembler generate myns:dungeon --dry-run

# Preview without placing (specific seed)
/quipt assembler generate myns:dungeon --dry-run 12345
```

### `/quipt assembler reload`

Reload all assembler definitions and room files from disk. Use this after modifying datapack files.

```
/quipt assembler reload
```

---

## 6. Public API

Other plugins can call the assembler programmatically via `AssemblerService`.

### Getting the Service

```java
// From within the Quipt plugin
import live.qsmc.quipt.paper.assembler.AssemblerService;

AssemblerService service = new AssemblerService(plugin);
```

### Generate a Structure

```java
import live.qsmc.quipt.paper.assembler.AssemblerService;
import live.qsmc.quipt.paper.assembler.model.AssemblyResult;
import org.bukkit.Location;

// Generate at a location with a specific seed
CompletableFuture<AssemblyResult> future = service.generate(
    "myns:dungeon",    // Definition ID
    player.getLocation(), // Placement location
    12345L             // Seed (use 0 for random)
);

future.whenComplete((result, error) -> {
    if (error != null) {
        System.err.println("Generation failed: " + error.getMessage());
    } else {
        System.out.println("Placed " + result.getPieceCount() + " rooms");
        System.out.println("Total cost: " + result.getTotalCost());
        System.out.println("Bounds: (" + result.getMinX() + "," + result.getMinY() + "," + result.getMinZ() +
            ") to (" + result.getMaxX() + "," + result.getMaxY() + "," + result.getMaxZ() + ")");
    }
});
```

### Dry Run (Preview Only)

```java
// Plan without placing
CompletableFuture<AssemblyResult> future = service.dryRun("myns:dungeon", 12345L);
```

### Reload Definitions

```java
// Reload from disk
service.reload();
```

### AssemblyResult Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getPieceCount()` | `int` | Number of rooms placed |
| `getTotalCost()` | `int` | Total cost consumed |
| `getMinX()` | `int` | Minimum X coordinate of the structure |
| `getMinY()` | `int` | Minimum Y coordinate of the structure |
| `getMinZ()` | `int` | Minimum Z coordinate of the structure |
| `getMaxX()` | `int` | Maximum X coordinate of the structure |
| `getMaxY()` | `int` | Maximum Y coordinate of the structure |
| `getMaxZ()` | `int` | Maximum Z coordinate of the structure |
| `getSeed()` | `long` | Seed used for generation |
| `getPieces()` | `List<PlacedPiece>` | List of all placed room details |

---

## 7. How the Planner Works

The planner uses a budget-aware algorithm to ensure structures are always generated within the defined budget.

### Algorithm Overview

1. **Place the start room** at the origin position.
2. **Maintain a queue** of open connectors (jigsaw blocks needing connections).
3. **For each open connector**:
   - Build a candidate list from rooms whose jigsaw names match the connector's target.
   - Shuffle candidates by weight (higher weight = more likely).
   - For each candidate, try rotations and mirrors to face the opposite direction.
   - **Reject** if the candidate's bounding box overlaps any already-placed piece.
   - **Budget check**: Accept only if:
     ```
     spent + candidate.cost + (remaining_open_connectors * cheapest_terminator_cost) <= budget
     ```
   - If no candidate fits, place the **cheapest terminator**.
   - If even the terminator violates the budget, **abort** the entire generation.
4. **Respect limits**: When `max_depth` or `max_pieces` is reached, only terminators are allowed.
5. **Return** the complete plan or `null` on abort.

### Budget Invariant

The planner enforces a hard invariant:

```
spent + candidate.cost + (open_connectors_after * cheapest_terminator_cost) <= budget
```

This reserves enough budget to cap every remaining open connector, ensuring the total never exceeds the budget.

### Key Guarantees

- **`total_cost <= budget`** — always true after planning.
- **No overlapping rooms** — AABB collision detection prevents intersections.
- **Deterministic** — same seed produces identical results.
- **All-or-nothing** — if planning fails, no blocks are placed.

---

## 8. Examples

### Example 1: Simple Dungeon

**Definition** (`data/myns/quipt_assembler/simple_dungeon.json`):

```json
{
  "start": "myns:structure/entrance",
  "budget": 100,
  "max_depth": 8,
  "max_pieces": 32,
  "rooms": {
    "myns:structure/hall_short": { "cost": 5,  "weight": 10 },
    "myns:structure/hall_long":  { "cost": 8,  "weight": 5 },
    "myns:structure/room_small": { "cost": 15, "weight": 3 },
    "myns:structure/room_large": { "cost": 25, "weight": 1 },
    "myns:structure/dead_end":   { "cost": 2,  "terminator": true }
  }
}
```

This generates a dungeon with short halls being most common, occasional rooms, and dead ends to cap off branches.

### Example 2: Treasure Vault

**Definition** (`data/myns/quipt_assembler/vault.json`):

```json
{
  "start": "myns:structure/vault_entrance",
  "budget": 200,
  "max_depth": 6,
  "max_pieces": 20,
  "rooms": {
    "myns:structure/corridor":    { "cost": 10, "weight": 8 },
    "myns:structure/trap_room":   { "cost": 20, "weight": 3 },
    "myns:structure/treasure":    { "cost": 50, "weight": 1 },
    "myns:structure/sealed_door": { "cost": 1,  "terminator": true }
  }
}
```

Higher budget allows more expensive rooms like treasure chambers.

### Example 3: Using Pools

**Definition** (`data/myns/quipt_assembler/pooled.json`):

```json
{
  "start": "myns:structure/hub",
  "budget": 150,
  "max_depth": 10,
  "max_pieces": 50,
  "rooms": {
    "myns:structure/corridor_a": { "cost": 8,  "weight": 5 },
    "myns:structure/corridor_b": { "cost": 8,  "weight": 5 },
    "myns:structure/chamber":    { "cost": 20, "weight": 2 },
    "myns:structure/cap":        { "cost": 1,  "terminator": true }
  },
  "pools": {
    "corridors": ["myns:structure/corridor_a", "myns:structure/corridor_b"],
    "chambers":  ["myns:structure/chamber"]
  }
}
```

Jigsaw blocks referencing `#myns:corridors` will select from the corridors pool.

---

## 9. Troubleshooting

### "No assembler definitions found"

- Ensure your `.json` files are in `data/<namespace>/quipt_assembler/`.
- Run `/quipt assembler reload` after adding or modifying files.
- Check the server logs for parsing errors.

### "Room not found: myns:structure/hall"

- Ensure the `.nbt` file exists at `data/myns/structure/hall.nbt`.
- The file must be a valid gzip-compressed NBT structure file.
- Check that the structure is properly loaded by Bukkit's StructureManager.

### "Generation aborted: budget exceeded"

- The start room's cost exceeds the budget. Increase the budget or reduce room costs.
- No terminator is defined, so the planner cannot cap branches. Add a room with `"terminator": true`.

### Structures not appearing

- Ensure you have operator permissions (`/op`).
- Check that the chunk is loaded at your location.
- Try `--dry-run` first to see if the planner produces a valid result.
- Check server logs for placement errors.

### Same structure every time

- Without a seed, each generation uses a random seed.
- With a fixed seed, the result is always identical — this is by design for reproducibility.
- Omit the seed argument for random results: `/quipt assembler generate myns:dungeon`.

---

## 10. File Reference

### Package Structure

```
live.qsmc.quipt.paper.assembler/
├── AssemblerService.java          — Public API entry point
├── AssemblerCommand.java          — /quipt assembler command
├── definition/
│   ├── AssemblerDefinition.java   — JSON definition model
│   ├── RoomEntry.java             — Room cost/weight/terminator
│   └── Pool.java                  — Named pool of room keys
├── model/
│   ├── ParsedRoom.java            — Parsed structure room
│   ├── JigsawConnector.java       — Jigsaw block data
│   ├── PlacedPiece.java           — Planned piece placement
│   ├── OpenConnector.java         — Open jigsaw connector
│   └── AssemblyResult.java        — Generation result
├── parser/
│   └── RoomParser.java            — NBT → ParsedRoom
├── loader/
│   └── AssemblerDefinitionLoader.java — Scan + parse definitions
├── planner/
│   └── AssemblerPlanner.java      — Budget-aware planning algorithm
└── placer/
    └── StructurePlacer.java       — Batch placement via scheduler
```

### Datapack File Locations

| File Type | Location | Example |
|-----------|----------|---------|
| Assembler Definition | `data/<ns>/quipt_assembler/<id>.json` | `data/myns/quipt_assembler/dungeon.json` |
| Structure Room | `data/<ns>/structure/<name>.nbt` | `data/myns/structure/hall.nbt` |

---

_This feature is part of the Quipt framework, built by LastLife2027._