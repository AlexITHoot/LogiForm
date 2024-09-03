//Sortable

import Sortable from 'sortablejs';
var el = document.getElementById('items');
var sortable = Sortable.create(el);


//Chart
import ApexCharts from 'apexcharts'
var options = {
  series: [70],
  chart: {
    height: 350,
    type: 'radialBar',

  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%',
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: '34px',
          fontWeight: '700'
        }
      },
    },
  },

  labels: ['qwe'],
  stroke: {
    lineCap: 'round'
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

window.addEventListener('DOMContentLoaded', function () {

  'use strict';
  let tab = document.querySelectorAll('.nav-item'),
    header = document.querySelector('.template-nav-list ul'),
    tabContent = document.querySelectorAll('.templates-list');


  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  tab[0].classList.add('active');


  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  header.addEventListener('click', function (event) {
    tab.forEach((el) => {
      el.classList.remove('active');
    })

    let target = event.target;


    if (target && target.classList.contains('nav-item')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          target.classList.add('active')
          break;
        }
      }
    }

  });
});

//Radio checking
const radioList = document.querySelectorAll('.form-radio-list');
// const radioBtn = document.querySelectorAll('.form-radio');
// const par = document.querySelectorAll('.form-radio-list li');

radioList.forEach(listElement => {
  const radioBtn = listElement.querySelectorAll('.form-radio');
  radioBtn.forEach(radioElement => {
    radioElement.addEventListener('click', () => {
      radioBtn.forEach(element => element.parentElement.classList.remove('active'))
      radioElement.parentElement.classList.add('active');
    })
  })
})

//Upload file
const uploadBlock = document.querySelectorAll('.upload-block');


uploadBlock.forEach(el => {
  const actualBtn = el.querySelector('.actual-btn');
  const fileChosen = el.querySelector('.file-chosen');
  const btn = el.querySelector('.btn-upload');
  actualBtn.addEventListener('change', function () {
    fileChosen.textContent = this.files[0].name,
      fileChosen.insertAdjacentHTML('afterbegin', `
        <img src="./img/file.svg">
      `)
    // fileChosen.classList.add('uploaded')
    if (this.files.length > 0) {
      btn.textContent = 'Upload Another File'
    }
  })
})



//Wizard
let stepIndex = 0;
const wizard = document.querySelector('.wizard-page');
// const steps = wizard.querySelectorAll('.wizard-step');
// const steps = wizard.querySelectorAll('.wizard-content');

const nextStepBtn = wizard.querySelector('.next-step');
const prevStepBtn = wizard.querySelector('.prev-step');

const steps = document.querySelectorAll(".wizard-left-side .wizard-content");

const chooseTypeForm = wizard.querySelector('.choose-type-form ');
const selectedTemplate = wizard.querySelector('.selected-template');

const stepProgress = wizard.querySelector('.wizard-progress .step-progress');
const numberOfSteps = wizard.querySelector('.number_of_steps');
const progressBar = wizard.querySelector('.progress-bar');
stepProgress.innerHTML = stepIndex + 1;
numberOfSteps.innerHTML = steps.length;
console.log('stepIndex', stepIndex);
steps.forEach(el => {
  console.log('step check value', el.dataset.nextStep);
})


const fillProgressBar = () => {
  progressBar.style.width = `${(100 / steps.length) * (stepIndex + 1)}%`
}
fillProgressBar();

const notEmpty = (el) => {
  return el.value != null && el.value != "";
};

const chooseItem = (el) => {
  const items = el.querySelectorAll('[data-rule]');

  for (let index = 0; index < items.length; index++) {
    const r = items[index].checked;
    if (r) {
      return true;
    }
  }

  return false;
};

const validate = (el) => {
  const rule = el.getAttribute('data-rule');

  console.log('validate rule', rule);
  console.log('validate value', el.value);

  return eval(`${rule}(el)`);
}

const onChange = (e) => {
  console.log('onChange stepIndex', stepIndex);


  let stepValid = true;
  var itemsToValidate = steps[stepIndex].querySelectorAll('[data-rule]');

  itemsToValidate.forEach(el => {
    const attributeVale = el.getAttribute('data-rule');
    if (attributeVale == null || attributeVale == '' || el.disabled) {
      return;
    }

    console.log('itemsToValidate attributeVale', attributeVale);

    const r = validate(el);
    if (!r) {
      stepValid = false;
    }
  });

  nextStepBtn.disabled = !stepValid;
}

