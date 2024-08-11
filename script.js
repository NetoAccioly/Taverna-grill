// Atualiza o carrinho de compras com base nos itens selecionados e suas quantidades
function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    document.querySelectorAll('.item-checkbox:checked').forEach(function (checkbox) {
        const itemName = checkbox.dataset.name;
        const itemPrice = parseFloat(checkbox.dataset.price);
        const itemQuantity = parseInt(checkbox.closest('.menu-item').querySelector('.item-quantity').value);
        total += itemPrice * itemQuantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.textContent = `${itemName} - R$ ${itemPrice.toFixed(2)} x ${itemQuantity}`;
        cartItems.appendChild(cartItem);
    });

    document.querySelector('.cart-total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Habilita ou desabilita o campo de quantidade com base na seleção do checkbox
document.querySelectorAll('.item-checkbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        const quantityInput = this.closest('.menu-item').querySelector('.item-quantity');
        quantityInput.disabled = !this.checked;
        updateCart();
    });
});

// Atualiza o carrinho quando a quantidade dos itens é alterada
document.querySelectorAll('.item-quantity').forEach(function (input) {
    input.addEventListener('input', updateCart);
});

// Exibe a seção de resumo do pedido ao clicar no botão de finalizar pedido
document.getElementById('checkout').addEventListener('click', function () {
    document.querySelector('.order-summary').style.display = 'block';
});

// Confirma o pedido se todos os campos obrigatórios forem preenchidos
document.getElementById('confirm').addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();

    if (name === "" || address === "") {
        alert('Por favor, preencha todos os campos obrigatórios (Nome Completo e Endereço).');
    } else {
        alert('Pedido confirmado!');
        // Aqui você pode adicionar código adicional para enviar o pedido, limpar o formulário, etc.
        // Exemplo de reiniciar o formulário e ocultar a seção de resumo do pedido:
        document.getElementById('name').value = '';
        document.getElementById('address').value = '';
        document.querySelector('.order-summary').style.display = 'none';
        document.querySelector('.cart-items').innerHTML = '';
        document.querySelector('.cart-total').textContent = 'Total: R$ 0,00';
        document.querySelectorAll('.item-checkbox').forEach(function (checkbox) {
            checkbox.checked = false;
            checkbox.closest('.menu-item').querySelector('.item-quantity').disabled = true;
            checkbox.closest('.menu-item').querySelector('.item-quantity').value = 1;
        });
    }
});

// Oculta a seção de resumo do pedido ao clicar no botão de cancelar
document.getElementById('cancel').addEventListener('click', function () {
    document.querySelector('.order-summary').style.display = 'none';
});
