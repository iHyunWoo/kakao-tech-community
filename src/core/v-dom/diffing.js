// 두 개의 VNode를 비교하여 어떤 DOM 변경이 필요한지 계산
export function diffing(oldVNode, newVNode) {
  // 노드 제거 및 추가
  if (!oldVNode) return { type: "CREATE", newVNode };
  if (!newVNode) return { type: "REMOVE" };

  // 텍스트 노드 비교
  if (typeof oldVNode === "string" || typeof newVNode === "string") {
    if (oldVNode !== newVNode) {
      return { type: "REPLACE", newVNode };
    } else {
      return null; // 텍스트가 같으면 아무 작업 필요 없음
    }
  }

  // 타입이 달라지면 교체
  if (oldVNode.type !== newVNode.type) {
    return { type: "REPLACE", newVNode };
  }

  // props가 변경됐다면
  const props = [];
  for (const key in { ...oldVNode.props, ...newVNode.props }) {
    if (oldVNode.props[key] !== newVNode.props[key]) {
      props.push({ key, value: newVNode.props[key] });
    }
  }

  // 자식 노드들도 재귀적으로 비교
  const children = [];
  const len = Math.max(oldVNode.children.length, newVNode.children.length);
  for (let i = 0; i < len; i++) {
    children.push(diffing(oldVNode.children[i], newVNode.children[i]));
  }

  return { type: "UPDATE", props, children };
}
