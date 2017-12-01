const div = document.createElement('div')
export default function stripHTMLTags (html) {
  div.innerHTML = html
  return div.textContent || div.innerText || ""
}