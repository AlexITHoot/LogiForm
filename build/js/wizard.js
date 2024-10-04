'use strict';

// import $ from "jquery";

//Sortable
var _sortablejs = _interopRequireDefault(require("sortablejs"));
var _apexcharts = _interopRequireDefault(require("apexcharts"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var el = document.getElementById('items');
var sortable = _sortablejs["default"].create(el);

//Chart

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
    }
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%'
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          fontSize: '34px',
          fontWeight: '700'
        }
      }
    }
  },
  labels: ['qwe'],
  stroke: {
    lineCap: 'round'
  }
};
var chart = new _apexcharts["default"](document.querySelector("#chart"), options);

//Template list tabs

window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var tab = document.querySelectorAll('.nav-item'),
    header = document.querySelector('.template-nav-list ul'),
    tabContent = document.querySelectorAll('.templates-list');
  function hideTabContent(a) {
    for (var i = a; i < tabContent.length; i++) {
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
    tab.forEach(function (el) {
      el.classList.remove('active');
    });
    var target = event.target;
    if (target && target.classList.contains('nav-item')) {
      for (var i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          target.classList.add('active');
          break;
        }
      }
    }
  });
});

//Radio checking
var radioList = document.querySelectorAll('.form-radio-list');
radioList.forEach(function (listElement) {
  var radioBtn = listElement.querySelectorAll('.form-radio');
  radioBtn.forEach(function (radioElement) {
    radioElement.addEventListener('click', function () {
      radioBtn.forEach(function (element) {
        return element.parentElement.classList.remove('active');
      });
      radioElement.parentElement.classList.add('active');
    });
  });
});

//Upload file
var uploadBlock = document.querySelectorAll('.upload-block');
uploadBlock.forEach(function (el) {
  var actualBtn = el.querySelector('.actual-btn');
  var fileChosen = el.querySelector('.file-chosen');
  var fileChoosenText = el.querySelector('.file-chosen i');
  var fileChoosenImg = el.querySelector('.file-chosen img');
  var btn = el.querySelector('.btn-upload');
  actualBtn.addEventListener('change', function () {
    fileChoosenText.textContent = this.files[0].name;
    if (this.files.length > 0) {
      btn.textContent = 'Upload Another File';
      fileChoosenImg.style.display = 'block';
    }
  });
});

//Wizard
var stepIndex = 0;
var activeStepIndex;
activeStepIndex = 5;
var wizard = document.querySelector('.wizard-page');

