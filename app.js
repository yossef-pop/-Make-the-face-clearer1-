// Simple client-side data + UI for the face tool
const data = {
  "forehead": {
    title: "Forehead — Fine lines & dryness",
    cause: "Often from repeated expressions, sun exposure or lack of hydration.",
    tips: [
      "Use SPF daily to prevent sun damage.",
      "Add a light hyaluronic acid serum to hydrate.",
      "Avoid heavy rubbing; pat skin gently."
    ],
    products: [
      { name: "Light Hyaluronic Serum", href: "https://example.com/product1", desc: "Hydrates without heaviness" },
      { name: "Broad-Spectrum SPF 30", href: "https://example.com/product2", desc: "Daily UV protection" }
    ]
  },
  "left-eye": {
    title: "Under-eye — Dark circles",
    cause: "Common causes: poor sleep, dehydration, genetics or pigmentation.",
    tips: [
      "Sleep 7–8 hours and raise head slightly while sleeping.",
      "Apply a caffeine eye cream in the morning.",
      "Use cold compresses to reduce puffiness."
    ],
    products: [
      { name: "Caffeine Eye Gel", href: "https://example.com/eye1", desc: "Reduces puffiness and brightens" },
      { name: "Cooling Eye Roller", href: "https://example.com/eye2", desc: "Instant refresh" }
    ]
  },
  "right-eye": {
    // reuse same as left
    copyFrom: "left-eye"
  },
  "nose": {
    title: "Nose — Blackheads & shine",
    cause: "Excess oil and clogged pores are common here.",
    tips: [
      "Use a gentle salicylic acid cleanser 2–3x per week.",
      "Exfoliate with chemical exfoliant, not harsh scrubs.",
      "Keep hands away from the nose area."
    ],
    products: [
      { name: "Salicylic Cleanser", href: "https://example.com/no1", desc: "Clears excess oil" },
      { name: "Oil-absorbing Blotting Sheets", href: "https://example.com/no2", desc: "Quick mattifying" }
    ]
  },
  "left-cheek": {
    title: "Cheeks — Redness & texture",
    cause: "Sensitive skin, rosacea or irritation from products.",
    tips: [
      "Use fragrance-free, gentle moisturizers.",
      "Avoid alcohol-based toners and harsh scrubs.",
      "Introduce products one at a time to spot triggers."
    ],
    products: [
      { name: "Calming Moisturizer", href: "https://example.com/ch1", desc: "Soothes redness" },
      { name: "Gentle Cleanser", href: "https://example.com/ch2", desc: "Non-stripping formula" }
    ]
  },
  "right-cheek": {
    copyFrom: "left-cheek"
  },
  "mouth": {
    title: "Mouth & chin — Acne & irritation",
    cause: "Hormonal acne, friction or occlusive products.",
    tips: [
      "Use spot treatment with benzoyl peroxide or salicylic acid.",
      "Avoid heavy balms near the mouth area.",
      "Keep mobile phone screen clean (contact with chin spreads bacteria)."
    ],
    products: [
      { name: "Benzoyl Peroxide Spot Gel", href: "https://example.com/m1", desc: "Reduces active spots" },
      { name: "Non-comedogenic Lip Balm", href: "https://example.com/m2", desc: "Helps prevent clogging" }
    ]
  }
};

// copy shortcuts if needed
Object.keys(data).forEach(k=>{
  if(data[k].copyFrom){
    data[k] = JSON.parse(JSON.stringify(data[data[k].copyFrom]));
  }
});

// UI elements
const card = document.getElementById('card');
const titleEl = document.getElementById('cardTitle');
const causeEl = document.getElementById('cardCause');
const tipsEl = document.getElementById('cardTips');
const productsEl = document.getElementById('cardProducts');
const closeBtn = document.getElementById('closeBtn');

// attach click handlers to SVG regions
document.querySelectorAll('.region').forEach(el=>{
  el.addEventListener('click', (ev)=>{
    const id = el.id;
    openCardFor(id);
  });
});

closeBtn.addEventListener('click', closeCard);

function openCardFor(id){
  const info = data[id];
  if(!info) return;
  titleEl.textContent = info.title || id;
  causeEl.textContent = info.cause || "";
  // tips
  tipsEl.innerHTML = '';
  (info.tips || []).forEach(t=>{
    const li = document.createElement('li');
    li.textContent = t;
    tipsEl.appendChild(li);
  });
  // products
  productsEl.innerHTML = '';
  (info.products || []).forEach(p=>{
    const div = document.createElement('div');
    div.className = 'product';
    const meta = document.createElement('div');
    meta.className = 'meta';
    const a = document.createElement('a');
    a.href = p.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = p.name;
    const small = document.createElement('small');
    small.textContent = p.desc || '';
    meta.appendChild(a);
    meta.appendChild(small);

    div.appendChild(meta);
    productsEl.appendChild(div);
  });

  card.classList.remove('hidden');
  card.setAttribute('aria-hidden','false');
  // scroll into view on small screens
  card.scrollIntoView({behavior:'smooth', block:'center'});
}

function closeCard(){
  card.classList.add('hidden');
  card.setAttribute('aria-hidden','true');
}
