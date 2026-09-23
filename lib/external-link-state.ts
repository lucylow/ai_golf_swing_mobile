export type ExternalLinkPlatform = "web" | "native";
export type ExternalLinkAction = "default" | "open-in-app-browser" | "ignore";

export function externalLinkAction(
  platform: ExternalLinkPlatform,
  isOpening: boolean,
): ExternalLinkAction {
  if (isOpening) return "ignore";
  return platform === "web" ? "default" : "open-in-app-browser";
}
