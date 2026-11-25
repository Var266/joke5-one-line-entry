// One Line, One Laugh — bank loan joke entry.
// Writes one 78-character line to /output/entry.txt.
import { promises as fsp } from "node:fs";

const JOKE_LINE =
  "I asked my bank for a loan; it laughed so hard it charged me an overdraft fee.";
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = "/output/entry.txt";
const CHAR_LIMIT = 140;

function checkedLine(raw: string): string {
  const cleaned = raw.trim();
  if (cleaned.length === 0) {
    throw new Error("entry line must not be blank");
  }
  if (cleaned.length > CHAR_LIMIT) {
    throw new Error(
      `entry line is ${cleaned.length} chars, limit is ${CHAR_LIMIT}`,
    );
  }
  const bytes = new TextEncoder().encode(cleaned).length;
  if (bytes > CHAR_LIMIT) {
    throw new Error(`entry line is ${bytes} bytes, limit is ${CHAR_LIMIT}`);
  }
  return cleaned;
}

async function run(): Promise<void> {
  const entry = checkedLine(JOKE_LINE);
  await fsp.mkdir(OUTPUT_DIR, { recursive: true });
  await fsp.writeFile(OUTPUT_PATH, entry, { encoding: "utf8" });
  // Round-trip check: what landed on disk must be exactly what we validated.
  const roundTrip = await fsp.readFile(OUTPUT_PATH, "utf8");
  if (roundTrip !== entry) {
    throw new Error("round-trip check failed: entry.txt does not match");
  }
}

run().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
