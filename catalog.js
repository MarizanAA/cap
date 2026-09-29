const capProducts = [
  {id:"01",name:"Gorra vintage bordada",category:"gorras",type:"cap",style:"Bordado",desc:"Silueta clásica con detalles gráficos y varias combinaciones de color.",badge:"VINTAGE",image:"../pinterest/caps/cap-01.jpg",imagePosition:"center 50%"},
  {id:"02",name:"Gorra negra clásica",category:"gorras",type:"cap",style:"Básica",desc:"Diseño limpio en negro para combinar con cualquier estilo.",badge:"CLÁSICA",image:"../pinterest/caps/cap-02.jpg"},
  {id:"03",name:"Gorra en varios colores",category:"gorras",type:"cap",style:"Color",desc:"Una selección de tonos para encontrar tu favorito.",badge:"COLOR",image:"../pinterest/caps/cap-03.jpg",imagePosition:"center 43%"},
  {id:"04",name:"Gorra pastel bicolor",category:"gorras",type:"cap",style:"Dos tonos",desc:"Base celeste con visera en contraste y parche frontal.",badge:"BICOLOR",image:"../pinterest/caps/cap-04.jpg"},
  {id:"05",name:"Gorra negra deportiva",category:"gorras",type:"cap",style:"Snapback",desc:"Perfil estructurado en negro con visera de color.",badge:"SNAPBACK",image:"../pinterest/caps/cap-05.jpg"},
  {id:"06",name:"Gorra roja deportiva",category:"gorras",type:"cap",style:"Snapback",desc:"Una opción intensa en rojo con acabado urbano.",badge:"URBANA",image:"../pinterest/caps/cap-06.jpg"},
  {id:"07",name:"Gorra blanca minimal",category:"gorras",type:"cap",style:"Minimal",desc:"Un básico claro, versátil y fácil de combinar.",badge:"MINIMAL",image:"../pinterest/caps/cap-07.jpg"},
  {id:"08",name:"Gorra azul bordada",category:"gorras",type:"cap",style:"Bordado",desc:"Azul profundo con un detalle gráfico al frente.",badge:"BORDADO",image:"../pinterest/caps/cap-08.jpg"},
  {id:"09",name:"Gorra negra gráfica",category:"gorras",type:"cap",style:"Gráfica",desc:"Acabado oscuro con bordados laterales y contraste sutil.",badge:"GRÁFICA",image:"../pinterest/caps/cap-09.jpg",imagePosition:"center 48%"},
  {id:"10",name:"Gorra beige urbana",category:"gorras",type:"cap",style:"Vintage",desc:"Tono neutro con bordado y detalles de inspiración retro.",badge:"VINTAGE",image:"../pinterest/caps/cap-10.jpg"},
  {id:"11",name:"Gorras deportivas duo",category:"gorras",type:"cap",style:"Color block",desc:"Combinación de dos estilos y colores llamativos.",badge:"DUO",image:"../pinterest/caps/cap-11.jpg"},
  {id:"12",name:"Gorra negra bordada",category:"gorras",type:"cap",style:"Bordado",desc:"Diseño oscuro con un bordado tono sobre tono.",badge:"DARK",image:"../pinterest/caps/cap-12.jpg"},
  {id:"13",name:"Gorras de colores",category:"gorras",type:"cap",style:"Colección",desc:"Distintos tonos y acabados para variar tu look.",badge:"COLECCIÓN",image:"../pinterest/caps/cap-13.jpg",imagePosition:"center 45%"},
  {id:"14",name:"Gorra azul clásica",category:"gorras",type:"cap",style:"Básica",desc:"Un perfil deportivo clásico en azul intenso.",badge:"CLÁSICA",image:"../pinterest/caps/cap-14.jpg"},
  {id:"15",name:"Gorra bordada street",category:"gorras",type:"cap",style:"Streetwear",desc:"Bordados gráficos sobre una silueta de inspiración urbana.",badge:"STREET",image:"../pinterest/caps/cap-15.jpg",imagePosition:"center 43%"},
  {id:"16",name:"Set de pines esmaltados",category:"pines",type:"pins",style:"Set",desc:"Motivos pequeños y coloridos para personalizar tus accesorios.",badge:"SET",image:"../pinterest/pins/pin-01.jpg",imagePosition:"center 47%"},
  {id:"17",name:"Pin gato naranja",category:"pines",type:"pin",style:"Esmaltado",desc:"Un pin ilustrado con acabado brillante y estilo divertido.",badge:"ENAMEL",image:"../pinterest/pins/pin-02.jpg"},
  {id:"18",name:"Pines ilustrados",category:"pines",type:"pins",style:"Colección",desc:"Mini ilustraciones esmaltadas para combinar a tu manera.",badge:"COLECCIÓN",image:"../pinterest/pins/pin-03.jpg"},
  {id:"19",name:"Pin de criaturas",category:"pines",type:"pins",style:"Dúo",desc:"Dos diseños detallados con un acabado metálico decorativo.",badge:"DÚO",image:"../pinterest/pins/pin-04.jpg"},
  {id:"20",name:"Pin cohete",category:"pines",type:"pin",style:"Espacial",desc:"Diseño de inspiración espacial sobre fondo de color.",badge:"ESPACIAL",image:"../pinterest/pins/pin-05.jpg"},
  {id:"21",name:"Pines de manzana",category:"pines",type:"pins",style:"Pop",desc:"Un dúo alegre de formas y colores contrastantes.",badge:"POP",image:"../pinterest/pins/pin-06.jpg"},
  {id:"22",name:"Set de pines ilustrados",category:"pines",type:"pins",style:"Set",desc:"Colección ilustrada con motivos gráficos y coloridos.",badge:"SET",image:"../pinterest/pins/pin-07.jpg"},
  {id:"23",name:"Pines geométricos",category:"pines",type:"pins",style:"Color",desc:"Pequeños diseños geométricos con acabado metálico.",badge:"GEOMÉTRICO",image:"../pinterest/pins/pin-08.jpg"},
  {id:"24",name:"Pin retro numerado",category:"pines",type:"pin",style:"Retro",desc:"Una pieza redonda de inspiración clásica con borde dorado.",badge:"RETRO",image:"../pinterest/pins/pin-09.jpg"},
  {id:"25",name:"Mini pines esmaltados",category:"pines",type:"pins",style:"Mini set",desc:"Varios diseños compactos para sumar a una gorra o mochila.",badge:"MINI SET",image:"../pinterest/pins/pin-10.jpg"}
];

