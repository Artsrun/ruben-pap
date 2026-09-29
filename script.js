const filterButtons = document.querySelectorAll(".filter-button");
const searchInput = document.querySelector("#catalog-search");
const productCards = [...document.querySelectorAll(".product-card")];
const catalogStatus = document.querySelector("#catalog-status");
const emptyState = document.querySelector("#empty-state");
const year = document.querySelector("#year");

let activeCategory = "all";

function updateCatalog() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const categoryMatches = activeCategory === "all" || card.dataset.category === activeCategory;
    const searchMatches = card.dataset.name.includes(searchTerm);
    const isVisible = categoryMatches && searchMatches;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  catalogStatus.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "piece" : "pieces"}`;
  emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    updateCatalog();
  });
});

searchInput.addEventListener("input", updateCatalog);
year.textContent = new Date().getFullYear();
updateCatalog();
