// utils/disableScroll.js
export function disableScrollOnNumberInputs() {
  document.addEventListener(
    "wheel",
    (event) => {
      if ((document.activeElement as HTMLInputElement)?.type === "number") {
        event.preventDefault();
      }
    },
    { passive: false } // Passive listeners cannot prevent default
  );
}
