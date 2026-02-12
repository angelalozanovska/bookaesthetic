const params = new URLSearchParams(window.location.search);
const poemId = params.get("id");

const titleEl = document.getElementById("poem-title");
const photoEl = document.getElementById("poem-photo");
const textEl = document.getElementById("poem-text");

if (!poemId) {
  titleEl.textContent = "Поема";
  textEl.textContent = "Нема избрана поема.";
} else {
  fetch("./poetry.json")
    .then((res) => {
      if (!res.ok) throw new Error("Poetry metadata missing");
      return res.json();
    })
    .then((data) => {
      const allPoems = [...(data.myWords || []), ...(data.borrowedWords || [])];
      const poem = allPoems.find((item) => item.id === poemId);

      if (!poem) {
        titleEl.textContent = "Поема";
        textEl.textContent = "Поемата не постои.";
        photoEl.style.display = "none";
        return;
      }

      titleEl.textContent = poem.title || "Поема";
      if (poem.image) {
        photoEl.src = poem.image;
        photoEl.alt = "poem image";
      } else {
        photoEl.style.display = "none";
      }

      return fetch(`./${poemId}.txt`)
        .then((res) => {
          if (!res.ok) throw new Error("Poem text missing");
          return res.text();
        })
        .then((text) => {
          textEl.textContent = text;
        });
    })
    .catch(() => {
      if (!textEl.textContent) {
        textEl.textContent = "Поемата не е достапна.";
      }
    });
}
