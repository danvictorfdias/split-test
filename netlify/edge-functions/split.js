export default function handler(request, context) {
  const variantes = [
    { url: "https://homens2.doseulado.com.br//", src: "pagina-a" },
    { url: "https://homens.doseulado.com.br//", src: "pagina-b" },
  ];

  const escolhida = Math.random() < 0.5 ? variantes[0] : variantes[1];

  const destino = new URL(escolhida.url);
  destino.searchParams.set("src", escolhida.src);

  return Response.redirect(destino.toString(), 302);
}