const grid = document.querySelector("#product-grid");
const whatsappNumber = String(window.CAP_LAB_WHATSAPP || "").replace(/\D/g, "");

function capVisual(item) {
  const [light, mid, dark, shadow] = item.colors;
  const mark = item.mark || "CL";
  const profile = item.profile || "classic";
  const patch = item.patchShape === "round"
    ? `<circle cx="181" cy="120" r="24" fill="${shadow}" stroke="${light}" stroke-width="2"/>`
    : item.patchShape === "shield"
      ? `<path d="M160 101h42v31l-21 14-21-14Z" fill="${shadow}" stroke="${light}" stroke-width="2"/>`
      : `<rect x="158" y="101" width="46" height="38" rx="7" fill="${shadow}" stroke="${light}" stroke-width="2"/>`;
  const visor = profile === "flat"
    ? "M73 177c51 4 115 0 185-9 29-4 51-9 69-13 22 8 31 21 17 32-25 19-100 31-176 31-57 0-102-9-115-23-9-9-2-15 20-18Z"
    : "M71 177c57 20 135 16 200-3 26-7 39-13 51-19 25 4 39 16 29 29-18 23-97 44-173 47-56 3-105-5-122-20-12-11-5-25 15-34Z";
  const mesh = profile === "trucker"
    ? `<path d="M229 66c28 14 49 41 59 77-18 10-38 18-60 25V66Z" fill="${light}" opacity=".16"/><path d="M238 76v81m12-72v66m12-55v47m-34-56 38 45m-41-29 34 39" stroke="${light}" stroke-opacity=".68" stroke-width="1.5"/>`
    : "";
  const cord = item.motif === "cord"
    ? `<path d="M124 67v82m13-92v97m13-102v105m75-100v98m13-92v86" stroke="${light}" stroke-opacity=".22" stroke-width="2"/>`
    : "";
  const motif = item.motif === "flame"
    ? `<path d="M116 153c-10-17 5-30 9-43 9 13 16 23 9 39m76 4c-7-13 5-24 9-35 8 12 13 22 7 33" fill="none" stroke="${light}" stroke-width="4" stroke-linecap="round" opacity=".9"/>`
    : item.motif === "flower"
      ? `<path d="M118 116c-5-9 7-12 12-5 3-10 16-7 13 3 10-4 14 8 4 12 8 7-2 16-9 8-6 10-17 3-10-6-9 1-14-10-3-12Z" fill="${light}" opacity=".88"/><circle cx="132" cy="119" r="3" fill="${shadow}"/>`
      : "";
  const panelLines = profile === "low"
    ? `M174 42c-3 42-1 91 2 133m-47-118c-14 34-20 70-19 99m103-96c14 33 21 68 24 98`
    : `M174 42c-3 43-1 88 2 133m-58-116c-14 34-19 68-18 98m121-97c17 33 25 69 29 102`;
  return `<svg viewBox="0 0 360 280" role="img" aria-label="Modelo ilustrado: ${item.name}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="body-${item.id}" x1=".1" y1="0" x2=".85" y2="1"><stop stop-color="${light}"/><stop offset=".55" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/></linearGradient><linearGradient id="peak-${item.id}" x1="0" y1="0" x2="1" y2=".8"><stop stop-color="${mid}"/><stop offset="1" stop-color="${shadow}"/></linearGradient></defs><ellipse cx="181" cy="231" rx="111" ry="16" fill="#000" opacity=".19"/><g transform="rotate(-7 180 140)"><path d="M89 163c-5-58 28-108 83-121 58-14 100 22 117 87l3 45c-59 27-142 33-199 6l-4-17Z" fill="url(#body-${item.id})" stroke="${light}" stroke-opacity=".55" stroke-width="2"/><path d="${visor}" fill="url(#peak-${item.id})" stroke="${mid}" stroke-width="1.5"/><path d="M74 180c47 22 131 23 206-3 28-9 49-19 68-30" fill="none" stroke="${light}" stroke-width="2" opacity=".72"/><path d="${panelLines}" fill="none" stroke="${light}" stroke-opacity=".35" stroke-width="2"/>${mesh}${cord}${motif}<circle cx="175" cy="42" r="5" fill="${light}"/>${patch}<text x="181" y="127" fill="${light}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${mark.length > 2 ? 11 : mark.length > 1 ? 13 : 18}" font-weight="700">${mark}</text></g></svg>`;
}

