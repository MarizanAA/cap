(() => {
  const supabase = window.capLabSupabase;
  const loginView = document.querySelector("#admin-login-view");
  const dashboard = document.querySelector("#admin-dashboard");
  const loginForm = document.querySelector("#admin-login-form");
  const editor = document.querySelector("#product-editor");
  const productForm = document.querySelector("#product-form");
  const productList = document.querySelector("#admin-product-list");
  const imageList = document.querySelector("#admin-image-list");
  let products = [];
  let editorImages = [];
  let pendingImages = [];

  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);

  function message(element, text = "", kind = "") {
    element.textContent = text;
    element.className = `admin-message${kind ? ` is-${kind}` : ""}`;
  }

  function setupMessage(text) {
    const alert = document.querySelector("#admin-setup-alert");
    alert.innerHTML = text;
    alert.classList.remove("is-hidden");
  }

  function imageUrl(path) {
    if (!path) return "assets/cap-lab-instagram.jpg";
    if (/^https?:\/\//i.test(path) || path.startsWith("assets/")) return path;
    if (path.startsWith("../")) return `assets/${path.slice(3)}`;
    return `assets/products/${path}`;
  }

  function formatPrice(product) {
    try {
      return new Intl.NumberFormat("es-DO", { style: "currency", currency: product.currency || "USD" }).format(Number(product.price ?? 0.99));
    } catch {
      return `$${Number(product.price ?? 0.99).toFixed(2)}`;
    }
  }

  function renderProducts() {
    document.querySelector("#admin-product-count").textContent = `${products.length} ${products.length === 1 ? "producto" : "productos"}`;
    document.querySelector("#admin-seed").classList.toggle("is-hidden", products.length > 0);
    if (!products.length) {
      productList.innerHTML = `<div class="admin-alert">El catálogo está vacío. Carga los 25 productos de ejemplo para empezar.</div>`;
      return;
    }
    productList.innerHTML = products.map(product => {
      const firstImage = Array.isArray(product.images) ? product.images[0] : "";
      const status = product.availability === "agotado" ? "Agotado" : "Disponible";
      return `<article class="admin-product-row" data-product-id="${escapeHtml(product.id)}">
        <img src="${escapeHtml(imageUrl(firstImage))}" alt="" loading="lazy" />
        <div><h2>${escapeHtml(product.name)}</h2><p>${escapeHtml(product.description)}</p><div class="admin-product-meta"><span>CL / ${escapeHtml(product.code)}</span><span>${escapeHtml(product.category)}</span><span>${escapeHtml(formatPrice(product))}</span><span>${status}</span><span>${product.published ? "Visible" : "Oculto"}</span></div></div>
        <div class="admin-product-actions"><button class="admin-quiet-button" type="button" data-edit-product="${escapeHtml(product.id)}">Editar</button><button class="admin-quiet-button is-danger" type="button" data-delete-product="${escapeHtml(product.id)}">Eliminar</button></div>
      </article>`;
    }).join("");
  }

  async function loadProducts() {
    const { data, error } = await supabase.from("products").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true });
    if (error) throw error;
    products = data || [];
    renderProducts();
  }

  async function enterDashboard(user) {
    const loginMessage = document.querySelector("#admin-login-message");
    message(loginMessage, "Verificando acceso…");
    const { data: access, error } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
    if (error) {
      message(loginMessage, "No se pudo validar el acceso. Revisa que hayas ejecutado supabase/schema.sql.", "error");
      return;
    }
    if (!access) {
      await supabase.auth.signOut();
      message(loginMessage, "Esta cuenta no tiene permiso para administrar el catálogo.", "error");
      return;
    }
    loginView.classList.add("is-hidden");
    dashboard.classList.remove("is-hidden");
    document.querySelector("#admin-email").textContent = user.email || "Sesión iniciada";
    try {
      await loadProducts();
    } catch (loadError) {
      const banner = document.querySelector("#admin-dashboard-message");
      banner.textContent = `No se pudo leer el catálogo: ${loadError.message}`;
      banner.classList.remove("is-hidden");
    }
  }

  function previewEditorImages() {
    const saved = editorImages.map((path, index) => `<div class="admin-image-preview"><img src="${escapeHtml(imageUrl(path))}" alt="Foto ${index + 1}"/><button type="button" data-remove-saved="${index}" aria-label="Quitar foto ${index + 1}">×</button></div>`).join("");
    const pending = pendingImages.map((file, index) => `<div class="admin-pending-image"><span>${escapeHtml(file.name)}</span><button type="button" data-remove-pending="${index}">Quitar</button></div>`).join("");
    imageList.innerHTML = saved + pending;
  }

  function startNewProduct() {
    productForm.reset();
    productForm.elements.id.value = "";
    productForm.elements.price.value = "0.99";
    productForm.elements.currency.value = "USD";
    productForm.elements.category.value = "gorras";
    productForm.elements.availability.value = "disponible";
    productForm.elements.price_is_sample.checked = true;
    productForm.elements.published.checked = true;
    editorImages = [];
    pendingImages = [];
    document.querySelector("#editor-title").textContent = "Nuevo producto";
    message(document.querySelector("#admin-editor-message"));
    previewEditorImages();
    editor.showModal();
  }

  function editProduct(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;
    productForm.reset();
    productForm.elements.id.value = product.id;
    productForm.elements.name.value = product.name;
    productForm.elements.category.value = product.category;
    productForm.elements.style.value = product.style;
    productForm.elements.badge.value = product.badge;
    productForm.elements.price.value = Number(product.price).toFixed(2);
    productForm.elements.currency.value = product.currency || "USD";
    productForm.elements.availability.value = product.availability || "disponible";
    productForm.elements.description.value = product.description || "";
    productForm.elements.price_is_sample.checked = Boolean(product.price_is_sample);
    productForm.elements.published.checked = Boolean(product.published);
    productForm.elements.video_url.value = product.video_url || "";
    editorImages = [...(product.images || [])];
    pendingImages = [];
    document.querySelector("#editor-title").textContent = `Editar CL / ${product.code}`;
    message(document.querySelector("#admin-editor-message"));
    previewEditorImages();
    editor.showModal();
  }

  function defaultProductRow(product, index) {
    return {
      code: String(product.id || index + 1).padStart(2, "0"),
      name: product.name,
      category: product.category,
      product_type: product.type || (product.category === "gorras" ? "cap" : "pin"),
      style: product.style || "Básico",
      description: product.desc || "",
      badge: product.badge || "SELECCIÓN",
      price: Number(product.price ?? 0.99),
      currency: product.currency || "USD",
      price_is_sample: true,
      availability: product.availability || "disponible",
      published: true,
      images: product.images?.length ? product.images : product.image ? [product.image] : [],
      image_position: product.imagePosition || null,
      image_positions: product.imagePositions || [],
      reference: Boolean(product.reference),
      video_url: product.videoUrl || null,
      sort_order: index
    };
  }

  async function importDefaults() {
    const defaults = window.CAP_LAB_DEFAULT_PRODUCTS || [];
    if (!defaults.length) return;
    if (!window.confirm(`Se cargarán ${defaults.length} productos de muestra en Supabase. ¿Continuar?`)) return;
    const button = document.querySelector("#admin-seed");
    button.disabled = true;
    const { error } = await supabase.from("products").insert(defaults.map(defaultProductRow));
    button.disabled = false;
    if (error) {
      const banner = document.querySelector("#admin-dashboard-message");
      banner.textContent = `No se pudo cargar el catálogo inicial: ${error.message}`;
      banner.classList.remove("is-hidden");
      return;
    }
    await loadProducts();
  }

  async function uploadPendingImages() {
    const urls = [];
    for (const file of pendingImages) {
      const safeName = file.name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]/g, "-");
      const path = `${crypto.randomUUID()}-${safeName}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file, { cacheControl: "3600", upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    return urls;
  }

  async function saveProduct(event) {
    event.preventDefault();
    const submit = productForm.querySelector('[type="submit"]');
    const editorMessage = document.querySelector("#admin-editor-message");
    submit.disabled = true;
    try {
      message(editorMessage, pendingImages.length ? "Subiendo imágenes…" : "Guardando producto…");
      const uploaded = await uploadPendingImages();
      const id = productForm.elements.id.value;
      const current = products.find(product => product.id === id);
      const nextCode = String(Math.max(0, ...products.map(product => Number.parseInt(product.code, 10) || 0)) + 1).padStart(2, "0");
      const category = productForm.elements.category.value;
      const record = {
        code: current?.code || nextCode,
        name: productForm.elements.name.value.trim(),
        category,
        product_type: category === "gorras" ? "cap" : "pin",
        style: productForm.elements.style.value.trim(),
        description: productForm.elements.description.value.trim(),
        badge: productForm.elements.badge.value.trim(),
        price: Number(productForm.elements.price.value),
        currency: productForm.elements.currency.value,
        price_is_sample: productForm.elements.price_is_sample.checked,
        availability: productForm.elements.availability.value,
        published: productForm.elements.published.checked,
        images: [...editorImages, ...uploaded],
        image_position: current?.image_position || null,
        image_positions: current?.image_positions || [],
        reference: current?.reference || false,
        video_url: productForm.elements.video_url.value.trim() || null,
        sort_order: current?.sort_order ?? products.length,
        updated_at: new Date().toISOString()
      };
      if (!record.images.length) throw new Error("Añade al menos una foto del producto.");
      const result = id
        ? await supabase.from("products").update(record).eq("id", id)
        : await supabase.from("products").insert(record);
      if (result.error) throw result.error;
      await loadProducts();
      editor.close();
    } catch (error) {
      message(editorMessage, error.message || "No se pudo guardar el producto.", "error");
    } finally {
      submit.disabled = false;
    }
  }

  async function deleteProduct(id) {
    const product = products.find(item => item.id === id);
    if (!product || !window.confirm(`¿Eliminar “${product.name}” del catálogo?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      const banner = document.querySelector("#admin-dashboard-message");
      banner.textContent = `No se pudo eliminar el producto: ${error.message}`;
      banner.classList.remove("is-hidden");
      return;
    }
    await loadProducts();
  }

  if (!supabase) {
    setupMessage(`Falta conectar Supabase. Sigue la <a href="README-ADMIN.md">guía de configuración</a> y pega la URL y la clave publishable en <code>supabase-config.js</code>.`);
    loginForm.querySelectorAll("input,button").forEach(control => { control.disabled = true; });
    return;
  }

  loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    const button = loginForm.querySelector('[type="submit"]');
    button.disabled = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginForm.elements.email.value.trim(),
      password: loginForm.elements.password.value
    });
    button.disabled = false;
    if (error) {
      message(document.querySelector("#admin-login-message"), "No se pudo iniciar sesión. Revisa el correo y la contraseña.", "error");
      return;
    }
    await enterDashboard(data.user);
  });

  document.querySelector("#admin-logout").addEventListener("click", async () => {
    await supabase.auth.signOut();
    products = [];
    dashboard.classList.add("is-hidden");
    loginView.classList.remove("is-hidden");
    loginForm.reset();
    message(document.querySelector("#admin-login-message"));
  });

  document.querySelector("#admin-add-product").addEventListener("click", startNewProduct);
  document.querySelector("#admin-seed").addEventListener("click", importDefaults);
  document.querySelector("#editor-close").addEventListener("click", () => editor.close());
  document.querySelector("#editor-cancel").addEventListener("click", () => editor.close());
  productForm.addEventListener("submit", saveProduct);

  productList.addEventListener("click", event => {
    const edit = event.target.closest("[data-edit-product]");
    const remove = event.target.closest("[data-delete-product]");
    if (edit) editProduct(edit.dataset.editProduct);
    if (remove) deleteProduct(remove.dataset.deleteProduct);
  });

  productForm.elements.images.addEventListener("change", event => {
    const files = [...event.target.files];
    const invalid = files.find(file => !file.type.startsWith("image/") || file.size > 8 * 1024 * 1024);
    if (invalid) {
      message(document.querySelector("#admin-editor-message"), `${invalid.name} no es una imagen admitida o supera 8 MB.`, "error");
      event.target.value = "";
      return;
    }
    pendingImages.push(...files);
    event.target.value = "";
    previewEditorImages();
    message(document.querySelector("#admin-editor-message"));
  });

  imageList.addEventListener("click", event => {
    const removeSaved = event.target.closest("[data-remove-saved]");
    const removePending = event.target.closest("[data-remove-pending]");
    if (removeSaved) editorImages.splice(Number(removeSaved.dataset.removeSaved), 1);
    if (removePending) pendingImages.splice(Number(removePending.dataset.removePending), 1);
    if (removeSaved || removePending) previewEditorImages();
  });

  supabase.auth.getSession().then(({ data }) => {
    if (data.session?.user) enterDashboard(data.session.user);
  });
})();
