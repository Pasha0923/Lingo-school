export function closeByEsc(func) {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      func();
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}
