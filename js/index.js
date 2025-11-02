document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".trow .col");
  const menuSections = document.querySelectorAll(".Poupular_Menu .frow.mt-5[id]");
  let activeIndex = 0; // Default: Pizza (first one)

  function hideAllMenus() {
    menuSections.forEach(section => {
      section.style.display = "none";
      section.style.opacity = 0;
    });
  }

  function deactivateAllButtons() {
    categoryButtons.forEach(btn => btn.classList.remove("active"));
  }

  function showMenu(index) {
    const section = menuSections[index];
    if (section) {
      section.style.display = "block";
      setTimeout(() => (section.style.opacity = 1), 50);
    }
  }

  
  hideAllMenus();
  showMenu(activeIndex);
  categoryButtons[activeIndex].classList.add("active");

  categoryButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
     
      if (index === activeIndex) return;

      deactivateAllButtons();
      button.classList.add("active");

      const previousIndex = activeIndex;
      activeIndex = index;

      // Fade transition
      const previousSection = menuSections[previousIndex];
      previousSection.style.opacity = 0;
      setTimeout(() => {
        previousSection.style.display = "none";
        showMenu(activeIndex);
      }, 100);
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".menu-btn");
  const menus = document.querySelectorAll(".menu-content");
  let activeMenu = document.querySelector(".pizza-menu"); // Default active
  let activeButton = document.querySelector('[data-target="pizza"]'); // Default button

  // Initialize transition style
  menus.forEach(menu => {
    menu.style.transition = "opacity 0.4s ease";
    menu.style.opacity = 0;
    menu.style.display = "none";
  });

  // Default: show pizza menu
  activeMenu.style.display = "block";
  setTimeout(() => (activeMenu.style.opacity = 1), 10);
  activeButton.classList.add("active");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-target");
      const selectedMenu = document.querySelector(`.${target}-menu`);

      // 🚫 Prevent reloading if clicking on the same menu
      if (selectedMenu === activeMenu) return;

      // Deactivate all buttons and activate the clicked one
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Fade-out current active menu
      activeMenu.style.opacity = 0;

      setTimeout(() => {
        activeMenu.style.display = "none";

        // Fade-in new selected menu
        selectedMenu.style.display = "block";
        setTimeout(() => (selectedMenu.style.opacity = 1), 10);

        // Update active references
        activeMenu = selectedMenu;
        activeButton = button;
      }, 200); // match transition duration
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((element) => {
      const windowHeight = window.innerHeight;
      const revealTop = element.getBoundingClientRect().top;
      const revealPoint = 100; // smaller = reveal earlier

      if (revealTop < windowHeight - revealPoint) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // trigger once on load
});

