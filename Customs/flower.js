window.onload = () => {
  // Remove the container class so animations can run (if present)
  document.body.classList.remove("container");

  // Make flowers appear with a slight delay for smoother animation
  const flowers = document.querySelector(".flowers");
  setTimeout(() => {
    flowers.classList.add("show");
  }, 100); // 100ms delay to prevent instant pop-in
};