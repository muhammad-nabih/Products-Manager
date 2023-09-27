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

// Event listeners
priceInputs.forEach((input) => {
  input.addEventListener("input", calculateTotalPrice);
});

submit.addEventListener("click", createOrUpdateProduct);

sortPrice.addEventListener("click", sortProductsByPriceDescending);
sortDate.addEventListener("click", sortProductsByDateDescending);
sortTitle.addEventListener("click", sortProductsAlphabetically);
sortCategory.addEventListener("click", sortProductsByCategory);

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

// Function to create or update a product
function createOrUpdateProduct() {
  if (submit.classList.contains("update")) {
    // Update product
    updateProduct();
  } else {
    // Create product
    createProduct();
  }
}

// Function to create a new product
function createProduct() {
  if (title.value !== "" && price.value !== "") {
    if (count.value > 1) {
      for (let i = 1; i < count.value; i++) {
        const newProduct = {
          id: i,
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
      }
    }

    setDataToLocalStorage(dataProduct);
    clearInputFields();
    addProductsToPage(dataProduct);
  } else {
    submit.style.disabled = "true";
  }
}

// Function to update a product

function updateProduct() {
  const productId = parseInt(submit.getAttribute("data-product-id"));

  if (productId) {
    const productToUpdate = dataProduct.find(
      (product) => product.id === productId
    );
    if (productToUpdate) {
      productToUpdate.title = title.value;
      productToUpdate.price = price.value;
      productToUpdate.taxes = taxes.value;
      productToUpdate.ads = ads.value;
      productToUpdate.discount = discount.value;
      productToUpdate.total = totalElement.textContent;
      productToUpdate.category = category.value;
      clearInputFields();
      submit.classList.remove("update");
      submit.innerHTML = "Create";
      setDataToLocalStorage(dataProduct);
      addProductsToPage(dataProduct);
    }
  }
}

// Function to set data to local storage
function setDataToLocalStorage(dataProduct) {
  localStorage.setItem("data", JSON.stringify(dataProduct));
}

// Function to clear input fields after creating/updating a product
function clearInputFields() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  totalElement.innerHTML = "";
}

// Function to add products to the page
function addProductsToPage(dataProduct) {
  tableBody.innerHTML = "";
  for (const product of dataProduct) {
    const row = document.createElement("tr");
    row.setAttribute("data-id", product.id);
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
    updateButton.addEventListener("click", () =>
      prepareUpdateProduct(product.id)
    );
    updateCell.appendChild(updateButton);
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
    tableBody.appendChild(row);
  }
}

// Function to delete a product by ID
function deleteProduct(productId) {
  dataProduct = dataProduct.filter((product) => product.id !== productId);
  addProductsToPage(dataProduct);
  setDataToLocalStorage(dataProduct);
}

// Function Delete All Products
function deleteAllProducts(dataProduct) {
  const deleteAll = document.getElementById("deleteAll");
  if (dataProduct.length > 1) {
    deleteAll.style.display = "block";
  } else {
    deleteAll.style.display = "none";
  }
}
deleteAllProducts(dataProduct);

// Function to prepare product data for update
function prepareUpdateProduct(productId) {
  const productToUpdate = dataProduct.find(
    (product) => product.id === productId
  );

  // we need three constants

  // 2 - the row how i click on
  const rowClicked = document.querySelector(`tr[data-id="${productId}"]`);

  const isHighlighter = rowClicked.classList.contains("highlighter"); // false

  let allRowContainHighlighter = document.querySelectorAll("tr.highlighter");

  allRowContainHighlighter = allRowContainHighlighter.forEach((row) =>
    row.classList.remove("highlighter")
  );

  if (!isHighlighter) {
    // Add highlighter class
    rowClicked.classList.add("highlighter");
    if (productToUpdate) {
      title.value = productToUpdate.title;
      price.value = productToUpdate.price;
      taxes.value = productToUpdate.taxes;
      ads.value = productToUpdate.ads;
      discount.value = productToUpdate.discount;
      category.value = productToUpdate.category;
      totalElement.textContent = productToUpdate.total;

      submit.classList.add("update");
      submit.innerHTML = "Update Product";
      submit.setAttribute("data-product-id", productId);

      calculateTotalPrice();
    }
  } else {
    clearInputFields();

    submit.classList.remove("update");
    submit.innerHTML = "Create";
  }
}

// Function to sort products by price in descending order
function sortProductsByPriceDescending() {
  dataProduct.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  addProductsToPage(dataProduct);
  setDataToLocalStorage(dataProduct);
}

// Function to sort products by date in descending order
function sortProductsByDateDescending() {
  dataProduct.sort((a, b) => b.id - a.id);
  addProductsToPage(dataProduct);
  setDataToLocalStorage(dataProduct);
}

// Function to sort products alphabetically by title
function sortProductsAlphabetically() {
  dataProduct.sort((a, b) => a.title.localeCompare(b.title));
  addProductsToPage(dataProduct);
  setDataToLocalStorage(dataProduct);
}

// Function to sort products alphabetically by category
function sortProductsByCategory() {
  dataProduct.sort((a, b) => a.category.localeCompare(b.category));
  addProductsToPage(dataProduct);
  setDataToLocalStorage(dataProduct);
}

// Initialize the table with existing data
addProductsToPage(dataProduct);
