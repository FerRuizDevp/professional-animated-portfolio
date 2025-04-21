document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(
    ".autoBlur, .autoDisplay, .fadeInRight"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-active");
          console.log("Added scroll-active to:", entry.target);
        } else {
          entry.target.classList.remove("scroll-active"); // Optional: remove class when out of view
          console.log("Removed scroll-active from:", entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
});
