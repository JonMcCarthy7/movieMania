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

const game = document.getElementById("game");
const gameButton = document.getElementById("game-button");
const headerRow = document.querySelector(".header-row");
gameButton.addEventListener("click", e => {
  console.log(e);
  headerRow.style.display = "none";
  // main.style.position = "absolute";
  // main.style.visibility = "hidden";
});