function pinVisual(item) {
  const [gold, color, deep, outline] = item.colors;
  const single = item.type === "pin";
  const mark = item.mark || "✦";
  const pins = single
    ? [{x:180,y:137,r:73,mark,shape:item.pinShape || "circle"}]
    : [{x:113,y:141,r:51,mark:item.pinMarks?.[0] || mark,shape:"circle"},{x:193,y:111,r:56,mark:item.pinMarks?.[1] || "✦",shape:"circle"},{x:247,y:163,r:48,mark:item.pinMarks?.[2] || "C",shape:"circle"}];
  const shapes = {
    star:"M0-69 16-24 62-22 27 7 39 53 0 27-39 53-27 7-62-22-16-24Z",
    shield:"M-55-51H55V9Q43 43 0 67Q-43 43-55 9Z",
    flame:"M0-66C35-30 39-3 24 29 15 49-13 61-32 42-55 20-35-6-23-25-15-39-7-50 0-66Z",
    heart:"M0 58C-12 44-58 11-58-22-58-58-16-62 0-33 16-62 58-58 58-22 58 11 12 44 0 58Z",
    bolt:"M8-67-45 7-8 7-21 65 46-19 9-18Z",
    diamond:"M0-65 58 0 0 65-58 0Z",
    hex:"M-39-58H39L66 0 39 58H-39L-66 0Z"
  };
  return `<svg viewBox="0 0 360 280" role="img" aria-label="Modelo ilustrado: ${item.name}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="180" cy="228" rx="103" ry="14" fill="#000" opacity=".16"/><g transform="rotate(-8 180 140)">${pins.map(pin=>{const shape=shapes[pin.shape];const base=shape?`<path d="${shape}" fill="${deep}" stroke="${gold}" stroke-width="5" stroke-linejoin="round"/>`:`<circle r="${pin.r}" fill="${deep}" stroke="${gold}" stroke-width="5"/>`;return `<g transform="translate(${pin.x} ${pin.y})"><ellipse cy="9" rx="${pin.r*.82}" ry="${pin.r*.82}" fill="#000" opacity=".2"/>${base}<circle r="${pin.r*.78}" fill="${color}" stroke="${gold}" stroke-opacity=".82" stroke-width="1.5"/><circle r="${pin.r*.61}" fill="none" stroke="${gold}" stroke-opacity=".66" stroke-width="1.4"/><text y="${pin.mark.length>1?8:13}" fill="#fff7dc" text-anchor="middle" font-family="Arial,sans-serif" font-size="${pin.mark.length>1?24:36}" font-weight="700">${pin.mark}</text><circle cx="-${pin.r*.38}" cy="-${pin.r*.38}" r="3" fill="#fff" opacity=".75"/><path d="M${-pin.r*.28} ${pin.r*.51}q${pin.r*.29} 8 ${pin.r*.52} -1" fill="none" stroke="${outline}" stroke-width="2" opacity=".8"/></g>`}).join("")}</g></svg>`;
}

