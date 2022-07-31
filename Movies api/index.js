$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
      let searchText = $('#searchText').val();
      console.log(searchText)
      getMovies(searchText);
      e.preventDefault();
    });
  });

  apikey = "e2b2ac66";
  
  function getMovies(searchText){
    $("#containerbody").hide()
    axios.get(`https://www.omdbapi.com/?t=${searchText}&apikey=${apikey}`)
      .then((response) => {
        console.log(response);
        let movie = response.data;
        let output =`
        <div class="row">
          <div class="col-md-3">
            <img src="${movie.Poster}" class="thumbnail rounded">
          </div>
          <div class="col-md-8">
            <h2 style="position:relative; left:2rem">${movie.Title}</h2>
            <ul class="list-group" style="position:relative; top:3rem; left:2rem" >
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row" style="position:relative; top:2rem">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
  }
