// textarea에서 선택한 selection을 감싸는 함수
// test -> **test**
export default function textareaWrapSelection(textarea, before, after = "") {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  // 선택한 텍스트
  const selectedText = textarea.value.slice(start, end);

  // 선택한 텍스트 앞 뒤로 감싸기
  const newText = before + selectedText + after;
  const updatedValue =
    textarea.value.slice(0, start) + newText + textarea.value.slice(end);

  textarea.value = updatedValue;

  return {
    value: updatedValue,
    selectionStart: start + before.length,
    selectionEnd: end + before.length,
  };
}
