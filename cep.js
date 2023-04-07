console.log("=== CEP ===");

// Actions

function onlyNumbers() {
    this.value = this.value.replace(/\D+/g, "");
}

function validateEntry() {
    if (this.value.length === 8) {
        this.classList.remove("error");
        getAddress(this.value);
    } else {
        this.classList.add("error");
        this.focus();
    }
}

function getAddress(postalCode) {
    console.log("get address", arguments[0], postalCode);

    // endpoint
    const endpoint = `https://viacep.com.br/ws/${postalCode}/json/`;
    console.log(endpoint);

    // config
    const config = {
        method: "GET"
    };

    // request
    fetch(endpoint, config)
        .then(function(resp) { return resp.json(); })
        .then(getAddressSuccess)
        .catch(getAddressError);
}

function getAddressSuccess(address) {
    const { logradouro, cep, localidade, uf, bairro } = address;

    const card = `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">${logradouro}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${bairro} - ${localidade} - ${uf}</h6>
                        <p class="card-text">${cep}</p>
                    </div>
                </div>`

    document.querySelector(".cards").innerHTML = card;
}

function getAddressError() {
    console.log("deu ruim 1!");
}

// Mapping Events
document.querySelector("#cep").addEventListener("input", onlyNumbers);
document.querySelector("#cep").addEventListener("focusout", validateEntry);