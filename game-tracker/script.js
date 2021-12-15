const seletor = document.querySelector(".ordenar");
let gameTitle = "";
let ofertas = [];

// Cria novo DropDown a partir dos dados do Dropdown padrao //
seletor.addEventListener('mousedown', e => {
  e.preventDefault();
  const selecao = seletor.children[0];
  const dropDown = document.createElement('ul');
  dropDown.className = 'ordenar-opcoes';

 const opcao = [...selecao.children];
  opcao.forEach(opc => {
    const dropDownOption = document.createElement('li');
    dropDownOption.textContent = opc.textContent;
    
    // Atribui cor a ordenacao selecionada //
    if (selecao.value == dropDownOption.textContent){
      dropDownOption.setAttribute('style', 'color: #c70160;')
    }
    
    // Atribui os valores do novo DropDown ao Dropdown padrao//
    dropDownOption.addEventListener('mousedown', e => {
      e.stopPropagation();
      selecao.value = opc.value;
      selecao.dispatchEvent(new Event('change'));
      dropDown.remove();   
    });

    dropDown.appendChild(dropDownOption);
  });
  
  seletor.appendChild(dropDown); 
  
  // Remove dropdown ao clicar fora //
  document.addEventListener('click', e => {
    if (!selecao.contains(e.target)) {
      dropDown.remove();
    }
  });
});

// Requisição HTTP //
async function HttpRequest(){
  ofertas = await fetch("https://www.cheapshark.com/api/1.0/deals?pageNumber=0&pageSize=12&storeID=1&onSale=1&AAA=1").then(r => {
    if (r.ok) {return r.json()}
    else {throw new Error("Erro ao carregar dados" + r.statusText)};
    })
};

window.onload = () => {
  // Seletores de nós HTML //
  const jogosLista = document.getElementById("jogos-lista");
  const opcaoFiltro = document.getElementById("oferta-search");
  const opcaoOrdenar = document.querySelector(".ordenar select");

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

jogosListaHtml (ofertas);

opcaoFiltro.addEventListener('keyup', handleSearch);
opcaoOrdenar.addEventListener('change', handleSearch);
};

HttpRequest();