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
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
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
    .then((products) => {
      const row = document.getElementById("productRow");
      row.classList.add("row", "row-cols-sm-2", "row-cols-md-3", "g-4");

      products.forEach((productData) => {
        const col = document.createElement("div");
        col.classList.add("col");

        const card = document.createElement("div");
        card.classList.add("card", "mb-4", "shadow-sm", "h-100");

        card.innerHTML = `
        
        
        
        <img
        src= ${productData.imageUrl}
        class="bd-placeholder-img card-img-top"
      />
      <div class="card-body d-flex flex-column justify-content-between">
   
        <h5 class="card-title">${productData.name} - ${productData.brand}</h5>
   
    
        <p class="card-text">
          ${productData.description}
        </p>
        <p class="card-text fs-3 text-dark fw-semibold">
          ${productData.price} €
        </p>
        <div
          class="d-flex justify-content-between align-items-end"
        >

            <button
              type="button"
              class="btn btn-sm btn-info discoverButton"
            >
              Scopri di più!
            </button>
            <button
            data-bs-toggle="modal" data-bs-target="#accessModified"
              type="button"
              class="btn btn-sm btn-warning d-flex align-items-center gap-2 py-1 px-2 modifiedButton"
              
            >
              Modifica 
            </button>
        </div>
      </div>
        `;

        col.appendChild(card);
        row.appendChild(col);

        const passwordInputModal = document.querySelector(
          ".passwordInputModal"
        );

        const accessButton = document.querySelector(".accessButton");

        accessButton.addEventListener("click", () => {
          if (passwordInputModal.value === "pippo") {
            const id = productData._id;
            window.location.href = `backoffice.html?id=${id}`;
          } else {
            alert("Password errata");
          }
        });

        const discoverButton = col.querySelector(".discoverButton");
        const goToDetails = () => {
          const id = productData._id;
          window.location.href = `details.html?id=${id}`;
        };

        discoverButton.addEventListener("click", goToDetails);

        const goToBackoffice = () => {
          const id = productData._id;
          window.location.href = `backoffice.html?id=${id}`;
        };

        const modifiedButton = col.querySelector(".modifiedButton");
        modifiedButton.addEventListener("click", goToBackoffice);
      });
    })
    .catch((error) => {
      console.log(error);
      const alertContainer = document.querySelector("#alertContainer");
      alertContainer.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
      Error 404 Not Found
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
       
          `;
      const main = document.querySelector("main");
      main.remove();
      const footer = document.querySelector("footer");
      footer.remove();
    })
    .finally(() => {
      isLoading(false);
    });
};

const myPassword = "pippo";
document.getElementById("backofficeLink").style.display = "none";

const checkPassword = () => {
  let password = document.getElementById("passwordInput").value;

  if (password === myPassword) {
    document.getElementById("backofficeLink").style.display = "block";
    document.getElementById("passwordInput").style.display = "none";
    document.getElementById("passwordButton").style.display = "none";
  } else {
    alert("Password errata. Riprova.");
  }
};

document
  .getElementById("passwordButton")
  .addEventListener("click", checkPassword);