const inputs = wizard.querySelectorAll('input[data-rule][type="text"]')
inputs.forEach(el => {
  el.addEventListener('input', onChange);
});

const selects = wizard.querySelectorAll('select[data-rule]')
selects.forEach(el => {
  el.addEventListener('change', onChange);
});

const radioBtns = wizard.querySelectorAll('input[data-rule][type="radio"]')
radioBtns.forEach(el => {
  el.addEventListener('change', onChange);
  el.addEventListener('click', () => {
    if (el.value == 'useTemplate') {
      chooseTypeForm.classList.remove('active');
      chooseTypeForm.querySelector('[data-rule]').disabled = true;
      selectedTemplate.classList.add('active');
    } else if (el.value == 'blackCanvas') {
      selectedTemplate.classList.remove('active');
      chooseTypeForm.classList.add('active');
      chooseTypeForm.querySelector('[data-rule]').disabled = false;
    }
  })
});

const prevStepBtnText = () => {
  if (stepIndex >= 1) {
    prevStepBtn.innerHTML = 'Previous';
  } else {
    prevStepBtn.innerHTML = 'Cancel';
  }
}

const nextStepBtnText = () => {
  if (stepIndex == steps.length - 1) {
    nextStepBtn.innerHTML = 'Finish';
  } else {
    nextStepBtn.innerHTML = 'Next';
  }
}


nextStepBtn.addEventListener('click', () => {
  if (stepIndex < steps.length - 1) {
    const currentStep = steps[stepIndex];

    const nextStepParamsRaw = currentStep.getAttribute('data-next-step');
    const nextStepParams = JSON.parse(nextStepParamsRaw);

    let nextStepIndex;
    if (nextStepParams.element) {

      const elementValue = currentStep.querySelector(`[name="${nextStepParams.element}"]:checked`).value;
      nextStepIndex = nextStepParams.stepIndex[elementValue];
    } else {
      nextStepIndex = nextStepParams.stepIndex;
    }

    currentStep.classList.remove("show");
    steps[nextStepIndex].classList.add("show");
    stepIndex = nextStepIndex;
    stepProgress.innerHTML = stepIndex;
    prevStepBtnText();
    nextStepBtnText();
    fillProgressBar();
    onChange();
    stepBackground();
    displayWizardRightSide();
  }
})

prevStepBtn.addEventListener('click', () => {
  if (stepIndex > 0) {
    steps[stepIndex].classList.remove("show");
    steps[stepIndex - 1].classList.add("show");
    stepIndex--;
    stepProgress.innerHTML = stepIndex + 1;
    prevStepBtnText();
    nextStepBtnText();
    fillProgressBar();
    stepBackground();
    displayWizardRightSide();
  }
})


//

const stepBackground = () => {
  if (stepIndex == 0) {
    wizard.style.background = `url('./img/wizard-bg-1.png') no-repeat center right -68px`;
  } else if (stepIndex == 1) {
    wizard.style.background = `url('../../img/wizard-bg-2.png') no-repeat center right -535px`;
  } else if (stepIndex == 2) {
    wizard.style.background = `url('../../img/wizard-bg-3.png') no-repeat center right`;
  } else if (stepIndex == 3) {
    wizard.style.background = `url('../../img/wizard-bg-4.png') no-repeat center right`;
  } else {
    wizard.style.background = `none`
  }
}
stepBackground();

const selecteTemplateBtn = wizard.querySelector('.block-selecte-template button');
const templatePage = wizard.querySelector('.template-page');
const closeTemplate = wizard.querySelector('.template-page .cancel');
const useTemplate = templatePage.querySelectorAll('.use-template');
const wizardRightSide = wizard.querySelector('.wizard-right-side');
const wizardRightSideStepContent = wizard.querySelectorAll('.wizard-right-side .wizard-step-content');

const displayWizardRightSide = () => {
  wizardRightSideStepContent.forEach(el => {
    // console.log('step page', el.dataset.stepPage[4]);

    if (stepIndex == 4) {
      wizardRightSide.classList.remove('hide')
      if (el.dataset.stepPage == 4) {
        el.style.display = 'block';
      }
    } else if (stepIndex == 5) {
      wizardRightSide.classList.remove('hide')
      if (el.dataset.stepPage == 5) {
        el.style.display = 'block';
      }
    } else {
      wizardRightSide.classList.add('hide')
      el.style.display = 'none';
    }
  })
}

