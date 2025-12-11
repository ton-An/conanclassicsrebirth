import { spawn } from "child_process";
import * as os from "os";

// ========================================================
// 🔧 CONFIGURATION
// ========================================================
const IGNORE_PATTERNS: RegExp[] = [
  // Hides all errors from shadcn components
  /src\/shadcn/,
  // Hides specific feature folders if you want
  // /features\/saunaDetails/,
];
// ========================================================

const isWindows = os.platform() === "win32";
const cmd = isWindows ? "npx.cmd" : "npx";

// ⭐️ KEY FIX: Added '--pretty' to force full error formatting
const args = [
  "vue-tsc",
  "-p",
  "tsconfig.app.json",
  "--watch",
  "--noEmit",
  "--pretty",
];

const child = spawn(cmd, args, {
  env: { ...process.env, FORCE_COLOR: "1" }, // Forces colors
  shell: true,
});

let buffer: string = "";

if (child.stdout) {
  child.stdout.on("data", (chunk: Buffer) => {
    const text = chunk.toString("utf8");
    buffer += text;

    // 1. Handle Watch Mode "Clear Screen" codes
    if (text.includes("\x1Bc") || text.includes("\u001b[2J")) {
      process.stdout.write(text);
      buffer = "";
      return;
    }

    // 2. Handle Status Messages (e.g. "Found 203 errors")
    // These usually don't have double newlines, so we print them immediately
    if (buffer.match(/Found.*error|Starting|File change/i)) {
      process.stdout.write(buffer);
      buffer = "";
      return;
    }

    // 3. Process Error Blocks
    // With --pretty, errors are separated by a blank line (\n\n) or sometimes \r\n\r\n
    const separator = buffer.includes("\r\n\r\n") ? "\r\n\r\n" : "\n\n";

    if (buffer.includes(separator)) {
      const parts = buffer.split(separator);

      // Keep the last part in buffer (it might be incomplete)
      buffer = parts.pop() || "";

      let hiddenCount = 0;

      parts.forEach((part) => {
        // Check against ignore list
        const shouldIgnore = IGNORE_PATTERNS.some((regex) => regex.test(part));

        if (!shouldIgnore) {
          // Print the error block + the separator we removed
          process.stdout.write(part + separator);
        } else {
          hiddenCount++;
        }
      });
    }
  });
}

if (child.stderr) {
  child.stderr.pipe(process.stderr);
}

child.on("close", (code) => process.exit(code || 0));
