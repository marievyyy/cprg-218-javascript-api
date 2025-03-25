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
            : category === "Pun"
               ? "A Random Pun"
               : `A Random ${category} Joke`;
      });
}

// Get a new joke when the button is clicked
["programming", "miscellaneous", "pun", "spooky", "christmas"].forEach(id =>
   document.getElementById(id).addEventListener("click", () =>
      getJoke(id)
   )
);

getJoke("Any");