//Common fields
var commonFields = wizard.querySelectorAll('.wizard-left-side .common-fields li button');
var commonFieldsDraggable = wizard.querySelector('#items');
var commonFieldsDv = wizard.querySelector('.wizard-left-side [name="common-fields"]');
var changeButtonText = function changeButtonText() {
  var b = commonFieldsDraggable.querySelectorAll('li button');
  b.forEach(function (el) {
    el.textContent = 'Remove';
  });
};
var commonFieldsPageCurrent = 1;
commonFields.forEach(function (el) {
  el.addEventListener('click', function () {
    changeButtonText();
    var tag = el.dataset.clone;
    var iconSrc = el.parentElement.querySelector('.field-title .icon img').src;
    var inpt = document.createElement("input");
    inpt.setAttribute('data-icon-src', iconSrc);
    inpt.setAttribute('name', "common-fields[".concat(commonFieldsPageCurrent, "][").concat(tag, "]"));
    inpt.setAttribute('type', 'hidden');
    inpt.setAttribute('data-rule', '');
    inpt.setAttribute('data-page', commonFieldsPageCurrent);
    inpt.setAttribute('data-page-item', tag);
    var elName = el.parentElement.querySelector('.field-title span').textContent;
    inpt.setAttribute('data-name', elName);
    inpt.value = tag;
    commonFieldsDv === null || commonFieldsDv === void 0 || commonFieldsDv.appendChild(inpt);
    renderCommonFieldsDraggable();
    updateCommonFieldsButtons();
  });
});
var updateCommonFieldsButtons = function updateCommonFieldsButtons() {
  commonFields.forEach(function (el) {
    var inpt = commonFieldsDv.querySelector("input[data-page-item=\"".concat(el.dataset.clone, "\"]"));
    if (inpt) {
      el.disabled = true;
      el.textContent = 'Added';
    } else {
      el.disabled = false;
      el.textContent = 'Add';
    }
    onChange();
  });
  displayedInformationBlock();
};
var renderCommonFieldsDraggable = function renderCommonFieldsDraggable() {
  commonFieldsDraggable.innerHTML = '';
  commonFieldsDv.querySelectorAll('input').forEach(function (el) {
    if (commonFieldsPageCurrent === Number(el.dataset.page)) {
      var iconSrc = el.dataset.iconSrc;
      var name = el.dataset.name;
      var page = el.dataset.page;
      var pageItem = el.dataset.pageItem;
      var template = commonFieldsItemTemplate(name, page, pageItem, iconSrc);
      commonFieldsDraggable === null || commonFieldsDraggable === void 0 || commonFieldsDraggable.appendChild(template.content.firstChild);
    }
  });
  displayedInformationBlock();
};
var commonFieldsItemTemplate = function commonFieldsItemTemplate(name, page, pageItem, iconSrc) {
  var template = document.createElement('template');
  template.innerHTML = "<li>\n      <div class=\"field-title\">\n        <div class=\"move\">\n          <img src=\"./img/menu.svg\" alt=\"\">\n        </div>\n        <div class=\"icon\">\n          <img src=\"".concat(iconSrc, "\" alt=\"\">\n        </div>\n        <span>").concat(name, "</span>\n      </div>\n      <button class=\"btn btn-secondary\" data-page=\"").concat(page, "\" data-page-item=\"").concat(pageItem, "\">Remove</button>\n    </li>");
  return template;
};
commonFieldsDraggable.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn')) {
    commonFields.forEach(function (el) {
      if (el.dataset.clone == e.target.dataset.clone) {
        el.textContent = 'Add';
        el.disabled = false;
      }
    });
    e.target.parentElement.remove();
    displayedInformationBlock();
    commonFieldsDv.querySelector("input[name=\"common-fields[".concat(e.target.dataset.page, "][").concat(e.target.dataset.pageItem, "]\"]")).remove();
    renderCommonFieldsDraggable();
    updateCommonFieldsButtons();
  }
});
var informationBlock = wizard.querySelectorAll('.information-block');
var displayedInformationBlock = function displayedInformationBlock() {
  if (commonFieldsDraggable.children.length <= 0) {
    informationBlock[0].style.display = 'block', commonFieldsDraggable.parentElement.style.display = 'none';
  } else {
    informationBlock[0].style.display = 'none', commonFieldsDraggable.parentElement.style.display = 'block';
  }
};
displayedInformationBlock();
var nextStepBtn = wizard.querySelector('.next-step');
var prevStepBtn = wizard.querySelector('.prev-step');
var steps = document.querySelectorAll(".wizard-left-side .wizard-content");
var activeSteps;
activeSteps = wizard.querySelectorAll('.active-step');
var chooseTypeForm = wizard.querySelector('.choose-type-form ');
var selectedTemplate = wizard.querySelector('.selected-template');
var importFromLocal = wizard.querySelector('.block-select-from-local-hd');
var importFromUrl = wizard.querySelector('.block-url-path-to-form');
var stepProgress = wizard.querySelector('.wizard-progress .step-progress');
var numberOfSteps = wizard.querySelector('.number_of_steps');
var progressBar = wizard.querySelector('.progress-bar');
numberOfSteps.innerHTML = activeStepIndex;
var fillProgressBar = function fillProgressBar() {
  progressBar.style.width = "".concat(100 / activeStepIndex * (stepIndex + 1), "%");
};
fillProgressBar();
var notEmpty = function notEmpty(el) {
  return el.value != null && el.value != "";
};
var multiSelectNotEmpty = function multiSelectNotEmpty(el) {
  for (var index = 0; index < el.options.length; index++) {
    if (el.options[index].hasAttribute('checked')) {
      return true;
    }
  }
};
var anyNotEmpty = function anyNotEmpty(el) {
  var items = el.querySelectorAll('[data-rule]');
  for (var index = 0; index < items.length; index++) {
    var r = notEmpty(items[index]);
    if (r) {
      return true;
    }
  }
};
var chooseItem = function chooseItem(el) {
  var items = el.querySelectorAll('[data-rule]');
  for (var index = 0; index < items.length; index++) {
    var r = items[index].checked;
    if (r) {
      return true;
    }
  }
  return false;
};
var selectTree = function selectTree(el) {
  var selectedItems = $(el).jstree('get_selected');
  return selectedItems.length > 0;
};
var selectTemplate = function selectTemplate(el) {
  var item = el.querySelector('[data-rule]');
  if (item.hasChildNodes()) {
    return true;
  }
  return false;
};
var uploadItem = function uploadItem(el) {
  return el.files.length > 0;
};
var validate = function validate(el) {
  var rule = el.getAttribute('data-rule');
  return eval("".concat(rule, "(el)"));
};
var onChange = function onChange(e) {
  var stepValid = true;
  var itemsToValidate = activeSteps[stepIndex].querySelectorAll('[data-rule]');
  itemsToValidate.forEach(function (el) {
    var attributeVale = el.getAttribute('data-rule');
    if (attributeVale == null || attributeVale == '' || el.disabled) {
      return;
    }
    var r = validate(el);
    if (!r) {
      stepValid = false;
    }
  });
  nextStepBtn.disabled = !stepValid;
};
var uploadInputs = wizard.querySelectorAll('input[data-rule][type="file"]');
uploadInputs.forEach(function (el) {
  el.addEventListener('change', onChange);
});
var inputs = wizard.querySelectorAll('input[data-rule][type="text"]');
inputs.forEach(function (el) {
  el.addEventListener('input', onChange);
});
var selects = wizard.querySelectorAll('select[data-rule]');
selects.forEach(function (el) {
  el.addEventListener('change', onChange);
});
$('#kt_tree_2').on('select_node.jstree', onChange);
var radioBtns = wizard.querySelectorAll('input[data-rule][type="radio"]');
var deletePageBtn = document.querySelector('#deletePage');
var addPageBtn = document.querySelector('#addPage');
var wizzardFooter = document.querySelector('.wizard .wizard-right-side .wizard-footer');
var pageGroup = document.querySelector('.wizard .wizard-right-side .wizard-footer .page-group');
var singlePage = false;
radioBtns.forEach(function (el) {
  el.addEventListener('change', onChange);
  el.addEventListener('click', function () {
    if (el.value === 'standartForm') {
      steps.forEach(function (element) {
        element.classList.remove('active-step');
      });
      steps.forEach(function (element) {
        if (element.classList.contains('step-1') || element.classList.contains('step-2') || element.classList.contains('step-3')) {
          element.classList.add('active-step');
          activeSteps = wizard.querySelectorAll('.active-step');
          activeStepIndex = 5;
          nextStepBtn.innerHTML = 'Next';
          numberOfSteps.innerHTML = activeStepIndex;
          fillProgressBar();
        }
      });
    } else if (el.value === 'useTemplate') {
      steps.forEach(function (element) {
        element.classList.remove('active-step');
      });
      steps.forEach(function (element) {
        if (element.classList.contains('step-1') || element.classList.contains('step-2') || element.classList.contains('step-3') || element.classList.contains('step-4')) {
          element.classList.add('active-step');
          activeSteps = wizard.querySelectorAll('.active-step');
          activeStepIndex = activeSteps.length;
          nextStepBtn.innerHTML = 'Next';
          numberOfSteps.innerHTML = activeStepIndex;
          fillProgressBar();
        }
      });
    } else if (el.value === 'blackCanvas') {
      steps.forEach(function (element) {
        element.classList.remove('active-step');
      });
      steps.forEach(function (element) {
        if (element.classList.contains('step-1') || element.classList.contains('step-2') || element.classList.contains('step-3') || element.classList.contains('step-4') || element.classList.contains('step-5')) {
          element.classList.add('active-step');
          activeSteps = wizard.querySelectorAll('.active-step');
          activeStepIndex = activeSteps.length;
          nextStepBtn.innerHTML = 'Next';
          numberOfSteps.innerHTML = activeStepIndex;
          fillProgressBar();
        }
      });
    } else if (el.value === 'aiForm') {
      steps.forEach(function (element) {
        element.classList.remove('active-step');
      });
      steps.forEach(function (element) {
        if (element.classList.contains('step-1') || element.classList.contains('step-2') || element.classList.contains('step-6')) {
          element.classList.add('active-step');
          activeSteps = wizard.querySelectorAll('.active-step');
          activeStepIndex = activeSteps.length;
          nextStepBtn.innerHTML = 'Generate';
          numberOfSteps.innerHTML = activeStepIndex;
          fillProgressBar();
        }
      });
    } else if (el.value === 'htmlForm') {
      steps.forEach(function (element) {
        element.classList.remove('active-step');
      });
      steps.forEach(function (element) {
        if (element.classList.contains('step-1') || element.classList.contains('step-2') || element.classList.contains('step-4') || element.classList.contains('step-7')) {
          element.classList.add('active-step');
          activeSteps = wizard.querySelectorAll('.active-step');
          activeStepIndex = activeSteps.length;
          nextStepBtn.innerHTML = 'Next';
          numberOfSteps.innerHTML = activeStepIndex;
          fillProgressBar();
        }
      });
    } else if (el.value === 'pdfForm') {
      steps.forEach(function (element) {
        element.classList.remove('active-step');
      });
      steps.forEach(function (element) {
        if (element.classList.contains('step-1') || element.classList.contains('step-2') || element.classList.contains('step-4') || element.classList.contains('step-8') || element.classList.contains('step-9') || element.classList.contains('step-10') || element.classList.contains('step-11')) {
          element.classList.add('active-step');
          activeSteps = wizard.querySelectorAll('.active-step');
          activeStepIndex = activeSteps.length;
          nextStepBtn.innerHTML = 'Next';
          numberOfSteps.innerHTML = activeStepIndex;
          fillProgressBar();
        }
      });
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
    if (el.value == 'singlePage') {
      singlePage = true;
      if (singlePage) {
        deletePageBtn.style.display = 'none';
        addPageBtn.style.display = 'none';
        wizzardFooter.style.display = 'none';
      }
    } else if (el.value == 'multiPage') {
      singlePage = false;
      deletePageBtn.style.display = 'flex';
      addPageBtn.style.display = 'flex';
      wizzardFooter.style.display = 'flex';
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
  });
  onChange();
});
addPageBtn.addEventListener('click', function () {
  commonFieldsPageCurrent = pages.length + 1;
  pages.push(commonFieldsPageCurrent);
  renderPages();
});
deletePageBtn.addEventListener('click', function () {
  if (pages.length < 2) {
    return;
  }
  var inputsToRemove = commonFieldsDv.querySelectorAll("input[name^=\"common-fields[".concat(pages.length, "][\"]"));
  if (pages.length === commonFieldsPageCurrent) {
    commonFieldsPageCurrent = commonFieldsPageCurrent - 1;
  }
  pages.pop();
  renderPages();
  inputsToRemove.forEach(function (el) {
    el.remove();
  });
  updateCommonFieldsButtons();
});
var pages = [1];
var renderPages = function renderPages() {
  pageGroup.innerHTML = '';
  console.log('pages', pages);
  pages.forEach(function (pageNumber) {
    var _pageBtn$classList;
    var pageBtn = document.createElement("button");
    var classList = ['btn', 'btn-secondary', 'autowidth'];
    if (commonFieldsPageCurrent === pageNumber) {
      classList.push('active');
    }
    var prefix = '';
    if (pageNumber === 1) {
      prefix = 'Page ';
    }
    pageBtn.setAttribute('data-number', pageNumber);
    (_pageBtn$classList = pageBtn.classList).add.apply(_pageBtn$classList, classList);
    pageBtn.innerHTML = "".concat(prefix).concat(pageNumber);
    pageGroup.appendChild(pageBtn);
  });
  renderCommonFieldsDraggable();
};
pageGroup.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    commonFieldsPageCurrent = Number(e.target.dataset.number);
    renderPages();
  }
  ;
});
selectedTemplate.querySelector('[data-rule]').disabled = true;
chooseTypeForm.querySelector('[data-rule]').disabled = true;
importFromLocal.querySelector('[data-rule]').disabled = true;
importFromUrl.querySelector('[data-rule]').disabled = true;
var prevStepBtnText = function prevStepBtnText() {
  if (stepIndex >= 1) {
    prevStepBtn.innerHTML = 'Previous';
  } else {
    prevStepBtn.innerHTML = 'Cancel';
  }
};
var nextStepBtnText = function nextStepBtnText() {
  if (stepIndex == activeSteps.length - 1 && activeSteps.length > 3) {
    nextStepBtn.innerHTML = 'Finish';
  } else if (stepIndex == activeSteps.length - 1 && activeSteps.length > 2 && radioBtns[1].checked) {
    nextStepBtn.innerHTML = 'Generate form';
  } else if (stepIndex == 1 && radioBtns[1].checked) {
    nextStepBtn.innerHTML = 'Generate';
  } else {
    nextStepBtn.innerHTML = 'Next';
  }
};
nextStepBtn.addEventListener('click', function () {
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
});
prevStepBtn.addEventListener('click', function () {
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
});
var selecteTemplateBtn = wizard.querySelector('.block-selecte-template button');
var templatePage = wizard.querySelector('.template-page');
var closeTemplate = wizard.querySelector('.template-page .cancel');
var useTemplate = templatePage.querySelectorAll('.use-template');
var wizardRightSide = wizard.querySelector('.wizard-right-side');
var wizardRightSideStepContent = wizard.querySelectorAll('.wizard-right-side .wizard-step-content');
var colRight = wizard.querySelector('.col-right');
var displayWizardRightSide = function displayWizardRightSide() {
  colRight.style.display = 'none';
  wizardRightSideStepContent.forEach(function (el) {
    el.style.display = 'none';
    if (activeSteps[stepIndex].dataset.step == 1) {
      wizardRightSide.classList.remove('hide');
      if (el.dataset.stepPage == 1) {
        el.style.display = 'flex';
        colRight.style.display = 'block';
      }
    } else if (activeSteps[stepIndex].dataset.step == 2) {
      wizardRightSide.classList.remove('hide');
      if (el.dataset.stepPage == 2) {
        el.style.display = 'flex';
        colRight.style.display = 'block';
      }
    } else if (activeSteps[stepIndex].dataset.step == 5) {
      wizardRightSide.classList.remove('hide');
      if (el.dataset.stepPage == 5) {
        el.style.display = 'flex';
        colRight.style.display = 'block';
      }
    } else if (activeSteps[stepIndex].dataset.step == 6) {
      wizardRightSide.classList.remove('hide');
      if (el.dataset.stepPage == 6) {
        el.style.display = 'flex';
        colRight.style.display = 'block';
      }
    } else if (activeSteps[stepIndex].dataset.step == 7) {} else {
      wizardRightSide.classList.add('hide');
      el.style.display = 'none';
    }
  });
};
displayWizardRightSide();
var handleTemplatePage = function handleTemplatePage() {
  if (templatePage.classList.contains('hide')) {
    templatePage.classList.remove('hide');
    templatePage.classList.add('show');
  } else {
    templatePage.classList.remove('show');
    templatePage.classList.add('hide');
  }
};
selecteTemplateBtn.addEventListener('click', function () {
  handleTemplatePage();
});
closeTemplate.addEventListener('click', function () {
  handleTemplatePage();
});
var selectTemplateIcon = wizard.querySelector('.select-template-icon');
var selectTemplateTitle = wizard.querySelector('.select-template-title');
useTemplate.forEach(function (el) {
  el.addEventListener('click', function () {
    var text = el.parentElement.querySelector('.description h4').textContent;
    var img = el.parentElement.querySelector('.img-container').innerHTML;
    selectTemplateTitle.innerText = text;
    selectTemplateIcon.innerHTML = img;
    handleTemplatePage();
    onChange();
  });
});
var textareaField = document.querySelectorAll('.chat-input-field textarea');
var sentButton = document.querySelector('.chat-input-field button');
var responseProgress = document.querySelector('.response-progress');
textareaField.forEach(function (el) {
  el.parentElement.querySelector('button').disabled = true;
  el.addEventListener('input', function () {
    if (el.value) {
      el.parentElement.querySelector('button').disabled = false;
    } else {
      el.parentElement.querySelector('button').disabled = true;
    }
  });
});
sentButton.addEventListener('click', function () {
  displayLoading();
});

