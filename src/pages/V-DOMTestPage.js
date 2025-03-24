import Component from "../core/Component.js";

export default class VDomPerformancePage extends Component {
  setup() {
    const items = Array.from({ length: 300 }, (_, i) => ({
      id: i,
      text: `Item ${i}`,
      count: 0,
    }));

    this.state = {
      items,
    };
  }

  template() {
    return `
            <div class="vdom-test">
                <h2>VDOM 성능 테스트</h2>
                <div class="list" style="display: grid; grid-template-columns: repeat(16, 1fr); gap: 12px;">
                    ${this.state.items.map(item => `
                        <div class="item" data-id="${item.id}" style="border: 1px solid #ccc; padding: 8px;">
                            <span>${item.text}</span><br />
                            <button data-id="${item.id}" class="like-button">👍 ${item.count}</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
  }

  setEvent() {
    this.addEvent("click", ".like-button", (e) => {
      const id = Number(e.target.dataset.id);
      const newItems = this.state.items.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      );
      this.setState({ items: newItems });
    });
  }
}
