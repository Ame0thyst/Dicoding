// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}

//* SUDAH SELESAI SEMUA TODO
//? TERIMAKASIH ATAS REVIEW YANG DIBERIKAN ✨

let orders = [];

/**
 * 
 * @param {string} customerName 
 * @param {Array} items 
 * @returns {Object} 
 */

function addOrder(customerName, items) {
  // Hitung total harga
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  // Buat objek pesanan baru
  const newOrder = {
    id: generateUniqueId(),
    customerName,
    items,
    totalPrice,
    status: 'Menunggu'
  };

  orders.push(newOrder);

  return newOrder;
}

/**
 * 
 * @param {string} orderId 
 * @param {string} status 
 */
function updateOrderStatus(orderId, status) {
  const orderIndex = orders.findIndex(order => order.id === orderId);

  
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
  }
}

/**
 * 
 * @returns {number} Total pendapatan
 */
function calculateTotalRevenue() {
  return orders
    .filter(order => order.status === 'Selesai')
    .reduce((total, order) => total + order.totalPrice, 0);
}

/**
 * 
 * @param {string} id 
 */
function deleteOrder(id) {
  orders = orders.filter(order => order.id !== id);
}

export { orders, addOrder, updateOrderStatus, calculateTotalRevenue, deleteOrder };