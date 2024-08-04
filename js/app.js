document.addEventListener("DOMContentLoaded", function () {
  // Load footer content
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footer = document.getElementById("footer");
      if (footer) footer.innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));

  // Load navbar content
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      const navbar = document.getElementById("navbar");
      if (navbar) navbar.innerHTML = data;
    })
    .catch((error) => console.error("Error loading navbar:", error));

  // slider
  // const slider1 = document.querySelector(".slider-inner");
  // const slides = slider1.children;
  // const prevButton = document.querySelector(".carousel-button.prev");
  // const nextButton = document.querySelector(".carousel-button.next");

  // let currentIndex = 0;

  // function updateCarousel() {
  //   // Reset all slides
  //   for (let i = 0; i < slides.length; i++) {
  //     slides[i].style.transform = `translateX(${-(currentIndex * 100)}%)`;
  //   }
  // }

  // function showNextSlide() {
  //   currentIndex = (currentIndex + 1) % slides.length;
  //   updateCarousel();
  // }

  // function showPrevSlide() {
  //   currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  //   updateCarousel();
  // }

  // // Initialize the carousel
  // updateCarousel();

  // // Event listeners for buttons
  // nextButton.addEventListener("click", showNextSlide);
  // prevButton.addEventListener("click", showPrevSlide);

  // Slider functionality
  // const slider = document.querySelector(".slider");
  // const innerSlider = document.querySelector(".slider-inner");

  // if (slider && innerSlider) {
  //   let pressed = false;
  //   let startx;
  //   let x;

  //   slider.addEventListener("mousedown", (e) => {
  //     pressed = true;
  //     startx = e.offsetX - innerSlider.offsetLeft;
  //     slider.style.cursor = "grabbing";
  //   });

  //   slider.addEventListener("mouseenter", () => {
  //     slider.style.cursor = "grab";
  //   });

  //   slider.addEventListener("mouseup", () => {
  //     slider.style.cursor = "grab";
  //     pressed = false;
  //   });

  //   window.addEventListener("mouseup", () => {
  //     pressed = false;
  //   });

  //   slider.addEventListener("mousemove", (e) => {
  //     if (!pressed) return;
  //     e.preventDefault();

  //     x = e.offsetX;
  //     innerSlider.style.left = `${x - startx}px`;
  //     checkBoundary();
  //   });

  //   function checkBoundary() {
  //     const outer = slider.getBoundingClientRect();
  //     const inner = innerSlider.getBoundingClientRect();

  //     if (parseInt(innerSlider.style.left, 10) > 0) {
  //       innerSlider.style.left = "0px";
  //     } else if (inner.right < outer.right) {
  //       innerSlider.style.left = `-${inner.width - outer.width}px`;
  //     }
  //   }
  //   checkBoundary();
  // }

  // Category page logic
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const productId = urlParams.get("productId");

  fetch("data/products.json")
    .then((response) => response.json())
    .then((data) => {
      const products = data.products;

      if (category) {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
          navbar.classList.add("white-bg");
        }
      }

      if (products) {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
          navbar.classList.add("white-bg");
        }
      }

      if (category) {
        if (products && products.hasOwnProperty(category)) {
          // Update the category title
          const categoryTitle = document.querySelector(".title1 h1");
          if (categoryTitle) categoryTitle.textContent = `Category ${category}`;
          loadCategoryPage(category, products);
        } else {
          console.error(`Category ${category} not found in products.`);
        }
      }

      function loadCategoryPage(category, products) {
        const productList = document.querySelector(".productContain");
        if (productList) {
          productList.innerHTML = "";

          // Get products based on category
          const categoryProducts = products[category];
          if (!categoryProducts) {
            console.error(`No products found for category: ${category}`);
            return;
          }

          categoryProducts.forEach((product) => {
            const productItem = document.createElement("div");
            productItem.className = "product-item";
            productItem.innerHTML = `
              <img src="${product.thumbnail}" alt="${product.title}">
              <div class="price-container">
                <h6>New!</h6>
                <h4>Rs. ${product.price}</h4>
              </div>
              <h4><a href="product.html?productId=${product.id}&category=${category}">${product.title}</a></h4>
            `;
            productList.appendChild(productItem);
          });
        }
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
});

// singleproduct
function selectImage(img) {
  const featuredImage = document.getElementById("featuredImage");
  featuredImage.src = img.src;
  document.querySelectorAll(".image-select").forEach((button) => {
    button.classList.remove("selected-image");
  });
  img.parentElement.classList.add("selected-image");
}

function selectSize(sizeInput) {
  document.querySelectorAll(".size-radio .label").forEach((label) => {
    label.classList.remove("selected-size");
  });
  sizeInput.nextElementSibling.classList.add("selected-size");
}

function updateQuantity(change) {
  const quantityInput = document.getElementById("quantity");
  let quantity = parseInt(quantityInput.value);
  quantity = isNaN(quantity) ? 0 : quantity;
  quantity += change;
  quantity = quantity < 0 ? 0 : quantity;
  quantityInput.value = quantity;

  validateQuantity();
  toggleButtonActiveState();
}

