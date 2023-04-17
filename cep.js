console.log("=== CEP ===");

if(!localStorage.getItem("enderecos")) {
    localStorage.setItem("enderecos", JSON.stringify([]));
}

let listaDeEnderecos = JSON.parse(localStorage.getItem("enderecos")) || [];

// Actions

onload = getLocalStorage();
/*
function onlyNumbers() {
    this.value = this.value.replace(/\D+/g, "");
}

function validateEntry() {
    if (this.value.length === 8) {
        this.classList.remove("error");
        getAddress(this.value);
        this.value = "";
    } else {
        this.classList.add("error");
        this.focus();
    }
}*/

function getAddress(postalCode) {
    console.log("get address", arguments[0], postalCode);

    // endpoint
    const endpoint = `https://viacep.com.br/ws/${postalCode}/json/`;
    console.log("Endpoint: " + endpoint);

    // config
    const config = {
        method: "GET"
    };

    // request
    fetch(endpoint, config)
        .then(resp => resp).then(resp=>resp.json())
        .then(getAddressSuccess)
        .catch(getAddressError);
}

function getAddressSuccess(address) {
    saveLocalStorage(address);
}

function saveLocalStorage(address) {
    listaDeEnderecos.push(address);
    localStorage.setItem("enderecos", JSON.stringify(listaDeEnderecos));
}

function getLocalStorage() {
    if(localStorage.getItem("enderecos")) {
        const card = document.querySelector(".cards");
        card.innerHTML = JSON.parse(localStorage.getItem("enderecos")).map(function(item) {
            return `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">${item.logradouro}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${item.bairro} - ${item.localidade} - ${item.uf}</h6>
                        <p class="card-text">${item.cep}</p>
                    </div>
                </div>`
        }).join('');
    } else {
        card.innerHTML = `<p>Consultas não foram salvas.</p>`
    }
}

function getAddressError(e) {
    //alert("CEP inválido! Favor, digite um novo CEP!")
    console.log("deu ruim!", e);
}

// Mapping Events
//document.querySelector("#cep").addEventListener("input", onlyNumbers);
//document.querySelector("#cep").addEventListener("focusout", validateEntry);
document.querySelector(".btn").addEventListener("click", (evento)=>{
    event.preventDefault()
    getAddress(document.querySelector("#cep").value);
    getLocalStorage();
});