// selectors
const mobileToggler = document.querySelector(".mobile-toggler");
const opacity = document.querySelector(".opacity");
const customOffcanvas = document.querySelector(".custom-offcanvas");
const offcanvasCloseBtn = document.querySelector("#offcanvas-close-btn");
const a = document.querySelectorAll(".navbar-link");
const ul = document.querySelector(".ul-navbar-link-animation");
const hoverUnderline = document.querySelector(".hover-underline");
const app = document.querySelector("#app");
const minusIcon = document.querySelector("#minusIcon");
const plusIcon = document.querySelector("#plusIcon");
let productAmount = document.querySelector("#productAmount");
const addToCart = document.querySelector("#addToCart");
const cartIcon = document.querySelector("#cartIcon");
const cartNumIcon = document.querySelector("#cartNumIcon");
const amountDiv = document.querySelector("#amountDiv");
const emptyCardContainer = document.querySelector("#emptyCardContainer");
const cartDisplay = document.querySelector("#cartDisplay");

// offcanvas
mobileToggler.addEventListener("click", (e) => {
  e.preventDefault();
  opacity.classList.add("opacity-animate");
  customOffcanvas.classList.add("custom-offcanvas-left");
});

offcanvasCloseBtn.addEventListener("click", () => {
  customOffcanvas.classList.remove("custom-offcanvas-left");
  opacity.classList.remove("opacity-animate");
});

opacity.addEventListener("click", () => {
  offcanvasCloseBtn.click();
});

// styling logo
const avatar = document.querySelector("#avatar");
avatar.addEventListener("click", (event) => {
  event.preventDefault();
});

// navbar hover
const hoverAnimation = (event) => {
  if (hoverUnderline.classList.contains("under-line-hide")) {
    hoverUnderline.classList.remove("under-line-hide");
    hoverUnderline.addEventListener("transitionend", () => {
      hoverUnderline.classList.add("under-line-show");
    });
  }
  const width = event.target.offsetWidth;
  hoverUnderline.style.width = width + "px";
  const left = event.target.offsetLeft;
  hoverUnderline.style.transform = `translateX(${left}px)`;
  hoverUnderline.addEventListener("transitionend", () => {
    hoverUnderline.classList.add("under-line-show");
  });
};

const navLinkText = ["Collections", "Men", "Women", "About", "Contact"];
navLinkText.forEach((el, idx) => {
  const li = document.createElement("li");
  li.className = "list-group-item bg-transparent py-0 pt-2 position-static";
  const a = document.createElement("a");
  a.classList.add("text-decoration-none", "text-black", "navbar-link");
  a.setAttribute("nav-id", idx);
  a.innerText = el;
  li.append(a);
  ul.append(li);
  a.addEventListener("mouseover", hoverAnimation);
});

ul.addEventListener("mouseleave", () => {
  hoverUnderline.classList.remove("under-line-show");
  hoverUnderline.classList.add("under-line-hide");
});

// add to cart
cartIcon.addEventListener("click", (event) => {
  event.preventDefault();
});

minusIcon.addEventListener("click", () => {
  let amount = parseFloat(productAmount.innerText);
  amount === 0 ? (amount = 0) : --amount;
  productAmount.innerText = amount;
});

plusIcon.addEventListener("click", () => {
  let amount = parseFloat(productAmount.innerText);
  ++amount;
  productAmount.innerText = amount;
});

addToCart.addEventListener("click", () => {
  const amount = parseFloat(productAmount.innerText);
  addToCart.setAttribute("href", "#app");
  if (amount === 0) {
    addToCart.removeAttribute("href");
  }
  amountDiv.classList.contains("border") &&
    amountDiv.classList.remove("border");
  amount === 0 &&
    amountDiv.classList.add("border", "border-1", "border-orange");
  cartNumIcon.innerText = amount;
  if (amount > 0) {
    setTimeout(() => {
      cartIcon.classList.add("animate__animated", "animate__swing");
      cartIcon.addEventListener("animationend", () => {
        cartIcon.classList.remove("animate__animated", "animate__swing");
      });
    }, 550);
  }
});

