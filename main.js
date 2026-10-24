
document.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".thumb");
  const mainPhone = document.getElementById("main-phone");

  if (!mainPhone || thumbs.length === 0) {
    console.error("Phone image or color thumbnails not found.");
    return;
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const newImgSrc = thumb.dataset.img;

      if (!newImgSrc) return;

      if (mainPhone.getAttribute("src") === newImgSrc) return;

      thumbs.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");

      mainPhone.style.opacity = "0";
      mainPhone.style.transform = "scale(0.96)";

      const newImage = new Image();

      newImage.onload = () => {
        mainPhone.src = newImgSrc;
        mainPhone.style.opacity = "1";
        mainPhone.style.transform = "scale(1)";
      };

      newImage.onerror = () => {
        console.error("Failed to load image:", newImgSrc);
        mainPhone.style.opacity = "1";
        mainPhone.style.transform = "scale(1)";
      };

      newImage.src = newImgSrc;
    });
  });
});
