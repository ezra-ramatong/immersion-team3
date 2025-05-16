export function createElement(tag, classNames = [], attributes = {}) {
  const el = document.createElement(tag);
  classNames.forEach((cls) => el.classList.add(cls));
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  return el;
}

export function clearElement(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

export function appendChildren(parent, children) {
  children.forEach((child) => parent.appendChild(child));
}

export function createButton(text, onClick, classNames = []) {
  const btn = createElement("button", classNames);
  btn.textContent = text;
  btn.addEventListener("click", onClick);
  return btn;
}