const handleTemplatePage = () => {
  if (templatePage.classList.contains('hide')) {
    templatePage.classList.remove('hide');
    templatePage.classList.add('show');
  } else {
    templatePage.classList.remove('show');
    templatePage.classList.add('hide');
  }
}
selecteTemplateBtn.addEventListener('click', () => {
  handleTemplatePage()
})
closeTemplate.addEventListener('click', () => {
  handleTemplatePage();
})

const selectTemplateIcon = wizard.querySelector('.select-template-icon');
const selectTemplateTitle = wizard.querySelector('.select-template-title');

useTemplate.forEach((el) => {
  el.addEventListener('click', () => {
    const text = el.parentElement.querySelector('.description h4').textContent;
    const img = el.parentElement.querySelector('.img-container').innerHTML;
    selectTemplateTitle.innerText = text;
    selectTemplateIcon.innerHTML = img;
    handleTemplatePage();
  })
})








// const dataFormType = wizard.querySelectorAll('[data-form-type]');
// const formRadioBtns = wizard.querySelectorAll('[data-form-choose] input[data-rule][type="radio"]');

// formRadioBtns.forEach(el => {
//   el.addEventListener('click', () => {
//     displayDataForm(el.value);
//   })
// })

// dataFormType.forEach((el) => {
//   el.style.display = 'none'
// })
// const displayDataForm = (type) => {
//   dataFormType.forEach((el) => {
//     if (el.dataset.formType == type) {
//       el.style.display = 'block'
//     } else {
//       el.style.display = 'none';
//     }
//   })
// }




// const standardFormValidation = () => {
//   const radioForm = wizard.querySelectorAll('input[type="radio"]');
//   radioForm.forEach(el => {
//     el.addEventListener('click', () => {
//       if (el.value == 'useTemplate') {
//         chooseTypeForm.classList.remove('active');
//         chooseTypeForm.querySelector('[data-rule]').disabled = true;

//         selectedTemplate.classList.add('active');
//         //selectedTemplate.querySelector('[data-rule]').disabled = false;
//       } else if (el.value == 'blackCanvas') {
//         selectedTemplate.classList.remove('active');
//         //selectedTemplate.querySelector('[data-rule]').disabled = true;

//         chooseTypeForm.classList.add('active');
//         chooseTypeForm.querySelector('[data-rule]').disabled = false;
//       }
//     })
//   })
// }

// standardFormValidation();

// const validateForm = (step) => {
//   switch (step) {
//     case '0':
//       const field = wizard.querySelector('input[data-rule="notEmpty"]');
//       const select = wizard.querySelector('select[data-rule="notEmpty"]')
//       field.addEventListener('input', () => {

//         if (field.value && select.value) {
//           nextStepBtn[stepIndex].removeAttribute('disabled', '')
//           return true;
//         } else {
//           nextStepBtn[stepIndex].setAttribute('disabled', '');
//           return false;
//         }
//       })
//       break;
//     case '1':
//       const radioForm = wizard.querySelectorAll('input[data-rule="checkItem"]');

//       radioForm.forEach((el) => {
//         el.addEventListener('click', () => {
//           if (el.checked) {
//             nextStepBtn[stepIndex].removeAttribute('disabled', '')
//             return true;
//           } else {
//             nextStepBtn[stepIndex].setAttribute('disabled', '');
//             return false;
//           }
//         })
//       })
//       // if(radioBtn:checked)
//       break;
//     default:
//   };

// }


// steps[stepIndex].classList.add('show');
// nextStepBtn.setAttribute('disabled', '');
// nextStepBtn.disabled = true


//1111111111111111111111111111111111111

// const creationFormValidation = () => {

//   const field = wizard.querySelector('input[data-rule="notEmpty"]');
//   const select = wizard.querySelector('select[data-rule="notEmpty"]');

//   if (field.value && select.value) {
//     nextStepBtn.disabled = false;
//   }
//   field.addEventListener('input', () => {
//     if (field.value && select.value) {
//       nextStepBtn.disabled = false;
//     } else {
//       nextStepBtn.disabled = true;
//     }
//   })
// }

// const typeFormValidation = () => {

//   const radioForm = wizard.querySelectorAll('input[data-rule="checkItem"]');
//   if (stepIndex == 2) {
//     nextStepBtn.disabled = true;
//   }
//   radioForm.forEach((el) => {

//     if (el.checked && stepIndex == 2) {
//       nextStepBtn.disabled = false;
//     }
//     el.addEventListener('click', () => {

