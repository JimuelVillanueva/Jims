    const digimonCards = document.getElementById("digimonCards");
    const searchBar = document.getElementById("searchBar");

    function createCard(d) {
      digimonCards.innerHTML += `
        <div class="col-md-3">
          <div class="card h-100 text-center p-3">
            <img src="${d.img}" class="img-fluid mb-2">
            <h5 class="card-title">${d.name}</h5>
            <p>${d.level}</p>
          </div>
        </div>
      `;
    }

    fetch("https://digimon-api.vercel.app/api/digimon")
      .then(res => res.json())
      .then(data => {
        data.forEach(d => createCard(d));

        searchBar.addEventListener("input", () => {
          digimonCards.innerHTML = "";
          data
            .filter(d => d.name.toLowerCase().includes(searchBar.value.toLowerCase()))
            .forEach(d => createCard(d));
        });
      });
