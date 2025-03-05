/**
 * TODO
 * Selesaikan kode pembuatan class Inventory dengan ketentuan:
 * - Memiliki properti `items` untuk menampung daftar item dalam bentuk array.
 * - Memiliki method `addItem` untuk menambahkan item ke properti `items`.
 * - Memiliki method `removeItem` untuk menghapus item berdasarkan `id`.
 * - Memiliki method `listItems` untuk mengembalikan string yang merupakan informasi detail barang (dipanggil dari fungs `item.displayDetails()`).
 */


class Inventory {
    
    constructor() {
        this.items = [];
    }

    /**
     * Method untuk menambahkan item ke dalam inventaris
     * @param {Item} item - Objek Item yang akan ditambahkan
     */
    addItem(item) {
        this.items.push(item);
    }

    /**
     * Method untuk menghapus item dari inventaris berdasarkan ID
     * @param {number} id - ID item yang akan dihapus
     */
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
    }

    /**
     * Method untuk menampilkan daftar item dalam inventaris
     * @returns {string} - Daftar detail item
     */
    listItems() {
        return this.items.map(item => item.displayDetails()).join('\n');
    }
}


export default Inventory;