import { mkdirSync, writeFileSync } from "node:fs";

const line =
  "I asked my bank for a loan; it laughed so hard it charged me an overdraft fee.";

// Gate guard: the bounty only accepts 1-140 chars of non-blank UTF-8 text.
// Also guard byte length so a multi-byte line can never slip past the char gate.
const text = line.trim();
if (text.length === 0 || text.length > 140) {
  throw new Error(`entry must be 1-140 chars, got ${text.length}`);
}
if (Buffer.byteLength(text, "utf8") > 140) {
  throw new Error(
    `entry must be <=140 bytes, got ${Buffer.byteLength(text, "utf8")}`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