// showing loading
function displayLoading() {
  chatContent[0].classList.add('hide');
  chatContent[1].classList.remove('hide');
  responseProgress.classList.remove("hide");
  informationBlock[1].style.display = "none";
  chart.render();
  // to stop loading after some time
  setTimeout(function () {
    responseProgress.classList.add("hide");
    showContentAfterGetResponse();
  }, 2000);
}
var chatContent = document.querySelectorAll('.wizard-inner-content');
var showContentAfterGetResponse = function showContentAfterGetResponse() {
  wizardRightSideStepContent.forEach(function (el) {
    if (el.dataset.stepPage == 6) {
      chatContent[0].classList.remove('hide');
      chatContent[1].classList.add('hide');
    }
  });
};

//------------------------------------------------------

//Modal
var createNewFolder = document.querySelector('#createNewFolder');
var modal = document.querySelector('.modal-wrapper');
var closeBtn = document.querySelector('.modal-wrapper .modal-header .close');
var cancelBtn = document.querySelector('.modal-wrapper .modal-footer .cancel');
var createBtn = document.querySelector('.modal-wrapper .modal-footer .create');
createNewFolder.addEventListener('click', function () {
  modal.style.display = 'flex';
});
createBtn.addEventListener('click', function () {
  demo_create();
  modal.style.display = "none";
});
window.onclick = function (event) {
  if (event.target == modal || event.target == closeBtn || event.target == closeBtn.querySelector('img') || event.target == cancelBtn) {
    modal.style.display = "none";
  }
};
function demo_create() {
  $('#kt_tree_2').jstree("create_node", null, null, "last", function (node) {
    this.edit(node);
  });
  return;
  var ref = $('#kt_tree_2').jstree(true),
    sel = ref.get_selected();
  if (!sel.length) {
    alert('select folder to add after');
  }
  sel = sel[0];
  sel = ref.create_node(sel, {
    id: 123,
    text: "Hello world",
    "name": "3434",
    "type": "file"
  });
  if (sel) {
    ref.edit(sel);
  }
}
;