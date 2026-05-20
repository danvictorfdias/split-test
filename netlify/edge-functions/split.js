export default function handler(request, context) {
  const variantes = [
    { url: "https://homens2.doseulado.com.br/", variante: "pagina-a" },
    { url: "https://homens.doseulado.com.br/",  variante: "pagina-b" },
  ];

  const escolhida = Math.random() < 0.5 ? variantes[0] : variantes[1];

  const urlOrigem = new URL(request.url);
  const destino = new URL(escolhida.url);

  // Copia todas as UTMs do Meta intactas
  urlOrigem.searchParams.forEach((valor, chave) => {
    destino.searchParams.set(chave, valor);
  });

  // Modifica utm_source para identificar a variante na Yampi
  const sourceOriginal = urlOrigem.searchParams.get("utm_source") || "direto";
  destino.searchParams.set("utm_source", `${sourceOriginal}|${escolhida.variante}`);

  // UTMs extras do GA4 — identificam a variante
  destino.searchParams.set("utm_id",               escolhida.variante); // ID da campanha no GA4
  destino.searchParams.set("utm_source_platform",  "meta_ads");         // plataforma de origem
  destino.searchParams.set("utm_creative_format",  "video");            // formato do criativo
  destino.searchParams.set("utm_marketing_tactic", escolhida.variante); // tática de marketing

  // Rastreamento de variante
  destino.searchParams.set("src", escolhida.variante);
  destino.searchParams.set("sck", escolhida.variante);

  return Response.redirect(destino.toString(), 302);
}
