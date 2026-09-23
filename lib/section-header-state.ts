export function isSectionActionInteractive(onPress?: () => void): boolean {
  return typeof onPress === "function";
}
