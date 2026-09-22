from pathlib import Path


def strip_console_calls(path: Path) -> None:
    text = path.read_text()
    output = []
    i = 0
    while i < len(text):
        starts = [text.find("console.log(", i), text.find("console.warn(", i), text.find("console.debug(", i)]
        starts = [value for value in starts if value >= 0]
        if not starts:
            output.append(text[i:])
            break
        start = min(starts)
        output.append(text[i:start])
        paren = text.find("(", start)
        depth = 0
        quote = None
        escaped = False
        j = paren
        while j < len(text):
            ch = text[j]
            if quote:
                if escaped:
                    escaped = False
                elif ch == "\\":
                    escaped = True
                elif ch == quote:
                    quote = None
            elif ch in "'\"`":
                quote = ch
            elif ch == "(":
                depth += 1
            elif ch == ")":
                depth -= 1
                if depth == 0:
                    j += 1
                    if j < len(text) and text[j] == ";":
                        j += 1
                    while j < len(text) and text[j] in " \t":
                        j += 1
                    if j < len(text) and text[j] == "\n":
                        j += 1
                    i = j
                    break
            j += 1
        else:
            raise RuntimeError(f"Could not parse console call in {path}")
    path.write_text("".join(output))


for filename in ("hooks/use-auth.ts", "lib/theme-provider.tsx"):
    strip_console_calls(Path(filename))
