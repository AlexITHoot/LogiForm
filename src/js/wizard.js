//Sortable

import Sortable from 'sortablejs';
var el = document.getElementById('items');
var sortable = Sortable.create(el);


//Chart

import ApexCharts from 'apexcharts'
var options = {
  series: [100],
  chart: {
    height: 350,
    type: 'radialBar',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 1500,
      animateGradually: {
        enabled: true,
        delay: 500
      },
      dynamicAnimation: {
        enabled: true,
        speed: 1500
      }
    },
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


//Template list tabs

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
  const fileChoosenText = el.querySelector('.file-chosen i');
  const fileChoosenImg = el.querySelector('.file-chosen img');
  const btn = el.querySelector('.btn-upload');
  actualBtn.addEventListener('change', function () {
    fileChoosenText.textContent = this.files[0].name;
    if (this.files.length > 0) {
      btn.textContent = 'Upload Another File';
      fileChoosenImg.style.display = 'block'
    }
  })
})



//Wizard
let stepIndex = 0;
let activeStepIndex;
activeStepIndex = 5;
const wizard = document.querySelector('.wizard-page');

//Common fields
const commonFields = wizard.querySelectorAll('.wizard-left-side .common-fields li button');
const commonFieldsDraggable = wizard.querySelector('#items');

const commonFieldsDv = wizard.querySelector('.wizard-left-side [name="common-fields"]');

const changeButtonText = () => {
  const b = commonFieldsDraggable.querySelectorAll('li button');
  b.forEach(el => {
    el.textContent = 'Remove';
  })
}

commonFields.forEach(el => {
  el.addEventListener('click', () => {

    changeButtonText();

    var inpt = document.createElement(`input`);
    inpt.setAttribute('name', `common-fields[${commonFieldsPage}][${commonFieldsPageItemValue}]`);
    inpt.setAttribute('type', 'hidden');
    inpt.setAttribute('data-rule', '');
    inpt.setAttribute('data-page', commonFieldsPage);
    inpt.setAttribute('data-page-item', commonFieldsPageItemValue);
    const elName = el.parentElement.querySelector('.field-title span').textContent;
    inpt.setAttribute('data-name', elName);
    inpt.value = el.dataset.clone;
    commonFieldsDv?.appendChild(inpt);

    renderCommonFieldsDraggable();
    updateCommonFieldsButtons();
  })
})

const updateCommonFieldsButtons = () => {
  commonFields.forEach((el) => {

    const inpt = commonFieldsDv.querySelector(`input[name^="common-fields[${commonFieldsPage}]["][value="${el.dataset.clone}"]`);

    if (inpt) {
      el.disabled = true;
      el.textContent = 'Added'
    } else {
      el.disabled = false;
      el.textContent = 'Add'
    }

    onChange();
  })

  displayedInformationBlock();
}

const renderCommonFieldsDraggable = () => {
  commonFieldsDraggable.innerHTML = ''
  commonFieldsDv.querySelectorAll('input').forEach((el) => {
    const name = el.dataset.name;
    const page = el.dataset.page;
    const pageItem = el.dataset.pageItem;
    const template = commonFieldsItemTemplate(name, page, pageItem)
    commonFieldsDraggable?.appendChild(template.content.firstChild);
  });

  displayedInformationBlock();
}

const commonFieldsItemTemplate = (name, page, pageItem) => {
  const template = document.createElement('template');
  template.innerHTML =
    `<li>
      <div class="field-title">
        <div class="move">
          <img src="./img/menu.svg" alt="">
        </div>
        <div class="icon">
          <img src="./img/common-fields-icon-1.svg" alt="">
        </div>
        <span>${name}</span>
      </div>
      <button class="btn btn-secondary" data-page="${page}" data-page-item="${pageItem}">Remove</button>
    </li>`

  return template;
};

let commonFieldsPage = 0;
let commonFieldsPageItemValue = '';

commonFieldsDraggable.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {

    commonFields.forEach(el => {
      if (el.dataset.clone == e.target.dataset.clone) {
        el.textContent = 'Add';
        el.disabled = false;
      }
    })
    e.target.parentElement.remove();
    displayedInformationBlock();
    commonFieldsDv.querySelector(`input[name="common-fields[${e.target.dataset.page}][${e.target.dataset.pageItem}]"]`).remove();
    renderCommonFieldsDraggable();
    updateCommonFieldsButtons();
  }
})

const informationBlock = wizard.querySelectorAll('.information-block')




const displayedInformationBlock = () => {
  if (commonFieldsDraggable.children.length <= 0) {
    informationBlock[0].style.display = 'block',
      commonFieldsDraggable.parentElement.style.display = 'none'
  } else {
    informationBlock[0].style.display = 'none',
      commonFieldsDraggable.parentElement.style.display = 'block'
  }
}

