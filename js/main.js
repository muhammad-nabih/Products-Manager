// CALL ALL ELEMENTS
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const taxes = document.querySelector("#taxes");
const count = document.querySelector("#count");
const ads = document.querySelector("#ads");
const discount = document.querySelector("#discount");
const category = document.querySelector("#category");
const priceInputs = document.querySelectorAll('.price input[type="number"]');
const totalElement = document.querySelector("#total");
const tableBody = document.querySelector("tbody");
const submit = document.querySelector("#submit");
const sortPrice = document.querySelector("#sortPrice");
const sortDate = document.querySelector("#sortDate");
const sortTitle = document.querySelector("#sortTitle");
const sortCategory = document.querySelector("#sortCategory");

// Initialize dataProduct from local storage
let dataProduct = [];
if (localStorage.getItem("data")) {
  dataProduct = JSON.parse(localStorage.getItem("data"));
}

// Add input event listener to price inputs
priceInputs.forEach((input) => {
  input.addEventListener("input", calculateTotalPrice);
});

// Add click event listener to submit button
submit.addEventListener("click", createProduct);

// Function to calculate the total price
function calculateTotalPrice() {
  const priceValue = parseFloat(priceInputs[0].value || 0);
  const taxesValue = parseFloat(priceInputs[1].value || 0);
  const adsValue = parseFloat(priceInputs[2].value || 0);
  const discountValue = parseFloat(priceInputs[3].value || 0);

  if (priceValue >= 0) {
    const totalPrice = priceValue + taxesValue + adsValue - discountValue;
    totalElement.textContent = `${totalPrice.toFixed(1)}`;
    totalElement.style.background = "#ff8906";
  } else {
    totalElement.style.background = "transparent";
    totalElement.textContent = "";
  }
}

// Function to create a new product
function createProduct() {
  if (submit.classList.contains("update")) {
    submit.innerHTML = "Create";
  }

  if (title.value !== "" && price.value !== "") {
    const newProduct = {
      id: Date.now(),
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: totalElement.textContent,
      category: category.value,
    };
    dataProduct.push(newProduct);
    setDataToLocalStorage(dataProduct);
    clearInputFields();
    addProductsToPage(dataProduct);
  } else {
    submit.style.disabled = "true";
  }
}

// Function to set data to local storage
function setDataToLocalStorage(dataProduct) {
  localStorage.setItem("data", JSON.stringify(dataProduct));
}

// Function to clear input fields after creating a product
function clearInputFields() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
}

function addProductsToPage(dataProduct) {
  tableBody.innerHTML = "";

  // قم بإضافة كل منتج إلى الصفحة
  for (const product of dataProduct) {
    const row = document.createElement("tr");

    row.setAttribute("data-id", product.id);
    // إضافة الأعمدة للصف
    const idCell = document.createElement("td");
    idCell.textContent = product.id;

    const titleCell = document.createElement("td");
    titleCell.textContent = product.title;

    const priceCell = document.createElement("td");
    priceCell.textContent = product.price;

    const taxesCell = document.createElement("td");
    taxesCell.textContent = product.taxes;

    const adsCell = document.createElement("td");
    adsCell.textContent = product.ads;

    const discountCell = document.createElement("td");
    discountCell.textContent = product.discount;

    const totalCell = document.createElement("td");
    totalCell.textContent = product.total;

    const categoryCell = document.createElement("td");
    categoryCell.textContent = product.category;

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteProduct(product.id));
    deleteCell.appendChild(deleteButton);

    const updateCell = document.createElement("td");
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", () => updateProduct(product.id));
    updateCell.appendChild(updateButton);

    // إضافة الأعمدة إلى الصف
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(priceCell);
    row.appendChild(taxesCell);
    row.appendChild(adsCell);
    row.appendChild(discountCell);
    row.appendChild(totalCell);
    row.appendChild(categoryCell);
    row.appendChild(deleteCell);
    row.appendChild(updateCell);

    // إضافة الصف إلى الجدول
    tableBody.appendChild(row);
  }
}
addProductsToPage(dataProduct); // تمرير dataProduct كمعامل

// Function to delete a product by ID
function deleteProduct(productId) {
  dataProduct = dataProduct.filter((product) => product.id !== productId);
  addProductsToPage(dataProduct);
  setDataToLocalStorage(dataProduct);
}

sortPrice.addEventListener("click", sortProductsByPriceDescending);
sortDate.addEventListener("click", sortProductsByDateDescending);
sortTitle.addEventListener("click", sortProductsAlphabetically);
sortCategory.addEventListener("click", sortProductsByCategory);
function sortProductsByPriceDescending() {
  dataProduct.sort((a, b) => {
    return parseFloat(b.price) - parseFloat(a.price);
  });
  addProductsToPage(dataProduct);
  setDataToLocalStorage(dataProduct);
}

function sortProductsByDateDescending() {
  dataProduct.sort((a, b) => b.id - a.id); // يفرز حسب الفرق بين التواريخ (أحدث إلى أقدم)
  addProductsToPage(dataProduct);
  setDataToLocalStorage(dataProduct);
}

function sortProductsAlphabetically() {
  dataProduct.sort((a, b) => a.title.localeCompare(b.title)); // يفرز أبجدياً بناءً على اسم المنتج
  addProductsToPage(dataProduct);
  setDataToLocalStorage(dataProduct);
}

function sortProductsByCategory() {
  dataProduct.sort((a, b) => a.category.localeCompare(b.category)); // يفرز بناءً على الفئة (Category)
  addProductsToPage(dataProduct);
  setDataToLocalStorage(dataProduct);
}

function updateProduct(productId) {
  const rowProduct = document.querySelector(`tr[data-id="${productId}"]`);
rowProduct.classList.toggle("highlight");
  const productToUpdate = dataProduct.find(
    (product) => product.id === productId
  );
  if (productToUpdate) {
    title.value = productToUpdate.title;
    price.value = productToUpdate.price;
    taxes.value = productToUpdate.taxes;
    ads.value = productToUpdate.ads;
    discount.value = productToUpdate.discount;
    category.value = productToUpdate.category;
    total.textContent = productToUpdate.total;

    submit.classList.add("update");
    submit.innerHTML = "update product";

    // حساب السعر الإجمالي مع القيم الجديدة
    calculateTotalPrice();

    // إزالة المنتج القديم من القائمة
    dataProduct = dataProduct.filter((product) => product.id !== productId);

    setDataToLocalStorage(dataProduct);
  }
}

// Function to sort products by price in descending order

