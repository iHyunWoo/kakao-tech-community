import {renderVNode} from "./V-DOM.js";

// 실제 DOM에서 변경 사항 반영
export function patchToDOM($parent, patchNode, index = 0) {
  // diff에서 달라진게 없다면 리턴
  if (!patchNode) {
    return;
  }

  const $element = $parent.childNodes[index]; // 변경 대상 DOM 노드

  switch (patchNode?.type) {
    case "CREATE":
      $parent.appendChild(renderVNode(patchNode.newVNode));
      break;

    case "REMOVE":
      $parent.removeChild($element);
      break;

    case "REPLACE":
      $parent.replaceChild(renderVNode(patchNode.newVNode), $element);
      break;

    case "UPDATE":
      // 속성 변경 적용
      patchNode.props.forEach(({ key, value }) => {
        if (value === undefined) $element.removeAttribute(key);
        else $element.setAttribute(key, value);
      });

      // 자식 노드들도 재귀적으로 patch 수행
      patchNode.children.forEach((childPatch, i) => {
        patchToDOM($element, childPatch, i);
      });
      break;
  }
}