//       if (el.checked) {
//         nextStepBtn.disabled = false;

//       } else {
//         nextStepBtn.disabled = true;
//       }
//     })
//   })
// }

// const standardFormValidation = () => {
//   const radioForm = wizard.querySelectorAll('input[data-rule="checkItem"]');
//   if (stepIndex == 3) {
//     nextStepBtn.disabled = true;
//   }
//   radioForm.forEach(el => {

//     console.log('Elll', el);

//     if (el.checked && stepIndex == 3) {
//       console.log('3 step');

//       nextStepBtn.disabled = false;
//     }
//     el.addEventListener('click', () => {
//       if (el.checked) {
//         nextStepBtn.disabled = false;

//       } else {
//         nextStepBtn.disabled = true;
//       }
//       if (el.value == 'useTemplate') {
//         chooseTypeForm.classList.remove('active');
//         selectedTemplate.classList.add('active');
//       } else if (el.value == 'blackCanvas') {
//         selectedTemplate.classList.remove('active');
//         chooseTypeForm.classList.add('active');
//       }
//     })

//   })
// }


// const prevStepBtnText = () => {
//   if (stepIndex >= 2) {
//     prevStepBtn.innerHTML = 'Previous';
//   } else {
//     prevStepBtn.innerHTML = 'Cancel';
//   }
// }

// wizard.addEventListener("click", (e) => {

//   let activeIndex = Array.from(steps).findIndex(step => step.classList.contains("show"));

//   if (e.target.matches(".next-step")) {
//     if (activeIndex < steps.length - 1) {
//       steps[activeIndex].classList.remove("show");
//       steps[activeIndex + 1].classList.add("show");
//       stepIndex++;
//       stepProgress.innerHTML = stepIndex;
//       prevStepBtnText();
//       fillProgressBar();
//     }
//   } else if (e.target.matches(".prev-step")) {
//     if (activeIndex > 0) {
//       steps[activeIndex].classList.remove("show");
//       steps[activeIndex - 1].classList.add("show");
//       stepIndex--;
//       stepProgress.innerHTML = stepIndex;
//       prevStepBtnText();
//       fillProgressBar();
//     }
//   }

//   creationFormValidation();
//   typeFormValidation();
//   standardFormValidation();
//   console.log(stepIndex);
// });

//1111111111111111111111111111111111111111111111111

// if (activeIndex == 0) {
//   creationFormValidation()
// } else if (activeIndex == 1) {
//   typeFormValidation()
// }

// steps.forEach((el, index) => {
//   nextStepBtn[index].setAttribute('disabled', '');
//   validateForm(String(index))
//   el.querySelector('.next-step').addEventListener('click', () => {
//     if (stepIndex < steps.length - 1) {
//       stepIndex++;

//       steps.forEach(el => {
//         el.classList.remove('show')
//       })
//       steps[stepIndex].classList.add('show');
//     }


//   })
//   el.querySelector('.prev-step').addEventListener('click', () => {
//     if (stepIndex > 0) {
//       stepIndex--;

//       steps.forEach(el => {
//         el.classList.remove('show')
//       })
//       steps[stepIndex].classList.add('show');
//     }

//   })
// })

//------------------------------------------------

// const fields = wizard.querySelectorAll('[data-rule]');

// fields.forEach((el) => {
//   el.addEventListener('input', () => {
//     validateStep();
//   })
// })

// fields.forEach((el) => {
//   el.addEventListener('change', () => {
//     validateStep();
//   })
// })

// const notEmpty = (value) => {
//   return value != null && value != '';
// }

// const validateStep = () => {

//   steps[stepIndex].querySelectorAll('[data-rule]').forEach((el) => {
//     const atributeName = el.getAttribute('data-rule');
//     console.log(el.value);
//     console.log(atributeName(el.value));

//     console.log('Name', eval(atributeName + `(${el.value})`));
//     eval(atributeName + `(${el.value})`)
//   })

// }


//------------------------------------------------------


// const checkAnswer = () => {

//   console.log('Check answer');
// }

// let x = document.querySelector('.form-name');
// console.log('Value', x);
// const field = document.querySelector('input[data-rule]');
// console.log('Field', field.value);



// x.addEventListener('input', () => {
//   if (x.value) {
//     nextStepBtn[stepIndex].removeAttribute('disabled', '')
//   } else {
//     nextStepBtn[stepIndex].setAttribute('disabled', '')
//   }
// })

// const select = document.forms['myForm'].select.value;