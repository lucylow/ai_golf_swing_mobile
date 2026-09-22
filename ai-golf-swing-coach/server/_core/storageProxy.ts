import type { Express } from "express";
import { ENV } from "./env";
import { describeError } from "@/lib/safe-diagnostics";
import { withTimeout } from "@/lib/request-timeout";

const STORAGE_REQUEST_TIMEOUT_MS = 15_000;

export function registerStorageProxy(app: Express) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }

    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
      );
      forgeUrl.searchParams.set("path", key);

      const forgeResp = await withTimeout(
        fetch(forgeUrl, {
          headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
        }),
        STORAGE_REQUEST_TIMEOUT_MS,
        "Storage backend request timed out",
      );

      if (!forgeResp.ok) {
        await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status}`);
        res.status(502).send("Storage backend error");
        return;
      }

      const { url } = (await forgeResp.json()) as { url: string };
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }

      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error(`[StorageProxy] failed (${describeError(err)})`);
      res.status(502).send("Storage proxy error");
    }
  });
}
