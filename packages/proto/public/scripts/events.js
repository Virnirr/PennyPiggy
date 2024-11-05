function toggleDarkMode(target, checked) {
    const customEvent = new CustomEvent(
      "dark-mode:toggle", {
      bubbles: true,
      composed: true,
      detail: { checked },
    });
    target.dispatchEvent(customEvent);
}

document.body.addEventListener("dark-mode:toggle", (event) => {
  console.log("Something happened here");
  const page = event.currentTarget;
  const checked = event.detail.checked;
  page.classList.toggle("dark-mode", checked);
});