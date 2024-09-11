
// const setListener = (element, type, handler) => {
//   if (element) {
//     return;
//   }
//   element.addEventListener(type, handler);
//   return () => {
//     element.removeEventListener(type, handler);
//   }
// }


//Dropdown 
const dropdownBtn = document.querySelectorAll('.dropdown-btn');
// const cl = document.classList('nav');
// console.log(cl);


dropdownBtn.forEach((el) => {
  el.addEventListener('click', () => {
    el.nextElementSibling.classList.toggle("show");
  })
  // el.setListener(el, 'click', () => {
  //   console.log('Hello world!!!');
  // })
})

// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

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

//Slim select
import SlimSelect from 'slim-select';
const allSelect = document.querySelectorAll('.selectElement');

allSelect.forEach((el) => {
  new SlimSelect({
    select: el,
    settings: {
      showSearch: false
    }
  })
})

// const tabBtn = document.querySelectorAll('.nav-tabs > li');


// tabBtn.forEach((el) => {

//   el.addEventListener('click', () => {
//     // console.log(el.getAttribute('data-tab'));

//     var i, x, tablinks;
//     x = document.getElementsByClassName("tab-pane");
//     for (i = 0; i < x.length; i++) {
//       x[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("nav-item");
//     for (i = 0; i < x.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
//     }
//     document.getElementById(el.getAttribute('data-tab')).style.display = "block";
//     evt.currentTarget.className += " w3-red";

//     // function openTab(evt, cityName) {

//     // }
//   })

// })

// function openTab(evt, cityName) {
//   var i, x, tablinks;
//   x = document.getElementsByClassName("tab-pane");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   tablinks = document.getElementsByClassName("nav-item");
//   for (i = 0; i < x.length; i++) {
//     tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
//   }
//   document.getElementById(cityName).style.display = "block";
//   evt.currentTarget.className += " w3-red";
// }


// window.addEventListener('DOMContentLoaded', function () {

//   'use strict';
//   let tab = document.querySelectorAll('.nav-item'),
//     header = document.querySelector('.nav-tabs'),
//     tabContent = document.querySelectorAll('.tab-pan');

//   function hideTabContent(a) {
//     for (let i = a; i < tabContent.length; i++) {
//       tabContent[i].classList.remove('show');
//       tabContent[i].classList.add('hide');
//     }
//   }

//   hideTabContent(1);

//   function showTabContent(b) {
//     if (tabContent[b].classList.contains('hide')) {
//       tabContent[b].classList.remove('hide');
//       tabContent[b].classList.add('show');
//     }
//   }

//   header.addEventListener('click', function (event) {
//     let target = event.target;
//     if (target && target.classList.contains('nav-item')) {
//       for (let i = 0; i < tab.length; i++) {
//         if (target == tab[i]) {
//           hideTabContent(0);
//           showTabContent(i);
//           break;
//         }
//       }
//     }

//   });
// });

console.log(location.pathname.split("/"))



//Templates tabs list

// const templateList = document.querySelectorAll('.template-nav-list ul li');

// templateList.forEach(el => {
//   el.addEventListener('click', () => {
//     templateList.forEach(el => {
//       el.classList.remove('active')
//     })
//     el.classList.add('active')
//   })
// })