function whatsappIcon() {
  return `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C8.9 3 3.1 8.74 3.1 15.8c0 2.24.6 4.42 1.75 6.34L3 29l7.08-1.82a13.08 13.08 0 0 0 5.96 1.42h.01c7.13 0 12.93-5.74 12.93-12.8A12.68 12.68 0 0 0 25.17 6.7 12.93 12.93 0 0 0 16.04 3Zm.01 23.42h-.01c-1.84 0-3.64-.49-5.2-1.42l-.37-.22-4.2 1.08 1.12-4.06-.24-.4a10.52 10.52 0 0 1-1.63-5.6c0-5.82 4.72-10.55 10.54-10.55 2.82 0 5.47 1.1 7.46 3.1a10.45 10.45 0 0 1 3.09 7.45c0 5.82-4.73 10.62-10.56 10.62Zm5.79-7.94c-.32-.16-1.88-.92-2.17-1.03-.29-.11-.5-.16-.7.16-.21.31-.8 1.03-.98 1.24-.18.21-.36.23-.68.08-.32-.16-1.34-.49-2.55-1.57-.94-.83-1.57-1.86-1.76-2.18-.18-.31-.02-.48.14-.63.14-.14.32-.36.48-.54.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.68-.96-2.3-.25-.6-.51-.51-.7-.52h-.6c-.2 0-.54.08-.82.39-.29.31-1.08 1.05-1.08 2.56s1.1 2.97 1.25 3.18c.16.21 2.17 3.29 5.25 4.62.73.31 1.3.5 1.74.64.73.23 1.4.2 1.93.12.59-.09 1.88-.76 2.14-1.5.27-.73.27-1.36.19-1.5-.08-.13-.29-.21-.6-.37Z"/></svg>`;
}

function productPhotoPath(item) {
  return item.image
    ? item.image.startsWith("../") ? `assets/${item.image.replace("../", "")}` : `assets/products/${item.image}`
    : "";
}

function productVisual(item, large = false) {
  if (item.image) {
    return `<img class="${large ? "dialog-product-photo" : "product-photo"}" src="${productPhotoPath(item)}" alt="${item.name}, modelo de catálogo" style="object-position:${item.imagePosition || "center 50%"}" ${large ? "" : "loading=\"lazy\""}>`;
  }
  return item.type === "cap" ? capVisual(item) : pinVisual(item);
}

function orderLink(item) {
  const price = "$0.99";
  const referenceNote = item.reference ? " (imagen de referencia; confirmar diseño disponible)" : "";
  const orderText = `Hola, Cap Lab. Me interesa consultar ${item.name}${referenceNote} (${price} USD). ¿Me pueden dar más información?`;
  return whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}` : `https://wa.me/?text=${encodeURIComponent(orderText)}`;
}

