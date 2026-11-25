import { mkdirSync, writeFileSync } from "node:fs";

const line =
  "I told my calendar I needed a break; it scheduled a meeting about it.";

// Gate guard: the bounty only accepts 1-140 chars of non-blank UTF-8 text.
const text = line.trim();
if (text.length === 0 || text.length > 140) {
  throw new Error(`entry must be 1-140 chars, got ${text.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
