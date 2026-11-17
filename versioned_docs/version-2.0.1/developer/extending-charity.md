---
id: extending-charity
title: Extending Charity Platforms
sidebar_position: 4
sidebar_label: Charity Platform API
description: Implementing custom charity fundraising platforms into CharityManager.
---

# Extending Charity Platforms

Developers can add custom charity platforms (such as JustGiving, DonorDrive, or custom fundraising webhooks) by implementing `CharityPlatform`.

## 1. Define the Donation Model

```java
import live.qsmc.quipt.core.charity.CharityDonation;
import org.json.JSONObject;

public class CustomDonation extends CharityDonation {
    public double amount;
    public String donorName;
    public String message;

    public CustomDonation(JSONObject json) {
        super(json.getString("id"));
        this.amount = json.getDouble("amount");
        this.donorName = json.optString("donor", "Anonymous");
        this.message = json.optString("message", "");
    }
}
```

---

## 2. Implement the Platform Class

```java
import live.qsmc.quipt.core.QuiptIntegration;
import live.qsmc.quipt.core.charity.CharityPlatform;
import live.qsmc.quipt.core.charity.ProcessResult;

public class CustomPlatform extends CharityPlatform<CustomDonation, CustomCharityConfig> {

    public CustomPlatform(QuiptIntegration integration) {
        super(integration, "custom_platform", "Custom Charity", CustomDonation.class, CustomCharityConfig.class);
    }

    @Override
    public ProcessResult<CustomDonation> process(CustomDonation donation) {
        if (config().processed(donation)) {
            return new ProcessResult<>(ProcessResult.Type.INVALID, donation);
        }
        config().processed.put(donation);
        config().total = config().total.add(java.math.BigDecimal.valueOf(donation.amount));
        config().save();
        return new ProcessResult<>(ProcessResult.Type.SUCCESS, donation);
    }
}
```

---

## 3. Register the Platform with `CharityManager`

```java
import live.qsmc.quipt.core.Quipt;

Quipt.INSTANCE.registries()
    .get("charity_platforms", CharityManager.CharityInitializer.class)
    .ifPresent(reg -> {
        reg.register("custom_platform", CustomPlatform::new);
    });
```
