export const initBlogFilter = (): void => {
  const buttons = Array.from(
    document.querySelectorAll("button.blog-filter"),
  ).filter((button): button is HTMLButtonElement => button instanceof HTMLButtonElement);

  const items = Array.from(document.querySelectorAll(".blog-item")).filter(
    (item): item is HTMLElement => item instanceof HTMLElement,
  );

  const years = Array.from(document.querySelectorAll(".blog-year")).filter(
    (section): section is HTMLElement => section instanceof HTMLElement,
  );

  const storageKey = "blog-tag";

  const setActive = (tag: string): void => {
    buttons.forEach((button) => {
      const active = button.dataset.tag === tag;
      button.toggleAttribute("aria-pressed", active);
      button.classList.toggle("bg-black", active);
      button.classList.toggle("text-white", active);
    });

    items.forEach((item) => {
      const tags = item.dataset.tags?.split(" ").filter(Boolean) ?? [];
      const visible = tag === "all" || tags.includes(tag);
      item.classList.toggle("hidden", !visible);
    });

    years.forEach((section) => {
      const hasVisibleItem = Array.from(section.querySelectorAll(".blog-item")).some(
        (item) => !item.classList.contains("hidden"),
      );
      section.classList.toggle("hidden", !hasVisibleItem);
    });
  };

  const initial = sessionStorage.getItem(storageKey) ?? "all";
  setActive(initial);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.tag ?? "all";
      sessionStorage.setItem(storageKey, tag);
      setActive(tag);
    });
  });
};
