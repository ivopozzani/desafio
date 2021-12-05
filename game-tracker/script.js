// let ofertas = [
//   {
//     title: "RAGE 2",
//     salePrice: "0,00",
//     normalPrice: "199,00",
//     thumb: "assets/imgs/548570.jpg",
//   },
//   {
//     title: "Batman™: Arkham Knight",
//     salePrice: "12,49",
//     normalPrice: "49,99",
//     thumb: "assets/imgs/208650.jpg",
//   },
//   {
//     title: "The Sims™ 4",
//     salePrice: "39,75",
//     normalPrice: "159,00",
//     thumb: "assets/imgs/1222670.jpg",
//   },
//   {
//     title: "Street Fighter V",
//     salePrice: "15,99",
//     normalPrice: "39,99",
//     thumb: "assets/imgs/310950.jpg",
//   },
//   {
//     title: "Divinity: Original Sin 2 - Definitive Edition",
//     salePrice: "36,39",
//     normalPrice: "90,99",
//     thumb: "assets/imgs/435150.jpg",
//   },
//   {
//     title: "Planet Zoo",
//     salePrice: "50,00",
//     normalPrice: "100,00",
//     thumb: "assets/imgs/703080.jpg",
//   },
//   {
//     title: "Battlefield V",
//     salePrice: "119,60",
//     normalPrice: "299,00",
//     thumb: "assets/imgs/1238810.jpg",
//   },

//   {
//     title: "Arma 3",
//     salePrice: "17,49",
//     normalPrice: "69,99",
//     thumb: "assets/imgs/107410.jpg",
//   },
//   {
//     title: "Zombie Army 4: Dead War",
//     salePrice: "84,59",
//     normalPrice: "93,99",
//     thumb: "assets/imgs/694280.jpg",
//   },
//   {
//     title: "Sniper Ghost Warrior Contracts",
//     salePrice: "34,99",
//     normalPrice: "69,99",
//     thumb: "assets/imgs/973580.jpg",
//   },
//   {
//     title: "Jurassic World Evolution",
//     salePrice: "19,99",
//     normalPrice: "79,99",
//     thumb: "assets/imgs/648350.jpg",
//   },
//   {
//     title: "RollerCoaster Tycoon® 3: Complete Edition",
//     salePrice: "22,79",
//     normalPrice: "37,99",
//     thumb: "assets/imgs/1368820.jpg",
//   },
// ];

let gameTitle = "";
let ofertas = [];

// Requisição HTTP //
async function HttpRequest(){
  ofertas = await fetch("https://www.cheapshark.com/api/1.0/deals?pageNumber=0&pageSize=12&storeID=1&onSale=1&AAA=1").then(r => {
    if (r.ok) {return r.json()}
    else {throw new Error("Erro ao carregar dados" + r.statusText)};
    })
}

window.onload = () => {
  // Seletores de nós HTML //
  const jogosLista = document.getElementById("jogos-lista");
  const opcaoFiltro = document.getElementById("oferta-search");
  const opcaoOrdenar = document.getElementById("ordenar");

  // Função que realiza o filtro dos jogos de acordo com o digitado no "search input" // 
  function handleSearch (event) {
    event.type === "keyup" ? gameTitle = event.currentTarget.value : null;
    
    const oferta = ofertas.filter((oferta) => {
      return oferta.title.toLowerCase().search(gameTitle.toLowerCase()) !== -1 
    });
    
    jogosListaHtml(oferta);
  };

  // Criação do HTML com a lista de jogos filtrados //
  function jogosListaHtml (ofertas) {
    jogosLista.innerHTML = "";

    //Ordenação da lista de jogos//
    if (opcaoOrdenar.value === 'Maior Preço') {ofertas.sort((a, b) => {
      if (parseInt(a.salePrice) > parseInt(b.salePrice)) {return -1}
    })} else if (opcaoOrdenar.value === 'Menor Preço') {ofertas.sort((a, b) => {
      if (parseInt(a.salePrice) < parseInt(b.salePrice)) {return -1}
    })} else if (opcaoOrdenar.value === 'Título') {ofertas.sort((a, b) => {
      if (a.title < b.title) {return -1}
    })} else {ofertas.sort((a, b) => {
      if (((parseInt(a.salePrice)/parseInt(a.normalPrice))) < ((parseInt(b.salePrice)/parseInt(b.normalPrice)))) {return -1}
    })}

    //Criação do HTML //
    ofertas.map((oferta) => {
      jogosLista.innerHTML += `
        <article class="oferta">
          <header>
            <h4 class="titulo-jogo">
              ${oferta.title}
            </h4>
          </header>
  
          <figure>
            <img src="https://cdn.akamai.steamstatic.com/steam/apps/${oferta.steamAppID}/header.jpg" alt="${oferta.title}">
          </figure>
  
          <div>
            <section class="detalhes-jogo">
              <h5>DETALHES</h5>
            </section>
  
            <section class="preco-jogo">
              <small class="preco-normal">$ ${oferta.normalPrice}</small>
              <h5 class="preco-oferta">$ ${oferta.salePrice}</h5>
            </section>
  
            <section class="desconto-jogo">
              <h5>
                ${oferta.salePrice === "0,00" ? "GRÁTIS" : Math.round((parseInt(oferta.salePrice)/parseInt(oferta.normalPrice))*100)-100 + "%"}
              </h5>
            </section>
          </div>
        </article>
        `;
    });
  };

opcaoFiltro.addEventListener('keyup', handleSearch);
opcaoOrdenar.addEventListener('change', handleSearch);

jogosListaHtml (ofertas);
};

HttpRequest();