displayedInformationBlock()

const nextStepBtn = wizard.querySelector('.next-step');
const prevStepBtn = wizard.querySelector('.prev-step');

const steps = document.querySelectorAll(".wizard-left-side .wizard-content");

let activeSteps;
activeSteps = wizard.querySelectorAll('.active-step');

const chooseTypeForm = wizard.querySelector('.choose-type-form ');
const selectedTemplate = wizard.querySelector('.selected-template');

const importFromLocal = wizard.querySelector('.block-select-from-local-hd');
const importFromUrl = wizard.querySelector('.block-url-path-to-form');

const stepProgress = wizard.querySelector('.wizard-progress .step-progress');
const numberOfSteps = wizard.querySelector('.number_of_steps');
const progressBar = wizard.querySelector('.progress-bar');

numberOfSteps.innerHTML = activeStepIndex;

const fillProgressBar = () => {
  progressBar.style.width = `${(100 / activeStepIndex) * (stepIndex + 1)}%`
}
fillProgressBar();

const notEmpty = (el) => {
  return el.value != null && el.value != "";
};

const multiSelectNotEmpty = (el) => {
  for (let index = 0; index < el.options.length; index++) {
    if (el.options[index].hasAttribute('checked')) {
      return true;
    }
  }
};

const anyNotEmpty = (el) => {
  const items = el.querySelectorAll('[data-rule]');

  for (let index = 0; index < items.length; index++) {
    const r = notEmpty(items[index]);
    if (r) {
      return true;
    }
  }
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

const selectTree = (el) => {
  const selectedItems = $(el).jstree('get_selected');

  return selectedItems.length > 0;
}

const selectTemplate = (el) => {
  const item = el.querySelector('[data-rule]');
  if (item.hasChildNodes()) {
    return true;
  }
  return false;
}

const uploadItem = (el) => {
  return el.files.length > 0
}

const validate = (el) => {
  const rule = el.getAttribute('data-rule');
  return eval(`${rule}(el)`);
}

const onChange = (e) => {
  let stepValid = true;
  var itemsToValidate = activeSteps[stepIndex].querySelectorAll('[data-rule]');

  itemsToValidate.forEach(el => {
    const attributeVale = el.getAttribute('data-rule');
    if (attributeVale == null || attributeVale == '' || el.disabled) {
      return;
    }

    const r = validate(el);
    if (!r) {
      stepValid = false;
    }
  });

  nextStepBtn.disabled = !stepValid;
}

const uploadInputs = wizard.querySelectorAll('input[data-rule][type="file"]');

uploadInputs.forEach(el => {
  el.addEventListener('change', onChange);
});

const inputs = wizard.querySelectorAll('input[data-rule][type="text"]')

inputs.forEach(el => {
  el.addEventListener('input', onChange);
});

const selects = wizard.querySelectorAll('select[data-rule]')

selects.forEach(el => {
  el.addEventListener('change', onChange);
});

$('#kt_tree_2').on('select_node.jstree', onChange);

const radioBtns = wizard.querySelectorAll('input[data-rule][type="radio"]');

radioBtns.forEach(el => {
  el.addEventListener('change', onChange);
  el.addEventListener('click', () => {
    if (el.value === 'standartForm') {
      steps.forEach(element => {
        element.classList.remove('active-step');
      })
      steps.forEach(element => {
        if (
          element.classList.contains('step-1') ||
          element.classList.contains('step-2') ||
          element.classList.contains('step-3')) {
          element.classList.add('active-step');
          activeSteps = wizard.querySelectorAll('.active-step');
          activeStepIndex = 5;
          nextStepBtn.innerHTML = 'Next';
          numberOfSteps.innerHTML = activeStepIndex;
          fillProgressBar();
        }
      })

    } else if (el.value === 'useTemplate') {
      steps.forEach(element => {
        element.classList.remove('active-step');
      })
      steps.forEach(element => {
        if (
          element.classList.contains('step-1') ||
          element.classList.contains('step-2') ||
          element.classList.contains('step-3') ||
          element.classList.contains('step-4')) {
          element.classList.add('active-step');
          activeSteps = wizard.querySelectorAll('.active-step');
          activeStepIndex = activeSteps.length;
          nextStepBtn.innerHTML = 'Next';
          numberOfSteps.innerHTML = activeStepIndex;
          fillProgressBar();
        }
      })
    } else if (el.value === 'blackCanvas') {
      steps.forEach(element => {
        element.classList.remove('active-step');
      })
      steps.forEach(element => {
        if (
          element.classList.contains('step-1') ||
          element.classList.contains('step-2') ||
          element.classList.contains('step-3') ||
          element.classList.contains('step-4') ||
          element.classList.contains('step-5')) {
          element.classList.add('active-step');
          activeSteps = wizard.querySelectorAll('.active-step');
          activeStepIndex = activeSteps.length;
          nextStepBtn.innerHTML = 'Next';
          numberOfSteps.innerHTML = activeStepIndex;
          fillProgressBar();
        }
      })
    } else if (el.value === 'aiForm') {
      steps.forEach(element => {
        element.classList.remove('active-step');
      })
      steps.forEach(element => {
        if (
          element.classList.contains('step-1') ||
          element.classList.contains('step-2') ||
          element.classList.contains('step-6')) {
          element.classList.add('active-step');
          activeSteps = wizard.querySelectorAll('.active-step');
          activeStepIndex = activeSteps.length;
          nextStepBtn.innerHTML = 'Generate';
          numberOfSteps.innerHTML = activeStepIndex;
          fillProgressBar();
        }
      })
    } else if (el.value === 'htmlForm') {
      steps.forEach(element => {
        element.classList.remove('active-step');
      })
      steps.forEach(element => {
        if (
          element.classList.contains('step-1') ||
          element.classList.contains('step-2') ||
          element.classList.contains('step-4') ||
          element.classList.contains('step-7')) {
          element.classList.add('active-step');
          activeSteps = wizard.querySelectorAll('.active-step');
          activeStepIndex = activeSteps.length;
          nextStepBtn.innerHTML = 'Next';
          numberOfSteps.innerHTML = activeStepIndex;
          fillProgressBar();
        }
      })
    } else if (el.value === 'pdfForm') {
      steps.forEach(element => {
        element.classList.remove('active-step');
      })
      steps.forEach(element => {
        if (
          element.classList.contains('step-1') ||
          element.classList.contains('step-2') ||
          element.classList.contains('step-4') ||
          element.classList.contains('step-8') ||
          element.classList.contains('step-9') ||
          element.classList.contains('step-10') ||
          element.classList.contains('step-11')) {
          element.classList.add('active-step');
          activeSteps = wizard.querySelectorAll('.active-step');
          activeStepIndex = activeSteps.length;
          nextStepBtn.innerHTML = 'Next';
          numberOfSteps.innerHTML = activeStepIndex;
          fillProgressBar();
        }
      })
    }

    if (el.value == 'useTemplate') {
      chooseTypeForm.classList.remove('active');
      chooseTypeForm.querySelector('[data-rule]').disabled = true;
      selectedTemplate.classList.add('active');
      selectedTemplate.querySelector('[data-rule]').disabled = false;
    } else if (el.value == 'blackCanvas') {
      selectedTemplate.classList.remove('active');
      selectedTemplate.querySelector('[data-rule]').disabled = true;
      chooseTypeForm.classList.add('active');
      chooseTypeForm.querySelector('[data-rule]').disabled = false;
    }

    if (el.value == 'hdLocal') {
      importFromUrl.classList.remove('active');
      importFromUrl.querySelector('[data-rule]').disabled = true;
      importFromLocal.classList.add('active');
      importFromLocal.querySelector('[data-rule]').disabled = false;
    } else if (el.value == 'urlPath') {
      importFromLocal.classList.remove('active');
      importFromLocal.querySelector('[data-rule]').disabled = true;
      importFromUrl.classList.add('active');
      importFromUrl.querySelector('[data-rule]').disabled = false;
    }
  })

  onChange();
});

selectedTemplate.querySelector('[data-rule]').disabled = true;
chooseTypeForm.querySelector('[data-rule]').disabled = true;
importFromLocal.querySelector('[data-rule]').disabled = true;
importFromUrl.querySelector('[data-rule]').disabled = true;


const prevStepBtnText = () => {
  if (stepIndex >= 1) {
    prevStepBtn.innerHTML = 'Previous';
  } else {
    prevStepBtn.innerHTML = 'Cancel';
  }
}

const nextStepBtnText = () => {
  if (stepIndex == activeSteps.length - 1 && activeSteps.length > 3) {
    nextStepBtn.innerHTML = 'Finish';
  } else if (stepIndex == activeSteps.length - 1 && activeSteps.length > 2 && radioBtns[1].checked) {
    nextStepBtn.innerHTML = 'Generate form';

  } else if (stepIndex == 1 && radioBtns[1].checked) {
    nextStepBtn.innerHTML = 'Generate';
  } else {
    nextStepBtn.innerHTML = 'Next';
  }
}




nextStepBtn.addEventListener('click', () => {
  if (stepIndex < activeSteps.length - 1) {
    activeSteps[stepIndex].classList.remove("show");
    activeSteps[stepIndex + 1].classList.add("show");
    stepIndex++;
    stepProgress.innerHTML = stepIndex + 1;
    prevStepBtnText();
    nextStepBtnText();
    fillProgressBar();
    displayWizardRightSide();
    onChange();
    numberOfSteps.innerHTML = activeStepIndex;
  }

})

prevStepBtn.addEventListener('click', () => {
  if (stepIndex > 0) {
    activeSteps[stepIndex].classList.remove("show");
    activeSteps[stepIndex - 1].classList.add("show");
    stepIndex--;
    stepProgress.innerHTML = stepIndex + 1;
    prevStepBtnText();
    nextStepBtnText();
    fillProgressBar();
    displayWizardRightSide();
    onChange();
    numberOfSteps.innerHTML = activeStepIndex;
  }
})

const selecteTemplateBtn = wizard.querySelector('.block-selecte-template button');
const templatePage = wizard.querySelector('.template-page');
const closeTemplate = wizard.querySelector('.template-page .cancel');
const useTemplate = templatePage.querySelectorAll('.use-template');
const wizardRightSide = wizard.querySelector('.wizard-right-side');
const wizardRightSideStepContent = wizard.querySelectorAll('.wizard-right-side .wizard-step-content');
const colRight = wizard.querySelector('.col-right');


const displayWizardRightSide = () => {
  colRight.style.display = 'none';
  wizardRightSideStepContent.forEach(el => {
    el.style.display = 'none';
    if (activeSteps[stepIndex].dataset.step == 1) {
      wizardRightSide.classList.remove('hide')
      if (el.dataset.stepPage == 1) {
        el.style.display = 'flex';
        colRight.style.display = 'block';
      }
    } else if (activeSteps[stepIndex].dataset.step == 2) {
      wizardRightSide.classList.remove('hide')
      if (el.dataset.stepPage == 2) {

        el.style.display = 'flex';
        colRight.style.display = 'block';
      }
    } else if (activeSteps[stepIndex].dataset.step == 5) {
      wizardRightSide.classList.remove('hide')
      if (el.dataset.stepPage == 5) {

        el.style.display = 'flex';
        colRight.style.display = 'block';
      }
    } else if (activeSteps[stepIndex].dataset.step == 6) {
      wizardRightSide.classList.remove('hide')
      if (el.dataset.stepPage == 6) {
        el.style.display = 'flex';
        colRight.style.display = 'block';
      }
    } else if (activeSteps[stepIndex].dataset.step == 7) {

    } else {
      wizardRightSide.classList.add('hide')
      el.style.display = 'none';
    }
  })
}

displayWizardRightSide();

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
    onChange();
  })
})