function productVideo(item) {
  if (!item.videoUrl) return "";
  const videoUrl = String(item.videoUrl).trim();
  const reelMatch = videoUrl.match(/^https?:\/\/(?:www\.)?instagram\.com\/(reel|p)\/([\w-]+)/i);
  if (reelMatch) {
    const type = reelMatch[1].toLowerCase();
    return `<iframe class="dialog-product-video instagram-video" src="https://www.instagram.com/${type}/${reelMatch[2]}/embed/" title="Video de ${item.name} en Instagram" allow="autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen loading="eager"></iframe>`;
  }
  const isHostedVideo = /^https:\/\//i.test(videoUrl);
  const isLocalVideo = /^(?:\.\.\/)?assets\/[\w./-]+$/i.test(videoUrl);
  if ((!isHostedVideo && !isLocalVideo) || !/\.(?:mp4|webm)(?:[?#].*)?$/i.test(videoUrl)) return "";
  const safeUrl = videoUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  return `<video class="dialog-product-video" controls playsinline preload="metadata" aria-label="Video de ${item.name}"><source src="${safeUrl}"></video>`;
}

function createCard(item) {
  const visual = productVisual(item);
  const categoryLabel = item.category === "gorras" ? "GORRAS" : "PINES";
  const price = "$0.99";
  return `<article class="product-card" data-category="${item.category}" data-product-id="${item.id}" tabindex="0" role="button" aria-haspopup="dialog" aria-label="Ver detalles de ${item.name}"><div class="product-visual"><span class="product-tag ${item.reference ? "reference-tag" : ""}">${item.badge}</span><span class="product-number">CL / ${item.id}</span>${visual}<span class="card-view-hint">${item.videoUrl ? "VER VIDEO" : "VER DETALLES"} <b>↗</b></span></div><div class="product-info"><div class="product-copy"><p class="product-category">${categoryLabel} · ${item.style.toUpperCase()}</p><h3>${item.name}</h3><p>${item.desc}</p></div><div class="product-buy"><span class="price">${price}</span><a class="wa-button" href="${orderLink(item)}" target="_blank" rel="noreferrer" aria-label="Pedir ${item.name} por WhatsApp a ${whatsappNumber ? "+1 (829) 967-8456" : "Cap Lab"}" title="Pedir ${item.name} por WhatsApp">${whatsappIcon()}</a></div></div></article>`;
}

const productDialog = document.querySelector("#product-dialog");
const productDialogContent = document.querySelector("#product-dialog-content");

function openProduct(item) {
  const categoryLabel = item.category === "gorras" ? "GORRAS" : "PINES";
  const reference = item.reference ? `<p class="dialog-reference-note">Esta foto es una referencia de estilo; confirma por WhatsApp si el diseño está disponible.</p>` : "";
  const video = productVideo(item);
  const media = video || productVisual(item, true);
  productDialogContent.innerHTML = `<div class="dialog-product-visual ${video ? "has-video" : item.image ? "has-photo" : "is-illustration"}">${media}</div><div class="dialog-product-info"><p class="product-category">${categoryLabel} · ${item.style.toUpperCase()}</p><h2 id="product-dialog-title">${item.name}</h2><p class="dialog-product-description">${item.desc}</p>${reference}<div class="dialog-product-bottom"><span class="dialog-product-price">$0.99 <small>USD · precio de muestra</small></span><a class="dialog-order-button" href="${orderLink(item)}" target="_blank" rel="noreferrer">${whatsappIcon()} <span>Consultar por WhatsApp</span></a></div></div>`;
  productDialog.showModal();
}

grid.addEventListener("click", event => {
  if (event.target.closest("a")) return;
  const card = event.target.closest(".product-card");
  if (card) openProduct(capProducts.find(item => item.id === card.dataset.productId));
});

grid.addEventListener("keydown", event => {
  if ((event.key !== "Enter" && event.key !== " ") || event.target.closest("a")) return;
  const card = event.target.closest(".product-card");
  if (!card) return;
  event.preventDefault();
  openProduct(capProducts.find(item => item.id === card.dataset.productId));
});

productDialog.querySelector(".product-dialog-close").addEventListener("click", () => productDialog.close());
productDialog.addEventListener("close", () => { productDialogContent.innerHTML = ""; });
productDialog.addEventListener("click", event => {
  if (event.target === productDialog) productDialog.close();
});

function renderProducts(filter = "todos") {
  const products = capProducts.filter(item => filter === "todos" || item.category === filter);
  grid.innerHTML = products.map(createCard).join("");
  document.querySelector("#product-count").textContent = String(capProducts.length).padStart(2, "0");
  document.querySelector("#caps-count").textContent = String(capProducts.filter(item => item.category === "gorras").length).padStart(2, "0");
  document.querySelector("#pins-count").textContent = String(capProducts.filter(item => item.category === "pines").length).padStart(2, "0");
}

document.querySelectorAll(".filter-chip").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach(chip => {
      const active = chip === button;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });
    renderProducts(button.dataset.filter);
  });
});

document.querySelectorAll("[data-jump-filter]").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(`.filter-chip[data-filter="${link.dataset.jumpFilter}"]`)?.click();
  });
});

renderProducts();
