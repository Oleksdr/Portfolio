const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    contents.forEach(c => {
      c.classList.remove("active");
      const fc = c.querySelector(".flip-card");
      if (fc) fc.classList.remove("flipped");
    });

    const id = tab.dataset.tab;
    document.getElementById("tab-" + id).classList.add("active");
  });
});

document.querySelectorAll(".project-card").forEach(card => {
  const tabContent = card.parentElement;

  const flipCard  = document.createElement("div");
  const flipInner = document.createElement("div");
  const flipFront = document.createElement("div");
  const flipBack  = document.createElement("div");

  flipCard.className  = "flip-card";
  flipInner.className = "flip-card-inner";
  flipFront.className = "flip-card-front";
  flipBack.className  = "flip-card-back";

  const backContent = tabContent.querySelector(".project-back");

  tabContent.insertBefore(flipCard, card);
  flipCard.appendChild(flipInner);
  flipInner.appendChild(flipFront);
  flipFront.appendChild(card);
  flipInner.appendChild(flipBack);

  if (backContent) {
    flipBack.appendChild(backContent);
  }

  flipCard.addEventListener("click", () => {
    flipCard.classList.toggle("flipped");
  });
});
