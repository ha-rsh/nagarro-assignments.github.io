const jokeElement = document.getElementById('joke')
const jokeBtn = document.getElementById('jokeBtn')

jokeBtn.addEventListener('click', generateJoke)

function generateJoke() {
  const config = {
    headers: {
      Accept: 'application/json'
    },
  }
  axios
    .get("https://icanhazdadjoke.com/", config) 
    .then(res => {
      jokeElement.innerText = res.data.joke

      // console.log(res.data)
    })
    .catch(err => console.log(err));
}
generateJoke()