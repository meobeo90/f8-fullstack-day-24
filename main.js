const catCards = document.querySelectorAll(".cat-card");
let isDragging = false;
let startX = 0;
let activeCard = null;

catCards.forEach((card) => {
  card.addEventListener("mousedown", function (e) {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    activeCard = this;
  });
});

document.addEventListener("mousemove", function (e) {
  if (!isDragging || !activeCard) return;
  const distanceX = e.clientX - startX;
  const rotation = distanceX / 20;
  console.log(rotation);

  //   const opacity = 1 - Math.abs(distanceX) / 100;
  //   activeCard.style.opacity = opacity;
  activeCard.style.transform = `translate(-50%, -50%), translateX(${distanceX}px), rotate(${rotation}deg)`;
  const currentLocation = Math.abs(rotation);
  if (currentLocation >= 25) {
    if (distanceX > 0) {
      activeCard.classList.add("right");
    } else {
      activeCard.classList.add("left");
    }
  }
});

// document.addEventListener("mouseup", function (e) {
//   if (isDragging) {
//     activeCard.style.opacity = "1";
//     activeCard.style.transform = "translate(-50%, -50%)";
//     isDragging = false;
//     activeCard = null;
//   }
// });
