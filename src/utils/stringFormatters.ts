export function formatCamelCase(str: string) {
  if (!str) return "Not specified";

  // Insert a space before each uppercase letter and convert to lowercase
  const formatted = str.replace(/([A-Z])/g, " $1").toLowerCase();

  // Capitalize the first letter of the first word
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function isValidLink(link: string) {
  return link.startsWith("http://") || link.startsWith("https://");
}
