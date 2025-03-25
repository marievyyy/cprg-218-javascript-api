const clickSound = new Audio('click-pixabay.mp3');
const bgm = new Audio('game-music-pixabay.mp3');

// Get a random joke
function getJoke(category) {
   fetch(`https://v2.jokeapi.dev/joke/${category}?safe-mode`)
      .then(response => response.json())
      .then(data => {
         console.log(data);
         joke.textContent =
            data.type === "single" ? data.joke : `${data.setup} ... ${data.delivery}`;
         jokeTitle.textContent = category === "Any"
            ? "Joke Of The Day"
            : category === "pun"
               ? "A Random Pun"
               : `A Random ${category.charAt(0).toUpperCase() + category.slice(1)} Joke`;
      });
}

// Get a new joke when the button is clicked
["programming", "miscellaneous", "pun", "spooky", "christmas"].forEach(id =>
   document.getElementById(id).addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
      getJoke(id);
   }
   )
);

getJoke("Any");

// Try to play automatically on page load
window.addEventListener('load', () => {
   bgm.play().then(() => {
      bgmToggle.textContent = 'Pause Music';
   }).catch(err => {
      console.warn('Autoplay was prevented:', err);
      bgmToggle.textContent = 'Play Music'; // update text if autoplay fails
   });
});

bgmToggle.addEventListener('click', () => {
   if (bgm.paused) {
      bgm.play();
      bgmToggle.textContent = 'Pause Music';
   } else {
      bgm.pause();
      bgmToggle.textContent = 'Play Music';
   }
});
bgm.loop = true;

// changing joke container
const update = () => jokeImgContainer.src = window.innerWidth <= 600 ? 'images/jokecontainer-mobile.webp' : 'images/jokecontainer.webp';
window.addEventListener('resize', update);
update();