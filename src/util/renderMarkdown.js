export default function renderMarkdown(markdown) {
  return markdown
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/!\[image\]\((.*?)\)/gim, '<img src="$1" alt="image" style="max-width: 100%; max-height: 200px" />')
    .replace(/\n/g, "<br>");
}
