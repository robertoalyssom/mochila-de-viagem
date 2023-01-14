const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [] 

itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

form.addEventListener("submit", (evento) => { 
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value) // p/ saber se o elem. já existe na array

    const itemAtual = { //-- objt dos dados fornecidos
        "nome": nome.value,
        "quantidade": quantidade.value
    };
    
    if (existe) { // se existe... existe // true
        itemAtual.id = existe.id;
        
        atualizaElemento(itemAtual); //-- parâm. itemAtual ja com id

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual; // findIndex garantindo que esta buscando o item correto, e está atualizando o contúdo desse elem.
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0 // itens[ultimo elemento da lista] // >if< tem item na lista busca o id do ultimo elem. da lista, >elsse não tem elem. na lista, incrementa 0 // depois incrementa o resultado de if/else ao id do itemAtual

        criaElemento(itemAtual);

        itens.push(itemAtual); // enviando itens (objts) p/ a lista // insete o objt no array
    }

    localStorage.setItem("itens", JSON.stringify(itens)); //-- obj transformado em texto e enviado para o localStorage // insere o array no localStorage

    nome.value = "";
    quantidade.value = "";
});

function criaElemento(item) {
    //<li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");
    
    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id // ao criar elem., o id do objt vai p/ o id de strong
    
    novoItem.appendChild(numeroItem); 
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id)); // inserindo botao de deletar no item

    lista.appendChild(novoItem); //-> inserindo o novo item na lista
};

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade //-- 
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.classList.add('botao-excluir');

    elementoBotao.innerHTML = '<i class="fa-solid fa-trash"></i>'; // ícone

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao; //--retornando elementoBotao
}

function deletaElemento(tag, id) { // tag= li
    tag.remove();

    //remover um item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1) // temos itens, achamos o elemento onde o id é igual ao id que eu acabei de clicar para remover, e deleta ele // 1 é o numero de itens a ser exclúido(splice)

    //escrever no localStorage
    localStorage.setItem("itens", JSON.stringify(itens));
}