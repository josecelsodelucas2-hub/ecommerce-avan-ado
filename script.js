let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  total += price;
  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById('cart');
  if (cartDiv) cartDiv.innerText = `Carrinho (${cart.length})`;

  const items = document.getElementById('cart-items');
  if (items) {
    items.innerHTML = '';
    cart.forEach(item => {
      let li = document.createElement('li');
      li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
      items.appendChild(li);
    });
    document.getElementById('total').innerText = total.toFixed(2);
  }
}

function login(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.email === email && user.password === password) {
    alert("Login realizado com sucesso!");
    window.location.href = "index.html";
  } else {
    alert("Usuário ou senha inválidos!");
  }
}

function register(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('newEmail').value;
  const password = document.getElementById('newPassword').value;
  localStorage.setItem('user', JSON.stringify({ name, email, password }));
  alert("Cadastro realizado com sucesso!");
}

function finalizePurchase(event) {
  event.preventDefault();
  alert("Compra finalizada! Total: R$ " + total.toFixed(2));
  localStorage.removeItem('cart');
  window.location.href = "index.html";
}

updateCart();

