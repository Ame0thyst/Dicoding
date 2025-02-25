//   function toggleDropdown() {
//             const dropdown = document.getElementById('dropdown');
//             dropdown.classList.toggle('show');
//         }

//         // Close dropdown when clicking outside
//         window.onclick = function(event) {
//             if (!event.target.matches('.mobile-menu')) {
//                 const dropdowns = document.getElementsByClassName('dropdown');
//                 for (let i = 0; i < dropdowns.length; i++) {
//                     const openDropdown = dropdowns[i];
//                     if (openDropdown.classList.contains('show')) {
//                         openDropdown.classList.remove('show');
//                     }
//                 }
//             }
//         }
function toggleDropdown() {
  const dropdown = document.getElementById('dropdown');
  dropdown.classList.toggle('active');
}

// Tutup dropdown saat klik di luar
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('dropdown');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (!mobileNav.contains(event.target)) {
    dropdown.classList.remove('active');
  }
});