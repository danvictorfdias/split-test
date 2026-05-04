export default function handler(request, context) {
  const variantes = [
    { url: "https://spray.doseulado.com.br/", variant: "a" },
    { url: "https://spray2.doseulado.com.br/", variant: "b" },
  ];

  const escolhida = Math.random() < 0.5 ? variantes[0] : variantes[1];

  const destino = new URL(escolhida.url);
  destino.searchParams.set("variant", escolhida.variant);

  return Response.redirect(destino.toString(), 302);
}
