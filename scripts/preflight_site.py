from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
VARIABLES = ROOT / "_variables.yml"

VAR_PATTERN = re.compile(r"\{\{<\s*var\s+([A-Za-z0-9_.-]+)\s*>\}\}")
QMD_LINK_PATTERN = re.compile(r"\]\(([^)]+\.qmd)(?:#[^)]+)?\)")
URL_PATTERN = re.compile(r"https?://[^\s\"')>]+")


def get_nested(data: dict, dotted_key: str):
    current = data
    for part in dotted_key.split("."):
        if not isinstance(current, dict) or part not in current:
            raise KeyError(dotted_key)
        current = current[part]
    return current


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    if not VARIABLES.exists():
        print("ERROR: _variables.yml not found at repository root.")
        return 1

    try:
        data = yaml.safe_load(VARIABLES.read_text(encoding="utf-8")) or {}
    except Exception as exc:
        print(f"ERROR: YAML parse failed: {exc}")
        return 1

    # 1) Form URL safety: the W06 incident showed that a literal double
    # hyphen in a Form ID can be transformed by Pandoc smart punctuation.
    forms = data.get("forms", {})
    for week, mapping in forms.items():
        if not isinstance(mapping, dict):
            errors.append(f"forms.{week} must be a mapping.")
            continue

        for kind, value in mapping.items():
            if not isinstance(value, str):
                errors.append(f"forms.{week}.{kind} is not a string.")
                continue

            if "REPLACE_WITH_" in value:
                errors.append(f"Unresolved form placeholder: forms.{week}.{kind}")

            if "–" in value or "—" in value:
                errors.append(
                    f"Typography dash found inside form URL: forms.{week}.{kind}"
                )

            if "--" in value:
                errors.append(
                    f"Unsafe literal double hyphen in form URL: forms.{week}.{kind}. "
                    "Encode it as %2D%2D before rendering."
                )

            if value.startswith("http") and not value.startswith("https://"):
                warnings.append(f"Non-HTTPS form URL: forms.{week}.{kind}")

    # 2) Check every Quarto var reference against _variables.yml.
    qmd_files = sorted(ROOT.rglob("*.qmd"))
    for qmd in qmd_files:
        text = qmd.read_text(encoding="utf-8")

        for key in VAR_PATTERN.findall(text):
            try:
                value = get_nested(data, key)
            except KeyError:
                errors.append(
                    f"Unknown variable in {qmd.relative_to(ROOT)}: {key}"
                )
                continue

            if isinstance(value, str) and "REPLACE_WITH_" in value:
                errors.append(
                    f"Placeholder used by {qmd.relative_to(ROOT)}: {key}"
                )

        # 3) Check internal .qmd links.
        for target in QMD_LINK_PATTERN.findall(text):
            if target.startswith(("http://", "https://")):
                continue
            resolved = (qmd.parent / target).resolve()
            if not resolved.exists():
                errors.append(
                    f"Broken internal QMD link in {qmd.relative_to(ROOT)}: {target}"
                )

        # 4) Detect literal URLs containing typographic dash or --.
        for url in URL_PATTERN.findall(text):
            if "–" in url or "—" in url:
                errors.append(
                    f"Typography dash inside literal URL in {qmd.relative_to(ROOT)}: {url}"
                )
            if "--" in url:
                warnings.append(
                    f"Literal URL contains -- in {qmd.relative_to(ROOT)}. "
                    "Prefer percent-encoding if it must survive Pandoc smart punctuation."
                )

    print("DSA261 preflight")
    print("=" * 60)
    print(f"QMD files checked: {len(qmd_files)}")

    if warnings:
        print("\nWarnings:")
        for item in warnings:
            print(f"  WARN: {item}")

    if errors:
        print("\nErrors:")
        for item in errors:
            print(f"  ERROR: {item}")
        print(f"\nFAILED: {len(errors)} error(s), {len(warnings)} warning(s).")
        return 1

    print(f"\nPASSED: 0 errors, {len(warnings)} warning(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
