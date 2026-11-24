const formulario = document.getElementById("formulario");
const valorEmReais = document.getElementById("valor-em-reais");
const selecaoDeMoedas = document.getElementById("selecao-de-moedas");
const areaResultado = document.getElementById("resultado");
const areaMensagemErro = document.getElementById("msg-erro");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  areaResultado.textContent = "";
  areaMensagemErro.textContent = "";

  const valorDigitado = valorEmReais.value;
  const moedaSelecionada = selecaoDeMoedas.value;

  buscarCotacao(moedaSelecionada, valorDigitado);
});

async function buscarCotacao(moeda, valor) {
  try {
    const resposta = await fetch(
      `https://economia.awesomeapi.com.br/json/last/${moeda}-BRL`,
    );

    if (!resposta.ok) {
      areaMensagemErro.textContent =
        "Não foi possível obter a cotação. Tente novamente.";
      return;
    }

    const dados = await resposta.json();

    const chave = `${moeda}BRL`;

    const infoMoeda = dados[chave];

    const cotacao = infoMoeda.bid;

    const valorNumerico = parseFloat(valor);
    const cotacaoNumerica = parseFloat(cotacao);

    const resultadoCotacao = valorNumerico / cotacaoNumerica;

    const valorFormatado = valorNumerico.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const resultadoFormatado = resultadoCotacao.toLocaleString("pt-BR", {
      style: "currency",
      currency: moeda,
    });

    areaResultado.textContent = `${valorFormatado} = ${resultadoFormatado}`;
  } catch (erro) {
    areaMensagemErro.textContent = "Erro de conexão. Verifique sua internet.";
    console.error(erro);
  }
}
