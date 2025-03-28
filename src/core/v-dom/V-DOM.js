/*
<div>
  안녕하세요!<p>반갑습니다.</p>
</div>

VNode 구조 예시
{
  type: "div",
  props: {},
  children: [
  "안녕하세요!",
  {
    "type": "p",
    "props": {},
    children: ["반갑습니다."]
  }
  ]
}
 */

// HTML string을 VNode 트리로 변환
export function htmlToVNode(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return domToVNode(template.content.firstChild);
}

// DOM 노드를 재귀적으로 순회하면서 VNode 트리 생성
function domToVNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    // 텍스트 노드는 그대로 text를 반환
    return node.textContent;
  }

  const type = node.nodeName.toLowerCase();
  const props = {};
  for (const attr of node.attributes) {
    props[attr.name] = attr.value;
  }

  // 자식 노드들을 재귀적으로 순회하며 array에 넣음
  const children = Array.from(node.childNodes).map(domToVNode);
  return { type, props, children };
}

// VNode 객체를 실제 DOM노드로 변환
export function renderVNode(vnode) {
  // 텍스트 노드는 TextNode로 생성
  if (typeof vnode === "string") return document.createTextNode(vnode);

  const $element = document.createElement(vnode.type);
  for (const [key, value] of Object.entries(vnode.props)) {
    $element.setAttribute(key, value);
  }

  // 자식들을 재귀적으로 변환
  vnode.children.forEach((child) => {
    $element.appendChild(renderVNode(child));
  });

  return $element;
}


