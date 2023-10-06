const shoes = [
    {
        id: 0,
        image: 'shoes/kito1.jpeg',
        title: 'kito',
        price: 3000,
    },
    {
        id: 1,
        image: 'shoes/kito2.jpg',
        title: 'kito',
        price: 2500,
    },
    {
        id: 2,
        image: 'shoes/56449c06f863ff21fee6a52.mobile-gallery-large.jpg',
        title: 'kito',
        price: 2000,
    },
    {
        id: 3,
        image: 'shoes/basket1.jpg',
        title: 'basket',
        price: 10000,
    },
    {
        id: 4,
        image: 'shoes/basket2.webp',
        title: 'basket',
        price: 15000,
    },
    {
        id: 5,
        image: 'shoes/basket3.webp',
        title: 'basket',
        price: 20000,
    },
    {
        id: 6,
        image: 'shoes/claquette1.jpg',
        title: 'claquette',
        price: 25000,
    },
    {
        id: 7,
        image: 'shoes/claquette2.jpg',
        title: 'claquette',
        price: 30000,
    },
    {
        id: 8,
        image: 'shoes/claquette3.webp',
        title: 'claquette',
        price: 1000,
    },
    {
        id: 9,
        image: 'shoes/soulier1.jpg',
        title: 'soulier',
        price: 40000,
    },
    {
        id: 10,
        image: 'shoes/soulier2.jpg',
        title: 'soulier',
        price: 60000,
    },
    {
        id: 11,
        image: 'shoes/soulier3.webp',
        title: 'soulier',
        price: 50000,
    },
];

const categories = [...new Set(shoes.map((item) => item.title))];

