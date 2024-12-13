const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const isLoading = (bool) => {
  const loader = document.getElementById("loader");
  if (bool) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

window.onload = () => {
  isLoading(true);
  fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWFmM2QyMjA3MTAwMTVkZTJmMzEiLCJpYXQiOjE3MzQwODU1MDksImV4cCI6MTczNTI5NTEwOX0.G-uuKL9gqj1_v-NwBc5hhWrPbmT4JR5livTjzlkMKXQ",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request failed!");
      }
    })
    .then((product) => {
      const footer = document.querySelector("footer");
      footer.classList.remove("d-none");

      const container = document.getElementById("detailsRow");

      const randomNumber = Math.floor(Math.random() * 100000);

      container.innerHTML = `
        
        
        <p>
        Articolo Numero | ${randomNumber} | ${product.brand}
      </p>
      <div class="col-lg-8 w-50">
        <div
          class="d-flex flex-column align-items-start justify-content-between w-75"
        >
          <h2>${product.name}</h2>
          <div id="imgWrapper">
            <img
              src=${product.imageUrl}
              alt=""
              class="img-fluid h-50"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-4 dettaglio">
        <div
          class="d-flex flex-column align-items-end justify-content-between"
        >
          <p class="fs-1 text-dark fw-semibold testoMedia">${product.price} €</p>
          <span class="text-dark testoSmall">
            I prezzi degli articoli in vendita su Amazon includono l’IVA. In base all’indirizzo di spedizione, l’IVA potrebbe variare durante il processo di acquisto.Per maggiori informazioni <a href="#">clicca qui</a>. </span
          >
          <hr class="w-100" />
          <p>${product.description}</p>
          <hr class="w-100" />
          <div
            class="d-flex flex-row justify-content-between align-items-center w-100 gap-2"
          >
            <button class="btn btn-warning" style="width: 80%">
              <i class="bi bi-cart"></i> Aggiungi al carrello
            </button>

            <button class="btn btn-outline-secondary">
              <i class="bi bi-bookmark-heart text-dark"></i>
            </button>
          </div>
         

        </div>
        <a href="./index.html" class="btn btn-outline-secondary my-5 text-decoration-none">Torna alla homepage</a>
      </div>
        
        `;
    })
    .catch((error) => {
      const alertContainer = document.querySelector("#alertContainer");
      alertContainer.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
        There was some problem, the product was not found
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
         
            `;
    })
    .finally(() => {
      isLoading(false);
    });
};
