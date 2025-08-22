const catCards = document.querySelectorAll(".cat-card");
let isDragging = false;
let startX = 0;
let activeCard = null;
const threshold = 150;
let currentX = 0;

function updateIcons(card, direction) {
  const likedIcon = card.icons[0];
  const dislikedIcon = card.icons[1];

  if (direction < 0) {
    likedIcon.classList.add("liked");
    dislikedIcon.classList.remove("disliked");
  } else if (direction > 0) {
    dislikedIcon.classList.add("disliked");
    likedIcon.classList.remove("liked");
  } else {
    likedIcon.classList.remove("liked");
    dislikedIcon.classList.remove("disliked");
  }
}

catCards.forEach((card) => {
  card.addEventListener("mousedown", function (e) {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    activeCard = this;
    activeCard.style.transition = "none";
    activeCard.icons = document.querySelectorAll(".icon i");
  });
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging || !activeCard) return;
  currentX = e.clientX - startX;
  const rotation = currentX / 25;
  activeCard.style.transform = `translate(-50%, -50%) translateX(${currentX}px) rotate(${rotation}deg)`;

  updateIcons(activeCard, currentX);

  if (Math.abs(currentX) > threshold) {
    Object.assign(activeCard.style, {
      opacity: "0",
      transition: "opacity 0.3s ease",
    });
    updateIcons(activeCard, 0);
    setTimeout(() => {
      if (activeCard) activeCard.remove();
      activeCard = null;
      isDragging = false;
    }, 300);
  }
});

document.addEventListener("mouseup", () => {
  if (!isDragging || !activeCard) return;

  if (Math.abs(currentX) <= threshold) {
    Object.assign(activeCard.style, {
      transform: "translate(-50%, -50%) rotate(0deg)",
      opacity: "1",
      transition: "transform 0.3s ease, opacity 0.3s ease",
    });

    updateIcons(activeCard, 0);
  }

  isDragging = false;
  activeCard = null;
});

catCards.forEach((card) => {
  card.addEventListener("touchstart", function (e) {
    e.preventDefault();
    isDragging = true;
    startX = e.touches[0].clientX;
    activeCard = this;
    activeCard.style.transition = "none";
    activeCard.icons = document.querySelectorAll(".icon i");
  });
});
document.addEventListener("touchmove", (e) => {
  if (!isDragging || !activeCard) return;
  const touch = e.touches[0];
  currentX = touch.clientX - startX;
  const rotation = currentX / 25;
  activeCard.style.transform = `translate(-50%, -50%) translateX(${currentX}px) rotate(${rotation}deg)`;
  updateIcons(activeCard, currentX);
  if (Math.abs(currentX) > threshold) {
    Object.assign(activeCard.style, {
      opacity: "0",
      transition: "opacity 0.3s ease",
    });
    updateIcons(activeCard, 0);
    setTimeout(() => {
      if (activeCard) activeCard.remove();
      activeCard = null;
      isDragging = false;
    }, 300);
  }
});
document.addEventListener("touchend", () => {
  if (!isDragging || !activeCard) return;

  if (Math.abs(currentX) <= threshold) {
    Object.assign(activeCard.style, {
      opacity: "1",
      transform: "translate(-50%, -50%) rotate(0deg)",
      transition: "transform 0.3s ease, opacity 0.3s ease",
    });
    updateIcons(activeCard, 0);
  }
  activeCard = null;
  isDragging = false;
});
