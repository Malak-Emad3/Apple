 
document.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".thumb");
  const mainPhone = document.getElementById("main-phone");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const newImgSrc = thumb.dataset.img;

      if (!newImgSrc) return;

      thumbs.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");

      mainPhone.style.opacity = "0";
      mainPhone.style.transform = "scale(0.96)";

      setTimeout(() => {
        mainPhone.src = newImgSrc;
      }, 200);
    });
  });

  mainPhone.addEventListener("load", () => {
    mainPhone.style.opacity = "1";
    mainPhone.style.transform = "scale(1)";
  });

  mainPhone.addEventListener("error", () => {
    console.error("Failed to load phone image:", mainPhone.src);
    mainPhone.style.opacity = "1";
    mainPhone.style.transform = "scale(1)";
  });
});
