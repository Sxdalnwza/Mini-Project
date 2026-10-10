import path from "node:path";
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { finalizePresentation } = await import(pathToFileURL("C:/Users/usEr/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs").href);
const root = process.cwd();
const result = await finalizePresentation({
  workspaceDir: root,
  candidatePath: path.join(root, ".codex-build", "candidate.pptx"),
  finalPath: path.join(root, "output", "portfolio-summary-canva.pptx"),
  pythonExecutable: "C:/Users/usEr/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe",
  integrityValidatorPath: "C:/Users/usEr/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/inspect_presentation_package_integrity.py",
  layoutValidatorPath: "C:/Users/usEr/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/inspect_presentation_layout_geometry.py",
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-heading-fit"],
  requiredNativeTableOwnerSlides: [],
  fontPolicy: { basis: "design", families: ["Aptos"] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(root, ".codex-build", "portfolio-summary-canva.validation.json")
});
console.log(JSON.stringify(result, null, 2));
