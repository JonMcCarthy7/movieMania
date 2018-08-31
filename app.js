const searchKey = "A8zNBRQHWvmshP01cOHVZ3ef5Ej7p1AFI33jsnVUar81TT2UEf";
const button = document.getElementById("button");
const input = document.getElementById("search");
const main = document.getElementById("main");

button.addEventListener("click", e => {
  e.preventDefault();
  main.innerHTML = "";
  // mainRow.innerHTML = "";
  console.log(
    input.value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "%20")
  );

  let title = input.value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "%20");

  axios
    .get(
      `https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?country=us&term=${title}`,
      {
        headers: {
          "X-Mashape-Key": `${searchKey}`
        }
      }
    )
    .then(res => {
      localStorage["count"] = +localStorage["count"] + +"1";
      console.log("API COUNT", localStorage["count"]);
      console.log(res.data.results);
      let arr = res.data.results;
      const URL = "http://www.omdbapi.com/?i=tt3896198&apikey=e67e4b44&";
      const searchByTitle = `t=`;
      arr.forEach((el, i) => {
        if (i === 0) {
          axios.get(`${URL}${searchByTitle}${title}&plot=full`).then(res2 => {
            console.log("2nd CALL", res2.data);

            main.insertAdjacentHTML(
              "afterbegin",
              `
            <div class="row">
              <div class="col s12 m8 offset-m2">
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src=${el["picture"]}>
                    <span class="card-title">${el["name"]}</span>
                  </div>
                  <div class="card-content" id="avail${el["id"]}">

                  </div>
                    <div class="card-reveal">
                      <span class="card-title grey-text text-darken-4"><h3>${
                        el["name"]
                      }<i class="material-icons right">close</i></h3></span>
                      <p>Genre: ${res2.data.Genre}</p>
                      <p>Released: ${res2.data.Released}</p>
                      <p>Run Time: ${res2.data.Runtime}</p>
                      <p>Rated: ${res2.data.Rated}</p>
                      <p>Actors: ${res2.data.Actors}</p>
                      <p>Awards: ${res2.data.Awards}</p>
                      <p>Director: ${res2.data.Director}</p>
                      <br>
                      <h6>Plot: ${res2.data.Plot}</h6>
                  </div>
                </div>
              </div>
            </div>

          `
            );
            let avail = document.getElementById(`avail${el["id"]}`);
            el.locations.forEach(loc => {
              console.log(loc);

              avail.insertAdjacentHTML(
                "beforeend",
                `
            <span><img class="materialboxed" width="150" src=${
              loc["icon"]
            } alt="${el["name"]}"></span>

          `
              );
            });
          });
        }
        if (i !== 0) {
          main.insertAdjacentHTML(
            "beforeend",
            `
                <div class="row">
                  <div class="col s12 m8 offset-m2">
                    <div class="card">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src=${el["picture"]}>
                        <span class="card-title">${el["name"]}</span>
                      </div>
                      <div class="card-content" id="avail${el["id"]}">
    
                      </div>
                        
                    </div>
                  </div>
                </div>
    
              `
          );
          let avail = document.getElementById(`avail${el["id"]}`);
          el.locations.forEach(loc => {
            console.log(loc);

            avail.insertAdjacentHTML(
              "beforeend",
              `
            <span><img class="materialboxed" width="150" src=${
              loc["icon"]
            } alt="${el["name"]}"></span>

          `
            );
          });
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  input.value = "";
});

const pageButtons = document.querySelectorAll(".page-button");
const searchPage = document.getElementById("search-page");
const gamePage = document.getElementById("game-page");
const startGame = document.getElementById("button2");
const guessSection = document.getElementById("guess-section");
const game = document.getElementById("game");
const buttonGuess = document.getElementById("button-guess");
const guess = document.getElementById("guess");
let count = 0;

pageButtons.forEach(el => {
  el.addEventListener("click", e => {
    if (e.target.innerHTML === "Search") {
      searchPage.classList.remove("hide");
      gamePage.classList.add("hide");
      game.innerHTML = "";
    } else if (e.target.innerHTML === "Game") {
      gamePage.classList.remove("hide");
      searchPage.classList.add("hide");
      main.innerHTML = "";
    }
  });
});

startGame.addEventListener("click", e => {
  startGame.classList.toggle("hide");
  guessSection.classList.toggle("hide");

  axios
    .get(
      `https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies&count=10`,
      {
        headers: {
          "X-Mashape-Key": `${searchKey}`
        }
      }
    )
    .then(res => {
      console.log(res.data);
      const gameArr = res.data;
      game.insertAdjacentHTML(
        "beforeend",
        `
        <div class="col s12 m12">
          <div class="horizontal purple accent-4">
            <div class="card-content">
            <br>
              <h5 class="header center-align">Question</h5>
            </div>
            <div class="card-action">
              <div class="s12 m5 center-align question">
                <h4>${gameArr[0].quote}</h4>
                <br>
              </div>
            </div>
          </div>
        </div>
  `
      );
      let question = document.querySelector(`.question`);
      let playerOneScore = 0;
      let playerTwoScore = 0;

      buttonGuess.addEventListener("click", e => {
        if (guess.value) {
          console.log(count);

          console.log(count);
          if (count % 2 === 0) {
            console.log(guess.value.toLowerCase().trim());
            console.log(gameArr[count].author);
            if (
              guess.value.toLowerCase().trim() ==
              gameArr[count].author.toLowerCase()
            ) {
              playerOneScore++;
            }

            guess.value = "";
            guess.placeholder = "Player 2's turn";
          } else if (count % 2 !== 0) {
            if (
              guess.value.toLowerCase().trim() ==
              gameArr[count].author.toLowerCase()
            ) {
              playerTwoScore++;
            }

            guess.value = "";
            guess.placeholder = "Player 1's turn";
          }
          ++count;
        }

        if (count !== 10) {
          question.innerHTML = `<h4>${gameArr[count].quote}</h4> <br>`;
        }
        if (count === 10) {
          guess.value = "";
          guess.placeholder = "Game Over!";
          if (playerOneScore > playerTwoScore) {
            question.innerHTML = `<h4>Player one wins with a score of ${playerOneScore}</h4> <br>`;
          } else if (playerOneScore < playerTwoScore) {
            question.innerHTML = `<h4>Player two wins with a score of ${playerTwoScore}</h4> <br>`;
          } else {
            question.innerHTML = `<h4>The game was a tie!</h4> <br>`;
          }
        }
        console.log("Player 1", playerOneScore);
        console.log("Player 2", playerTwoScore);
      });
    });
});
