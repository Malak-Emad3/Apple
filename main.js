 
document.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".thumb");
  const mainPhone = document.getElementById("main-phone");
  const navLinks = document.querySelectorAll("nav ul li a");

  const allPhonesImage = "images/main-pic.png";

  const defaultGlow = "#278BFF";

  const colorGlows = [
    "#C7CBD1",
    "#151923",
    "#F4A6B8",
    "#A78BFA"
  ];

  if (!mainPhone) {
    console.error("Main phone image not found.");
    return;
  }

  function updateGlow(color) {
    document.documentElement.style.setProperty(
      "--phone-glow",
      color
    );

    document.documentElement.style.setProperty(
      "--accent",
      color
    );
  }

  function updateActiveThumb(selectedThumb = null) {
    thumbs.forEach((thumb) => {
      const isActive = thumb === selectedThumb;

      thumb.classList.toggle("active", isActive);
      thumb.setAttribute("aria-pressed", String(isActive));
    });
  }

  function changeMainImage(imagePath) {
    if (mainPhone.getAttribute("src") === imagePath) {
      return;
    }

    const newImage = new Image();

    newImage.onload = () => {
      mainPhone.style.opacity = "0";

      window.setTimeout(() => {
        mainPhone.src = imagePath;
        mainPhone.style.opacity = "1";
      }, 120);
    };

    newImage.onerror = () => {
      console.error("Failed to load image:", imagePath);
      mainPhone.style.opacity = "1";
    };

    newImage.src = imagePath;
  }

  function selectPhoneColor(thumb, index) {
    const imagePath = thumb.dataset.img;

    if (!imagePath) {
      console.error("Image path missing from thumbnail.");
      return;
    }

    if (thumb.classList.contains("active")) {
      updateActiveThumb();
      changeMainImage(allPhonesImage);
      updateGlow(defaultGlow);
      return;
    }

    const color = thumb.dataset.color ||
      colorGlows[index % colorGlows.length];

    updateActiveThumb(thumb);
    updateGlow(color);
    changeMainImage(imagePath);
  }

  thumbs.forEach((thumb, index) => {
    thumb.setAttribute("role", "button");
    thumb.setAttribute("tabindex", "0");
    thumb.setAttribute("aria-pressed", "false");

    thumb.addEventListener("click", () => {
      selectPhoneColor(thumb, index);
    });

    thumb.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectPhoneColor(thumb, index);
      }
    });
  });

  updateActiveThumb();
  updateGlow(defaultGlow);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });

  function updateResponsiveState() {
    const width = window.innerWidth;

    document.body.classList.toggle(
      "mobile-screen",
      width <= 600
    );

    document.body.classList.toggle(
      "tablet-screen",
      width > 600 && width <= 900
    );

    document.body.classList.toggle(
      "desktop-screen",
      width > 900
    );
  }

  updateResponsiveState();

  window.addEventListener("resize", updateResponsiveState);
});
