 document.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".thumb");
  const mainPhone = document.getElementById("main-phone");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbs.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");

      const newImgSrc = thumb.getAttribute("data-img");
      
      mainPhone.style.opacity = "0";
      mainPhone.style.transform = "scale(0.96)";

      setTimeout(() => {
        mainPhone.src = newImgSrc;
        mainPhone.style.opacity = "1";
        mainPhone.style.transform = "scale(1)";
      }, 200);
    });
  });
});