let emptyCartOpen = false;
let cartOpen = false;
cartIcon.addEventListener("click", () => {
  if (parseFloat(cartNumIcon.innerText) === 0) {
    let div = document.querySelector("#emptyCart");
    if (!div) {
      div = document.createElement("div");
      div.className = "position-absolute animate__animated z-3";
      div.id = "emptyCart";
      div.innerHTML = `
        <div class="card text-bg-primary h-186">
          <div class="card-header fw-bold">Cart</div>
          <hr class="border border-1 border-dark-grayish-blue m-0" />
          <div class="card-body d-flex justify-content-center align-items-center">
            <p class="card-text fw-bold text-dark-grayish-blue">
              Your Cart is Empty
            </p>
          </div>
        </div>
      `;
      emptyCardContainer.appendChild(div);
    }

    if (emptyCartOpen) {
      div.classList.remove("animate__bounceInDown");
      div.classList.add("animate__bounceOutUp");
      cartDisplay.classList.replace("d-block", "d-none");
    } else {
      cartDisplay.classList.replace("d-none", "d-block");
      cartDisplay.classList.add("z-2");
      div.style.pointerEvents = "auto";
      div.classList.remove("animate__bounceOutUp");
      div.classList.add("animate__bounceInDown");
      div.classList.add("opacity-100");
      cartDisplay.addEventListener("click", () => {
        div.classList.remove("animate__bounceInDown");
        div.classList.add("animate__bounceOutUp");
        cartDisplay.classList.replace("d-block", "d-none");
        emptyCartOpen = false;
      });
    }
    emptyCartOpen = !emptyCartOpen;
  }

  if (parseFloat(cartNumIcon.innerText) > 0) {
    let amount = parseFloat(cartNumIcon.innerText);
    let div = document.querySelector("#openCart");
    if (!div) {
      div = document.createElement("div");
      div.className = "position-absolute animate__animated z-3";
      div.id = "openCart";
      div.innerHTML = `
        <div class="card text-bg-primary">
                    <div class="card-header fw-bold">Cart</div>
                    <hr class="border border-1 border-dark-grayish-blue m-0" />
                    <div class="card-body px-2 py-3">
                      <div
                        class="d-flex justify-content-between align-items-center mb-3"
                      >
                        <img
                          src="../images/image-product-1-thumbnail.jpg"
                          alt="sneaker image"
                          class="sneaker-thumbnail rounded"
                        />
                        <div>
                          <p class="m-0">Fall Limited Edition Sneakers</p>
                          <div>
                            <p class="m-0">
                              $125.00 x <span id="amount">${amount}</span> <span class="fw-bold ms-1">$</span><span
                                id="realPrice"
                                class="fw-bold"
                                >${(125.0 * amount).toFixed(2)}</span
                              >
                            </p>
                          </div>
                        </div>
                        <a id="deleteProduct">
                        <img src="../images/icon-delete.svg" alt="delete icon"  />
                        </a>
                      </div>
                      <a
                        class="d-flex d-flex text-decoration-none mx-2 justify-content-center py-3 rounded align-items-center bg-orange"
                        id="addToCart" href=""
                      >
                        <p class="m-0 text-white fw-bold">Checkout</p>
                      </a>
                    </div>
                  </div>
      `;
      emptyCardContainer.appendChild(div);

      const productRemoveIcon = div.querySelector("#deleteProduct");
      productRemoveIcon.addEventListener("click", () => {
        Swal.fire({
          title: "Are you sure?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            cartDisplay.click();
            div.addEventListener("animationend", () => {
              cartNumIcon.innerText = 0;
              productAmount.innerText = 0;
            });
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          }
        });
      });
    }

    if (cartOpen) {
      div.classList.remove("animate__bounceInDown");
      div.classList.add("animate__bounceOutUp");
      cartDisplay.classList.replace("d-block", "d-none");
      div.addEventListener("animationend", () => {
        div.remove();
      });
    } else {
      cartDisplay.classList.replace("d-none", "d-block");
      cartDisplay.classList.add("z-2");
      div.style.pointerEvents = "auto";
      div.classList.remove("animate__bounceOutUp");
      div.classList.add("animate__bounceInDown");
      div.classList.add("opacity-100");
      const deleteProduct = div.querySelector("#deleteProduct");
      deleteProduct.addEventListener("click", () => {
        const div = document.createElement("div");
        div.className = "w-100 vh-100 bg-dark";
      });
      cartDisplay.addEventListener("click", () => {
        div.classList.remove("animate__bounceInDown");
        div.classList.add("animate__bounceOutUp");
        cartDisplay.classList.replace("d-block", "d-none");
        div.addEventListener("animationend", () => {
          div.remove();
        });
        cartOpen = false;
      });
    }
    cartOpen = !cartOpen;
  }
});