const textareaField = document.querySelectorAll('.chat-input-field textarea');
const sentButton = document.querySelector('.chat-input-field button')
const responseProgress = document.querySelector('.response-progress');

textareaField.forEach(el => {
  el.parentElement.querySelector('button').disabled = true;
  el.addEventListener('input', () => {
    if (el.value) {
      el.parentElement.querySelector('button').disabled = false;
    } else {
      el.parentElement.querySelector('button').disabled = true;
    }
  })
})

sentButton.addEventListener('click', () => {
  displayLoading();
})

// showing loading
function displayLoading() {
  chatContent[0].classList.add('hide');
  chatContent[1].classList.remove('hide');
  responseProgress.classList.remove("hide");
  informationBlock[1].style.display = "none";
  chart.render();
  // to stop loading after some time
  setTimeout(() => {
    responseProgress.classList.add("hide");
    showContentAfterGetResponse()
  }, 2000);
}

const chatContent = document.querySelectorAll('.wizard-inner-content');

const showContentAfterGetResponse = () => {
  wizardRightSideStepContent.forEach(el => {
    if (el.dataset.stepPage == 6) {
      chatContent[0].classList.remove('hide');
      chatContent[1].classList.add('hide');
    }
  })
}

//------------------------------------------------------


//Modal
const createNewFolder = document.querySelector('#createNewFolder');
const modal = document.querySelector('.modal-wrapper');
const closeBtn = document.querySelector('.modal-wrapper .modal-header .close');
const cancelBtn = document.querySelector('.modal-wrapper .modal-footer .cancel');
const createBtn = document.querySelector('.modal-wrapper .modal-footer .create');

createNewFolder.addEventListener('click', () => {
  modal.style.display = 'flex';
})

createBtn.addEventListener('click', () => {
  demo_create();
  modal.style.display = "none";
})

window.onclick = function (event) {
  if (event.target == modal || event.target == closeBtn || event.target == closeBtn.querySelector('img') || event.target == cancelBtn) {
    modal.style.display = "none";
  }
}
function demo_create() {
  $('#kt_tree_2').jstree("create_node", null, null, "last", function (node) {
    this.edit(node);
  });
  return;
  var ref = $('#kt_tree_2').jstree(true),
    sel = ref.get_selected();
  if (!sel.length) { alert('select folder to add after'); }
  sel = sel[0];
  sel = ref.create_node(sel, { id: 123, text: "Hello world", "name": "3434", "type": "file" });
  if (sel) {
    ref.edit(sel);
  }
};