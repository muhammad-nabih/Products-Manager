# Product Management

This project is a simple web application that allows you to manage products. You can add new products, update existing ones, search for products by title or category, and delete products. The project uses JavaScript and HTML to create the user interface and interact with the data.

## Variables and Elements

- title: An HTML element representing the text box for entering the product title.
- price: An HTML element representing the text box for entering the product price.
- taxes: An HTML element representing the text box for entering taxes.
- count: An HTML element representing the text box for entering the product count.
- ads: An HTML element representing the text box for entering the advertising cost.
- discount: An HTML element representing the text box for entering the discount value.
- category: An HTML element representing the text box for entering the product category.
- priceInputs: An array containing all the price text boxes.
- totalElement: An HTML element representing the total price.
- tableBody: An HTML element representing the table body for displaying products.
- submit: An HTML element representing the "Create" or "Update" product button.
- search: An HTML element representing the search input box.
- showAllProducts: An HTML element representing the "Show All Products" button.
- searchByTitle: An HTML element representing the "Search by Title" button.
- searchByCategory: An HTML element representing the "Search by Category" button.
- sortPrice: An HTML element representing the "Sort by Price" button.
- sortDate: An HTML element representing the "Sort by Date" button.
- sortTitle: An HTML element representing the "Sort by Title" button.
- sortCategory: An HTML element representing the "Sort by Category" button.
- deleteAll: An HTML element representing the "Delete All Products" button.

## Main Functions

- calculateTotalPrice(): Calculate the total price of the product based on prices, taxes, ads, and discounts.
- createOrUpdateProduct(): Create a new product or update an existing one.
- createProduct(): Create a new product.
- updateProduct(): Update an existing product.
- setDataToLocalStorage(): Store data in local memory.
- clearInputFields(): Clear the content of text boxes.
- addProductsToPage(): Display products on the page.
- deleteProduct(): Delete a product based on the product ID.
- showDeleteAll(): Show or hide the "Delete All Products" button.
- prepareUpdateProduct(): Prepare product data for an update.
- sortProductsByPriceDescending(): Sort products by price in descending order.
- sortProductsByDateDescending(): Sort products by date in descending order.
- sortProductsAlphabetically(): Sort products alphabetically by title.
- sortProductsByCategory(): Sort products alphabetically by category.

## Page Setup

- Load data stored in local memory into the page.

## Appearance

- The page contains a table used to display products.
- There are buttons for controlling various operations such as "Create," "Update," "Search," "Sort," "Delete," and more.
- Users can input product information and interact with the elements on the page.
