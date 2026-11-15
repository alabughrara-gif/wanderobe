// ============================================================
// CONFIG — paste your form endpoint here once you have one.
// Free option: create a form at https://formspree.io and paste its
// URL, e.g. "https://formspree.io/f/abcdwxyz".
// While this is empty, the forms run in demo mode: they validate and
// show a success message, but submissions are NOT saved anywhere.
// ============================================================
const FORM_ENDPOINT = "";

// ----- Dress code decoder content -----
const DRESS_CODES = {
  blacktie: {
    title: "Black tie",
    desc: "The most formal option, usually an evening wedding at a grand venue.",
    items: ["Floor-length gown or a very elegant jumpsuit", "Statement earrings or a fine necklace", "Heels or embellished flats", "Beaded or satin clutch"],
    tip: "City Hall and Nob Hill venues lean black tie. A faux-fur or velvet wrap is included for the walk outside.",
  },
  formal: {
    title: "Formal / black tie optional",
    desc: "A long gown works, but so does a polished midi or chic separates.",
    items: ["Floor-length or elegant midi dress", "Dressy heels", "Delicate jewelry", "Structured clutch"],
    tip: "Many formal SF weddings are photographed outdoors at golden hour. Your stylist will pick colors that work with the fog and the light.",
  },
  cocktail: {
    title: "Cocktail attire",
    desc: "The most common dress code: knee- to midi-length and dressy without being a gown.",
    items: ["Cocktail or midi dress (or a sharp jumpsuit)", "Block heels for vineyard lawns", "Earrings and a bracelet", "Clutch + light jacket"],
    tip: "At Napa or Sonoma venues, block heels beat stilettos on grass and gravel.",
  },
  garden: {
    title: "Garden / semi-formal",
    desc: "Daytime, outdoors and a little romantic.",
    items: ["Floral or soft-colored midi dress", "Wedges or block heels", "Straw or woven bag", "Light cardigan or shawl"],
    tip: "Marin and Sonoma afternoons are warm, then drop 20°F at sunset. Layers are included.",
  },
  beach: {
    title: "Beach / coastal",
    desc: "Breezy fabrics and relaxed silhouettes.",
    items: ["Flowy maxi or linen set", "Flat sandals", "Gold or shell jewelry", "Oversized wrap"],
    tip: "The NorCal coast is cold. Half Moon Bay and Stinson weddings get a cozy wrap and an optional knit.",
  },
};

function renderDecoder(code) {
  const d = DRESS_CODES[code];
  document.getElementById("decoder-title").textContent = d.title;
  document.getElementById("decoder-desc").textContent = d.desc;
  document.getElementById("decoder-tip").textContent = d.tip;
  const list = document.getElementById("decoder-items");
  list.innerHTML = "";
  d.items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-selected", "false"));
    tab.setAttribute("aria-selected", "true");
    renderDecoder(tab.dataset.code);
  });
});
renderDecoder("blacktie");

// ----- Forms (guest waitlist + stylist application) -----
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

document.querySelectorAll("form[data-form]").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = form.querySelector(".form__msg");
    msg.className = "form__msg";

    // Validate required fields
    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const bad = !field.value.trim() || (field.type === "email" && !isEmail(field.value));
      field.classList.toggle("invalid", bad);
      if (bad) valid = false;
    });
    if (!valid) {
      msg.textContent = "Please fill in the highlighted fields.";
      msg.classList.add("err");
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    data.form_type = form.dataset.form; // "guest" or "stylist"

    const button = form.querySelector("button");
    button.disabled = true;

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        console.warn("[demo mode] FORM_ENDPOINT not set — submission not saved:", data);
      }
      form.reset();
      msg.textContent = form.dataset.form === "stylist"
        ? "Thank you! We'll be in touch about founding-stylist onboarding."
        : "You're on the list! We'll email you before we launch.";
      msg.classList.add("ok");
    } catch {
      msg.textContent = "Something went wrong. Please try again.";
      msg.classList.add("err");
    } finally {
      button.disabled = false;
    }
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
