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
   document.getElementById(id).addEventListener("click", () =>
      getJoke(id)
   )
);

getJoke("Any");

// changing joke container
const update = () => jokeImgContainer.src = window.innerWidth <= 600 ? 'images/jokecontainer-mobile.webp' : 'images/jokecontainer.webp';
window.addEventListener('resize', update);
update();