//Dropdown 
const dropdownBtn = document.querySelectorAll('.dropdown-btn');
const dropdownContent = document.querySelectorAll('.dropdown-content');
const content = document.querySelector('.content');

document.addEventListener("DOMContentLoaded", function () {

  dropdownBtn.forEach((el) => {

    el.addEventListener('click', () => {
      let rect = el.getBoundingClientRect();

      if (el.nextElementSibling.classList.contains('show')) {
        el.blur();
        el.nextElementSibling.classList.toggle("show");
      } else {
        dropdownContent.forEach(el => {
          el.classList.remove("show");
        })
        el.nextElementSibling.classList.toggle("show");
      }


      el.nextElementSibling.style.transform = `translate(${rect.left - (el.nextElementSibling.offsetWidth - el.offsetWidth)}px, ${rect.top + el.offsetHeight + 4}px)`;
      // content.addEventListener('scroll', () => {
      //   el.nextElementSibling.style.transform = `translate(${rect.left - (el.nextElementSibling.offsetWidth - el.offsetWidth)}px, ${rect.top + el.offsetHeight - content.scrollTop}px)`;
      // })
    })

  })
});


content.addEventListener('scroll', () => {

  if (content.scrollTop > 0) {
    dropdownContent.forEach(el => {
      el.classList.remove("show");
    })
    dropdownBtn.forEach(el => {
      el.blur();
    })
  }
})


// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropdown-btn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//Highlight active menu link

const menuLinks = document.querySelectorAll('.menu-nav li');
const path = location.pathname.split("/");
menuLinks.forEach(el => {

  if (path[path.length - 1] == el.querySelector('a').getAttribute('href') && el.querySelector('a').getAttribute('href') != '') {
    el.classList.add('active');
  } else {
    el.classList.remove('active');
  }
})


//Mobile sidebar menu

const body = document.querySelector('body');
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.sidebar-header .close')
const overlay = document.querySelector('.overlay');

if (overlay) {
  overlay.addEventListener('click', () => {
    toggleMenu(false);
  })
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    toggleMenu(false);
  })
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    toggleMenu(true)
  })
}

const toggleMenu = (state) => {
  if (state) {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    body.classList.add('active');
  } else {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('active');
  }

}


const checkWidth = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth >= 992) {
    toggleMenu(false)
  }
}

window.addEventListener('resize', checkWidth)
