// window.addEventListener('DOMContentLoaded', function () {

//   'use strict';
//   let tab = document.querySelectorAll('.nav-item'),
//     header = document.querySelector('.nav-tabs'),
//     tabContent = document.querySelectorAll('.tab-content-item');


//   function hideTabContent(a) {
//     for (let i = a; i < tabContent.length; i++) {
//       tabContent[i].classList.remove('show');
//       tabContent[i].classList.add('hide');
//     }
//   }

//   hideTabContent(1);

//   tab[0].classList.add('active');


//   function showTabContent(b) {
//     if (tabContent[b].classList.contains('hide')) {
//       tabContent[b].classList.remove('hide');
//       tabContent[b].classList.add('show');
//     }
//   }

//   header.addEventListener('click', function (event) {
//     tab.forEach((el) => {
//       el.classList.remove('active');
//     })

//     let target = event.target;


//     if (target && target.classList.contains('nav-item')) {
//       for (let i = 0; i < tab.length; i++) {
//         if (target == tab[i]) {
//           hideTabContent(0);
//           showTabContent(i);
//           target.classList.add('active')
//           break;
//         }
//       }
//     }

//   });
// });