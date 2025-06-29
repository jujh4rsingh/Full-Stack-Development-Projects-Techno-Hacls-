document.addEventListener('DOMContentLoaded', () => {
  const itemForm = document.getElementById('item-form');
  const itemInput = document.getElementById('item-input');
  const itemList = document.getElementById('item-list');

  let items = [];

  function renderItems() {
    itemList.innerHTML = '';
    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="item-row">
          <span class="item-name">${item.name}</span>
          <div class="actions">
            <button onclick="editItem(${index})" title="Edit">✏️</button>
            <button onclick="deleteItem(${index})" title="Delete">🗑️</button>
          </div>
        </div>
      `;
      li.classList.add('fade-in');
      itemList.appendChild(li);
    });
  }

  // Fetch initial items
  fetch('/api/items')
    .then(res => res.json())
    .then(data => {
      items = data;
      renderItems();
    });

  // Add item
  itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemText = itemInput.value.trim();
    if (!itemText) return;

    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: itemText })
    })
      .then(res => res.json())
      .then(newItem => {
        items.push(newItem);
        itemInput.value = '';
        renderItems();
        showToast("Item added!");
      });
  });

  // Edit item
  window.editItem = (index) => {
    const newName = prompt('Edit item:', items[index].name);
    if (newName && newName.trim()) {
      items[index].name = newName.trim();
      renderItems();
      showToast("Item updated!");
    }
  };

  // Delete item
  window.deleteItem = (index) => {
    items.splice(index, 1);
    renderItems();
    showToast("Item deleted!");
  };

  // Toast
  window.showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };
});
