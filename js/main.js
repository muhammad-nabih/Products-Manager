// CALL ALL ELEMENTS
const priceInputs = document.querySelectorAll('.price input[type="number"]');
const totalElement = document.querySelector("small");

priceInputs.forEach((input) => {
  input.addEventListener("input", calculateTotalPrice);
});

// <== START EVENT HANDLERS==>
function calculateTotalPrice() {
  // استخراج القيم من عناصر الإدخال وتحويلها إلى أرقام عائمة
  const priceValue = parseFloat(priceInputs[0].value || 0); // قيمة Price
  const taxesValue = parseFloat(priceInputs[1].value || 0); // قيمة Taxes
  const adsValue = parseFloat(priceInputs[2].value || 0); // قيمة Ads
  const discountValue = parseFloat(priceInputs[3].value || 0); // قيمة Discount
  if (priceValue > 0) {
    const totalPrice = priceValue + taxesValue + adsValue - discountValue;
    totalElement.textContent = `Total: ${totalPrice.toFixed(2)}`;
    totalElement.style.background = "#ff8906";
  } else {
    totalElement.style.background = "transparent";
    totalElement.textContent = "";
  }
}
// <== END EVENT HANDLERS ==>
