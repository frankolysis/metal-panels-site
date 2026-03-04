const { spawn } = require("child_process");
const path = require("path");

const projectDir = __dirname;
const nextBin = path.join(projectDir, "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [nextBin, "dev", "--port", "4001"], {
  cwd: projectDir,
  stdio: ["pipe", process.stdout, process.stderr],
  env: { ...process.env, NODE_ENV: "development" },
});

child.on("close", (code) => {
  process.exit(code ?? 1);
});

["SIGTERM", "SIGINT", "SIGHUP"].forEach((sig) => {
  process.on(sig, () => {
    child.kill(sig);
  });
});
