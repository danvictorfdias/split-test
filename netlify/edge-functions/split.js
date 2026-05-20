export default function handler(request, context) {
  const variantes = [
    { url: "https://homens2.doseulado.com.br/", variante: "pagina-a" },
    { url: "https://homens.doseulado.com.br/",  variante: "pagina-b" },
  ];

  const escolhida = Math.random() < 0.5 ? variantes[0] : variantes[1];

  // Lê a query string bruta da URL de entrada
  const queryBruta = request.url.includes("?")
    ? request.url.split("?")[1]
    : "";

  const params = new URLSearchParams(queryBruta);

  // Modifica utm_source para identificar a variante na Yampi
  const sourceOriginal = params.get("utm_source") || "direto";
  params.set("utm_source", `${sourceOriginal}|${escolhida.variante}`);

  // UTMs extras
  params.set("utm_id",               escolhida.variante);
  params.set("utm_source_platform",  "meta_ads");
  params.set("utm_creative_format",  "video");
  params.set("utm_marketing_tactic", escolhida.variante);
  params.set("src",                  escolhida.variante);
  params.set("sck",                  escolhida.variante);

  const destino = `${escolhida.url}?${params.toString()}`;

  return Response.redirect(destino, 302);
}
