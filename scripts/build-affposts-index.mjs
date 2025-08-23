import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "public", "affposts");
const files = readdirSync(dir)
  .filter(f => f.endsWith(".json") && f !== "index.json")
  .map(f => f.replace(/\.json$/i, ""))
  .sort();

writeFileSync(join(dir, "index.json"), JSON.stringify({ slugs: files }, null, 2));
console.log("Wrote index.json with slugs:", files);
