// <!-- inspired by https://github.com/mimvoid/neocities-site/blob/main/src/layouts/_partials/utils/time.html -->
// src/utils/lastmod.js
import { execSync } from "node:child_process";

export function getLastmod() {
  try {
    const iso = execSync(`git log -1 --format=%cI`).toString().trim(); // ultimo commit di tutto il repo
    return iso ? new Date(iso) : new Date();
  } catch {
    return new Date();
  }
}
