export function showPage(pageId) {
  const pages = document.querySelectorAll(".screen");
  pages.forEach((page) => {
    page.classList.add("hidden");
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.remove("hidden");
    targetPage.classList.add("active");
  } else {
    console.warn(`Page with id ${pageId} not found!`);
  }
}
