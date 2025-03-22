import Component from "../../../core/Component.js";
import {uploadImageToImgBB} from "../../../api/imgbbApi.js";
import renderMarkdown from "../../../util/renderMarkdown.js";

export default class MarkdownEditor extends Component {
  setup() {
    this.state = {
      mode: "write", // "write" or "preview"
      content: this.props.initialContent || "",
    };

    this.loadCSS("/style/markdown-editor.css");
  }

  template() {
    const {mode, content} = this.state;

    return `
        <div id="markdown-editor-container">
          <div id="editor-toolbar">
            <div id="editor-toolbar-left"> 
                <button class="tab-button ${mode === "write" ? "active" : ""}" data-mode="write">작성</button>
                <button class="tab-button ${mode === "preview" ? "active" : ""}" data-mode="preview">프리뷰</button>
            </div>
            <div id="editor-toolbar-right"> 
                <button id="image-upload-button">🖼️</button>
                <span id="image-upload-status"></span>
                <input type="file" id="image-file-input" accept="image/*" hidden />
            </div>    
          </div>

        <div id="markdown-editor-layout">
          ${mode === "write" ? `
            <textarea id="markdown-textarea" placeholder="내용을 입력해주세요.">${content}</textarea>
          ` : `
            <div id="markdown-preview">${renderMarkdown(content)}</div>
          `}
        </div>
      </div>
    `;
  }

  setEvent() {
    this.addEvent("click", ".tab-button", (e) => {
      const newMode = e.target.dataset.mode;
      this.setState({mode: newMode});
    });

    this.addEvent("change", "#markdown-textarea", (e) => {
      this.setState({content: e.target.value});
    });

    this.addEvent("click", "#image-upload-button", () => {
      this.$container.querySelector("#image-file-input").click();
    });

    this.addEvent("change", "#image-file-input", async (e) => {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith("image/")) return;

      const $imageUploadStatus = this.$container.querySelector("#image-upload-status");
      $imageUploadStatus.textContent = "업로드 중...";

      try {
        const imageUrl = await uploadImageToImgBB(file);

        const imageMarkdown = `\n![image](${imageUrl})\n`;
        this.setState({content: this.state.content + imageMarkdown});
      } catch (error) {
        alert("이미지 업로드에 실패했습니다. 잠시 후 시도해주세요.");
      } finally {
        $imageUploadStatus.textContent = "";
      }
    });
  }

  getContent() {
    return this.state.content;
  }

  updated() {
    if (this.state.mode === "preview") {
      const preview = this.$container.querySelector("#markdown-preview");
      preview.innerHTML = renderMarkdown(this.state.content);
    }
  }
}
