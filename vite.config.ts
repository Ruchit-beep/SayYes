
import { defineConfig as defineViteConfig } from "vite";
import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineViteConfig(async (env) => {
  const config = await defineLovableConfig({
    tanstackStart: {
      server: { entry: "server" },
    },
    // Disable the wrapper's default Cloudflare Nitro plugin.
    // @ts-expect-error Nitro option is supported at runtime by the wrapper.
    nitro: false,
  })(env);

  if (env.command === "build") {
    config.plugins = [
      ...(config.plugins ?? []),
      nitro({
        preset: "vercel",
        output: {
          dir: ".vercel/output",
          serverDir: ".vercel/output/functions/__server.func",
          publicDir: ".vercel/output/static",
        },
      }),
    ];
  }

  return config;
});
