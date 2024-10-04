//Dropdown

function DropdownBtnHandler() {
  const uiElements = {
    buttons: null,
    content: null,
    dropdownContent: null,
    window: null
  }

  function initUiElements() {
    uiElements.buttons = $('.dropdown-btn');
    uiElements.content = $('.content');
    uiElements.dropdownContent = $('.dropdown-content');
    uiElements.window = $(window);
  }

  function subscribeToEvents() {
    uiElements.buttons.on('click', onClickDropdownBtn);
    uiElements.content.on('scroll', hideDropdownContent);
    uiElements.window.on('click', hideDropdownBtn);
  }

  function onClickDropdownBtn() {

    let elementPosition = $(this).offset();
    console.log(elementPosition);

    if ($(this).next().hasClass('show')) {
      $(this).next().removeClass('show');
    } else {
      uiElements.dropdownContent.removeClass('show');
      $(this).next().addClass('show');
    }
    $(this).next().css('transform', `translate(${elementPosition.left - ($(this).next().width() - $(this).width())}px, ${elementPosition.top + $(this).height() + 4}px)`);
  }

  function hideDropdownContent() {
    if (uiElements.content.scrollTop() > 0) {
      uiElements.dropdownContent.removeClass('show');
      uiElements.buttons.blur();
    }
  }

  //Close the dropdown if the user clicks outside of it
  function hideDropdownBtn(e) {
    if (!e.target.matches('.dropdown-btn')) {
      if (uiElements.dropdownContent.hasClass('show')) {
        uiElements.dropdownContent.removeClass('show');
      }
    }
  }

  const init = () => {
    initUiElements();
    subscribeToEvents();
  }

  init();
}

//Highlight active menu link

function HighlightMenu() {
  const uiElements = {
    menuLinks: null,
    path: null,
  }

  function initUiElements() {
    uiElements.menuLinks = $('.menu-nav li');
    uiElements.path = location.pathname.split("/");
  }

  function highlightActiveMenuLink() {
    const currentPath = uiElements.path[uiElements.path.length - 1];
    uiElements.menuLinks.each(function () {
      const link = $(this).children().attr('href').split("/").pop();
      if (currentPath === link && link !== '') {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

  const init = () => {
    initUiElements();
    highlightActiveMenuLink();
  }

  init();
}

//Mobile sidebar menu

function MobileMenu() {
  const uiElements = {
    body: null,
    menuBtn: null,
    sidebar: null,
    closeBtn: null,
    overlay: null,
    window: null,
  }

  function initUiElements() {
    uiElements.body = $('body');
    uiElements.menuBtn = $('.menu-btn');
    uiElements.sidebar = $('.sidebar');
    uiElements.closeBtn = $('.sidebar-header .close');
    uiElements.overlay = $('.overlay');
    uiElements.window = $(window);
  }

  function subscribeToEvents() {
    uiElements.menuBtn.on('click', onClickMenuBtn);
    uiElements.closeBtn.on('click', onClickClocseBtn);
    uiElements.overlay.on('click', onClickOverlay);
    uiElements.window.on('resize', checkWidth)
  }

  function onClickMenuBtn() {
    handleToggleMenu(true);
  }

  function onClickClocseBtn() {
    handleToggleMenu(false);
  }

  function onClickOverlay() {
    handleToggleMenu(false);
  }

  function handleToggleMenu(state) {
    if (state) {
      uiElements.sidebar.addClass('active');
      uiElements.overlay.addClass('active');
      uiElements.body.addClass('active');
    } else {
      uiElements.sidebar.removeClass('active');
      uiElements.overlay.removeClass('active');
      uiElements.body.removeClass('active');
    }
  }

  function checkWidth() {
    const windowWidth = uiElements.window.width();
    if (windowWidth >= 992) {
      handleToggleMenu(false)
    }
  }

  const init = () => {
    initUiElements();
    subscribeToEvents()
  }

  init();
}

//Tabs

function Tabs() {
  const uiElements = {
    tab: null,
    tabHeader: null,
    tabContent: null,
  }

  function initUiElements() {
    uiElements.tab = $('.nav-item');
    uiElements.tabHeader = $('.nav-tabs');
    uiElements.tabContent = $('.tab-content-item');
  }


  function subscribeToEvents() {
    uiElements.tabHeader.on('click', onClickTab);
  }

  function hideTabContent(item) {
    for (let i = item; i < uiElements.tabContent.length; i++) {
      uiElements.tabContent[i].removeClass('show');
      uiElements.tabContent[i].addClass('hide');
    }
  }

  function showTabContent(item) {
    if (uiElements.tabContent[item].hasClass('hide')) {
      uiElements.tabContent[item].removeClass('hide');
      uiElements.tabContent[item].addClass('show');
    }
  }
  function onClickTab() {
    handleTab($(this));
  }
  function handleTab(event) {
    uiElements.tab.each(function () {
      $(this).removeClass('active');
    })

    let target = event.target;


    if (target && target.hasClass('nav-item')) {
      for (let i = 0; i < uiElements.tab.length; i++) {
        if (target == uiElements.tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          target.addClass('active')
          break;
        }
      }
    }
  }

  const init = () => {
    initUiElements();
    subscribeToEvents();
    // hideTabContent(1);
    // uiElements.tab[0].addClass('active');
  }

  init();
  console.log('NERW', typeof uiElements.tabContent);
}
