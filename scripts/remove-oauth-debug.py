from pathlib import Path

path = Path("app/oauth/callback.tsx")
text = path.read_text()
output = []
i = 0
while i < len(text):
    start = text.find("console.", i)
    if start == -1:
        output.append(text[i:])
        break
    output.append(text[i:start])
    paren = text.find("(", start)
    if paren == -1:
        output.append(text[start:])
        break
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
        output.append(text[start:])
        break
else:
    raise RuntimeError("Unexpected parser state")

path.write_text("".join(output))