document.getElementById('store-items').innerHTML = categories.map((category) => {
    const categoryItems = shoes.filter((item) => item.title === category);

    return categoryItems.map((item) => `
        <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item ${category}s">
            <div class="card" id="${item.id}">
                <div class="img-container">
                    <img src="${item.image}" class="card-img-top store-img" alt="">
                    <span class="store-item-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </span>
                    <span class="store-item-icon-star">
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    </span>
                </div>
                <div class="card-body">
                    <div class="card-text d-flex justify-content-between text-capitalize">
                        <h5 id="store-item-name">${item.title} item</h5>
                        <h5 class="store-item-value"><strong id="store-item-price" class="font-weight-bold">${item.price} Fcfa</strong></h5>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
});

const star = document.querySelectorAll('.bi-star')
// console.log(star);
star.forEach(element => {
  element.addEventListener('click', e => {
    const parentStar = e.target.parentElement;
    // console.log(e.target.parentElement);
    const stars = parentStar.querySelectorAll("i");
    let check = false;
    for (let i = 0; i < stars.length; i++) {
      if(!check) {
        stars[i].classList.remove('bi-star');
        stars[i].classList.add('bi-star-fill');
        if (stars[i] === e.target) check = true;
      } else {
        stars[i].classList.add('bi-star');
        stars[i].classList.remove('bi-star-fill');
      
      }
    }
  })
});

let info = document.getElementById('cart-info');
info.addEventListener('click' , function () {

    if (document.getElementById('cart').style.display === "none") {
        document.getElementById('cart').style.display = "block";
      } else {
        document.getElementById('cart').style.display = "none";
      }
})

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(shopping));
}

let shopping = JSON.parse(localStorage.getItem('tasks')) || [];
document.onload = DoShopping()
function DoShopping() {
    if (shopping.length === 0) {
        document.getElementById('cart').innerHTML = "Le panier est vide";
        document.getElementById('cart').innerHTML += `<div class="cart-total-container d-flex justify-content-around text-capitalize mt-5">
        <h5>total</h5>
        <h5> <strong id="cart-total" class="font-weight-bold">0.00</strong> Fcfa</h5>
      </div>
      <div class="cart-buttons-container mt-3 d-flex justify-content-between">
        <a href="#" id="clear-cart" class="btn btn-outline-secondary btn-black text-uppercase">clear cart</a>
        <a href="#" class="btn btn-outline-secondary text-uppercase btn-pink">checkout</a>
      </div>`;
    } else {

        let total = 0;
        updateLocalStorage()
        shopping.forEach((item) => {
            total += item.price;
        });
        const nombre = document.getElementById('item-count');
        const itemCount = shopping.length;
                nombre.textContent = itemCount;
                updateLocalStorage()
        document.getElementById('cart').innerHTML = shopping.map((item) => {
           
            let { id, image, title, price } = item;
            return (
                `<div class="cart-item d-flex justify-content-between text-capitalize my-3">
                    <img src="${image}" class="img-fluid rounded-circle" id="item-img" alt="">
                    <div class="item-text">
                        <p id="cart-item-title" class="font-weight-bold mb-0">${title} item</p>
                        <span id="cart-item-price" class="cart-item-price" class="mb-0">${price}</span>
                        <span>Fcfa</span>
                    </div>
                    <a href="#" class="cart-item-remove" data-id="${id}">
                        <i class="fas fa-trash"></i>
                    </a>
                </div>`
            )
        }).join('');
        document.getElementById('cart').innerHTML += `<div class="cart-total-container d-flex justify-content-around text-capitalize mt-5">
        <h5>total</h5>
        <h5> <strong id="cart-total" class="font-weight-bold">0.00</strong> Fcfa</h5>
      </div>
      <div class="cart-buttons-container mt-3 d-flex justify-content-between">
        <a href="#" id="clear-cart" class="btn btn-outline-secondary btn-black text-uppercase">clear cart</a>
        <a href="#" class="btn btn-outline-secondary text-uppercase btn-pink">checkout</a>
      </div>`;
      const efface = document.getElementById('clear-cart')
      document.onload = efface.addEventListener('click', function() {
        shopping = [];
        DoShopping();
        updateLocalStorage()
        document.getElementById('item-count').textContent = 0;
        document.querySelector('.item-total').textContent = 0;
        });
      document.getElementById('cart-total').textContent = total;
      document.querySelector('.item-total').textContent = total;
      const removeButtons = document.querySelectorAll('.cart-item-remove');
      removeButtons.forEach((button) => {
          button.addEventListener('click', function (e) {
              e.preventDefault();
              const itemId = parseInt(button.getAttribute('data-id'));

              const indexToRemove = shopping.findIndex((item) => item.id === itemId);
              if (indexToRemove !== -1) {
                  shopping.splice(indexToRemove, 1);
              }
                DoShopping();
                updateLocalStorage()
            });
        });
    }
};


document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const storeItems = document.querySelectorAll(".store-item");
    const cartItemsshopping = document.querySelectorAll(".store-item-icon i.fa-shopping-cart");

    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const filterValue = button.getAttribute("data-filter");

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });
            button.classList.add("active");

            storeItems.forEach((item) => {
                if (filterValue === "all" || item.classList.contains(filterValue)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    cartItemsshopping.forEach((cartItem) => {
        cartItem.addEventListener("click", function () {
            const itemId = parseInt(cartItem.parentElement.parentElement.parentElement.id);
            const selectedItem = shoes.find((item) => item.id === itemId);
            if (selectedItem) {
                shopping.push(selectedItem);
                DoShopping();
            }
        });
    });
});


// const searchInput = document.getElementById('search-input');
// const searchIcon = document.getElementById('search-icon');

// searchIcon.addEventListener('click', function() {
//     const searchTerm = searchInput.value.toLowerCase();

//     const filteredShoes = shoes.filter((item) => item.title.toLowerCase().includes(searchTerm));

//     document.getElementById('store-items').innerHTML = filteredShoes.map((item) => `
//         <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item ${item.title}s">
//             <div class="card" id="${item.id}">
//                 <div class="img-container">
//                     <img src="${item.image}" class="card-img-top store-img" alt="">
//                     <span class="store-item-icon">
//                         <i class="fas fa-shopping-cart"></i>
//                     </span>
//                     <span class="store-item-icon-star">
//                         <i class="fa-solid fa-star"></i>
//                         <i class="fa-solid fa-star"></i>
//                         <i class="fa-regular fa-star"></i>
//                         <i class="fa-regular fa-star"></i>
//                         <i class="fa-regular fa-star"></i>
//                     </span>
//                 </div>
//                 <div class="card-body">
//                     <div class="card-text d-flex justify-content-between text-capitalize">
//                         <h5 id="store-item-name">${item.title} item</h5>
//                         <h5 class="store-item-value"><strong id="store-item-price" class="font-weight-bold">${item.price} Fcfa</strong></h5>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `).join('');
// });


