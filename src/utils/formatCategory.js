export default function formatCategory(category) {
  return category
    .split("_")
    .map((word) => {
      if (word.length <= 3) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