// desktop thumbnails
const imgSrcs = [
  { src: "../../images/image-product-1.jpg", imgId: "img-1" },
  { src: "../../images/image-product-2.jpg", imgId: "img-2" },
  { src: "../../images/image-product-3.jpg", imgId: "img-3" },
  { src: "../../images/image-product-4.jpg", imgId: "img-4" },
];
const body = document.querySelector("body");
const desktopThumbnailsDiv = document.querySelector("#desktopThumbnailsDiv");
const heroImg = document.querySelector(".hero-img");

const thumbnailsDiv = (src, imgId) => {
  const div = document.createElement("div");
  div.innerHTML = `
<img src="${src}" img-id=${imgId} />
  `;
  div.addEventListener("click", (e) => {
    getObjectImgSrc(e.target.getAttribute("img-id"));
  });
  return div;
};

const showThumbnailsDiv = (src, imgId) => {
  const div = document.createElement("div");
  div.innerHTML = `
<img src="${src}" img-id=${imgId} />
  `;
  div.addEventListener("click", (e) => {
    console.log(e.target.getAttribute("img-id"));
  });
  return div;
};

const showThumbnails = () => {
  const div = document.createElement("div");
  div.id = "showThumbnailsDiv";
  div.className =
    "d-flex justify-content-between w-450 desktop-hover-thumbnails";
  imgSrcs.map((el) => div.append(thumbnailsDiv(el.src, el.imgId)));
  return div;
};

desktopThumbnailsDiv.append(showThumbnails());

const getObjectImgSrc = (value) => {
  const selectedObj = imgSrcs.find((el) => el.imgId === value);
  createPopUp(selectedObj);
};

const createPopUp = (selectedObj) => {
  const popUpBg = document.createElement("div");
  popUpBg.className =
    "pop-up-bg d-none d-lg-block animate__animated animate__fadeIn";
  body.append(popUpBg);
  const popUpBox = document.createElement("div");
  popUpBox.className =
    "pop-up-gallery-box d-none d-lg-flex animate__animated animate__fadeIn";
  const popUpGallery = document.createElement("div");
  popUpGallery.className = "pop-up-gallery";
  const thumbnailsBox = document.createElement("div");
  thumbnailsBox.className =
    "thumbnails-box d-flex justify-content-between mx-auto";
  popUpGallery.innerHTML = `
   <div class="mb-4">
    <img
        src="../../images/pop-up-close.svg"
        id="popUpCloseBtn"
        class="d-block ms-auto"
    />
    </div>
     <div class="mb-4">
    <img src="${selectedObj.src}" id="currentImg" img-id=${selectedObj.imgId} alt="" />
    
    </div>
  `;
  imgSrcs.map((el) => {
    thumbnailsBox.append(showThumbnailsDiv(el.src, el.imgId));
  });

  popUpBox.append(popUpGallery);
  body.append(popUpBox);
  const closeBtn = popUpBox.querySelector("#popUpCloseBtn");
  closeBtn.addEventListener("click", () => {
    popUpBg.classList.replace("animate__fadeIn", "animate__fadeOut");
    popUpBox.classList.replace("animate__fadeIn", "animate__fadeOut");
    const currentImg = popUpGallery.querySelector("#currentImg");
    heroImg.src = currentImg.src;
    popUpBg.addEventListener("animationend", () => {
      popUpBg.remove();
      popUpBox.remove();
    });
    popUpBox.addEventListener("animationend", () => {
      popUpBg.remove();
      popUpBox.remove();
    });
  });
};