function validateQuantity() {
  const quantity = parseInt(document.getElementById("quantity").value);
  const addToCartButton = document.getElementById("addToCartButton");
  addToCartButton.disabled = quantity <= 0;
}

function toggleButtonActiveState() {
  const quantity = parseInt(document.getElementById("quantity").value);
  const minusButton = document.querySelector(".quantity-button.minus");
  const plusButton = document.querySelector(".quantity-button.plus");

  if (quantity <= 0) {
    minusButton.classList.add("active");
  } else {
    minusButton.classList.remove("active");
  }

  if (quantity > 0) {
    plusButton.classList.add("active");
  } else {
    plusButton.classList.remove("active");
  }
}

function showContactForm(event) {
  event.preventDefault();
  const quantity = parseInt(document.getElementById("quantity").value);
  let contactForm = document.getElementById("contactForm");
  if (quantity > 0 && contactForm.style.display === "none") {
    contactForm.style.display = "flex";
  } else if (quantity < 0 && contactForm.style.display === "flex") {
    contactForm.style.display = "none";
  } else {
    contactForm.style.display = "none";
  }
}

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const productId = urlParams.get("productId");
//fetch and display product data
if (productId && category) {
  fetch("data/products.json")
    .then((response) => response.json())
    .then((data) => {
      const products = data.products;
      if (products && products[category]) {
        const product = products[category].find((item) => item.id == productId);
        if (product) {
          displayProduct(product);
        } else {
          console.error(`Product with ID ${productId} not found.`);
        }
      } else {
        console.error(`Category ${category} not found.`);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayProduct(product) {
  // Update the featured image
  const featuredImage = document.getElementById("featuredImage");
  featuredImage.src = product.images[0];

  // Update the image gallery
  const imageSelector = document.getElementById("imageSelector");
  imageSelector.innerHTML = ""; // Clear existing images
  product.images.forEach((image, index) => {
    const button = document.createElement("button");
    button.className = "image-select";
    if (index === 0) button.classList.add("selected-image");
    button.innerHTML = `<img src="${image}" class="image" onclick="selectImage(this)" />`;
    imageSelector.appendChild(button);
  });

  // Update the product title and description
  document.getElementById("productTitle").textContent = product.title;
  document.getElementById("productDescription").textContent =
    product.description;
  // Update the price
  document.getElementById("productPrice").textContent = product.price;

  // Update sizes
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const sizeRadios = document.querySelector(".radio-group");

  // Check the category and show/hide size options
  if (category === "mens" || category === "womens") {
    document.getElementById("productCategory").textContent = "Layers";
    sizeRadios.style.display = "flex"; // Show size options
  } else {
    document.getElementById("productCategory").textContent = "Components";
    sizeRadios.style.display = "none"; // Hide size options
  }
}

// Smooth scroll to top
const scrollUpButton = document.getElementById("scrollUpButton");
if (scrollUpButton) {
  scrollUpButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

//tranform
const slider = document.querySelector(".slider");
const innerSlider = document.querySelector(".slider-inner");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");

if (slider && innerSlider && prevButton && nextButton) {
  // Draggable functionality
  let pressed = false;
  let startx;
  let x;

  slider.addEventListener("mousedown", (e) => {
    pressed = true;
    startx = e.offsetX - innerSlider.offsetLeft;
    slider.style.cursor = "grabbing";
  });

  slider.addEventListener("mouseenter", () => {
    slider.style.cursor = "grab";
  });

  slider.addEventListener("mouseup", () => {
    slider.style.cursor = "grab";
    pressed = false;
  });

  window.addEventListener("mouseup", () => {
    pressed = false;
  });

  slider.addEventListener("mousemove", (e) => {
    if (!pressed) return;
    e.preventDefault();
    x = e.offsetX;
    innerSlider.style.left = `${x - startx}px`;
    checkBoundary();
  });

  function checkBoundary() {
    const outer = slider.getBoundingClientRect();
    const inner = innerSlider.getBoundingClientRect();

    if (parseInt(innerSlider.style.left, 10) > 0) {
      innerSlider.style.left = "0px";
    } else if (inner.right < outer.right) {
      innerSlider.style.left = `-${inner.width - outer.width}px`;
    }
  }

  checkBoundary();

  // Button functionality
  const slideWidth =
    innerSlider.querySelector(".slide-img").offsetWidth +
    parseFloat(getComputedStyle(innerSlider).gap);

  prevButton.addEventListener("click", () => {
    const currentLeft = parseInt(innerSlider.style.left, 10) || 0;
    innerSlider.style.left = `${Math.min(currentLeft + slideWidth, 0)}px`;
    checkBoundary();
  });

  nextButton.addEventListener("click", () => {
    const currentLeft = parseInt(innerSlider.style.left, 10) || 0;
    const maxLeft = slider.offsetWidth - innerSlider.offsetWidth;
    innerSlider.style.left = `${Math.max(currentLeft - slideWidth, maxLeft)}px`;
    checkBoundary();
  });
}
