/**
 * TODO
 * Selesaikan kode pembuatan class Item dengan ketentuan:
 * - Memiliki properti `id` (number), `name` (string), `quantity` (number), dan `price` (number).
 * - Memiliki method `updateDetails()` untuk mengubah nilai `name`, `quantity`, dan `price`.
 * - Memiliki method `displayDetails()` yang mengembalikan informasi detail dari Item dengan format:
 *   ```
 *     ID: ${id}, Name: ${name}, Quantity: ${quantity}, Price: ${price}
 *   ```
 */


class Item {
    /**
     * Constructor untuk membuat objek Item
     * @param {number} id - ID unik item
     * @param {string} name - Nama item
     * @param {number} quantity - Jumlah item
     * @param {number} price - Harga item
     */
    constructor(id, name, quantity, price) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    /**
     * Method untuk mengupdate detail item
     * @param {string} name - Nama baru item
     * @param {number} quantity - Jumlah baru item
     * @param {number} price - Harga baru item
     */
    updateDetails(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    /**
     * Method untuk menampilkan detail item dalam format tertentu
     * @returns {string} - Detail item dalam format spesifik
     */
    displayDetails() {
        return `ID: ${this.id}, Name: ${this.name}, Quantity: ${this.quantity}, Price: ${this.price}`;
    }
}


export default Item;