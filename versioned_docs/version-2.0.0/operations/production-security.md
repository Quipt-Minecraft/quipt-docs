---
id: production-security
title: Production Hardening & Security
sidebar_position: 2
sidebar_label: Security & Operations
description: Best practices for securing webhooks, reverse proxy setups, thread pool sizing, and token isolation.
---

# Production Hardening & Security

Running network-connected Minecraft plugins and embedded web servers in production requires deliberate security and resource management practices.

## 1. Network & Web Server Hardening

- **Local Interface Binding**: Unless specifically required, set `webData.host` in `quipt.json` to `127.0.0.1`.
- **Reverse Proxy with TLS**: Terminate HTTPS at an upstream reverse proxy (Cloudflare, Nginx, or Caddy) rather than exposing Jetty directly to the public internet.
- **Rate Limiting**: Protect the `/resources/update` webhook endpoint behind rate limits to prevent denial-of-service attempts.

---

## 2. Token & Credential Protection

- **Discord Tokens**: Never commit `BotConfig.json` or `webhooks.json` containing sensitive Discord bot tokens or webhook URLs to public Git repositories.
- **Git Resource Credentials**: If using private Git repositories in `resources.qpt`, use fine-grained Personal Access Tokens (PAT) scoped exclusively to `read_repository`.

---

## 3. Resource Allocation & Thread Hygiene

- **JVM Flags**: Ensure server JVM has adequate heap and metaspace allocated:
  ```bash
  -Xms4G -Xmx4G -XX:+UseG1GC -XX:+ParallelRefProcEnabled
  ```
- **Heartbeat Flutter Intervals**: Avoid configuring charity check intervals lower than 15 seconds (`seconds_per_check: 15+`) to avoid triggering HTTP 429 rate limit errors from upstream APIs.
