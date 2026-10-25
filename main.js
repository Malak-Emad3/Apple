 
document.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".thumb");
  const mainPhone = document.getElementById("main-phone");
  const navLinks = document.querySelectorAll("nav ul li a");

  if (!mainPhone) {
    console.error("Main phone image not found.");
    return;
  }

  const colorGlows = [
    "#278BFF",
    "#C7CBD1",
    "#151923",
    "#F4A6B8",
    "#A78BFA"
  ];

  function updatePhoneGlow(thumb, index) {
    const customColor = thumb.dataset.color;
    const glowColor = customColor || colorGlows[index % colorGlows.length];

    document.documentElement.style.setProperty(
      "--phone-glow",
      glowColor
    );

    document.documentElement.style.setProperty(
      "--accent",
      glowColor
    );
  }

  function selectPhoneColor(thumb, index) {
    const newImgSrc = thumb.dataset.img;

    if (!newImgSrc) {
      console.error("Image path missing from thumbnail.");
      return;
    }

    thumbs.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-pressed");
    });

    thumb.classList.add("active");
    thumb.setAttribute("aria-pressed", "true");

    updatePhoneGlow(thumb, index);

    if (mainPhone.getAttribute("src") === newImgSrc) {
      return;
    }

    const newImage = new Image();

    newImage.onload = () => {
      mainPhone.style.opacity = "0";

      window.setTimeout(() => {
        mainPhone.src = newImgSrc;
        mainPhone.style.opacity = "1";
      }, 120);
    };

    newImage.onerror = () => {
      console.error("Failed to load image:", newImgSrc);
      mainPhone.style.opacity = "1";
    };

    newImage.src = newImgSrc;
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

  const initialThumb = Array.from(thumbs).find((thumb) => {
    return thumb.dataset.img === mainPhone.getAttribute("src");
  }) || thumbs[0];

  if (initialThumb) {
    const initialIndex = Array.from(thumbs).indexOf(initialThumb);

    thumbs.forEach((thumb) => thumb.classList.remove("active"));
    initialThumb.classList.add("active");
    initialThumb.setAttribute("aria-pressed", "true");

    updatePhoneGlow(initialThumb, initialIndex);
  }

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

    document.body.classList.toggle("mobile-screen", width <= 600);
    document.body.classList.toggle(
      "tablet-screen",
      width > 600 && width <= 900
    );
    document.body.classList.toggle("desktop-screen", width > 900);
  }

  updateResponsiveState();

  window.addEventListener("resize", updateResponsiveState);
});
