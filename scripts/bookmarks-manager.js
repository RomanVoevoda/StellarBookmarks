'use strict';

const mainFoldersContainer = document.querySelector('.folders-container');

const createNewFolderConfirmButtom = document.querySelector('.new-folder-form button');
const folderNameInput = document.getElementById('folder-name-input');
const folderColorInput = document.getElementById('folder-color-input');

const createNewLinkConfirmButtom = document.querySelector('.new-link-form button');
const labelForLinkNameInput = document.querySelector('#label-for-link-name-input');
const linkNameInput = document.getElementById('link-name-input');
const linkUrlInput = document.getElementById('link-url-input');
const linkColorInput = document.getElementById('link-color-input');

const linksTrashCans = document.getElementsByClassName('fa-trash-can');
const foldersTrashCans = document.getElementsByClassName('fa-trash-arrow-up');

let indexOfCreateLinkButton = 0;
let bookmarksManager = [];

/*
  LOCAL STORAGE
*/
let storageValue = localStorage.getItem('storageValue');

window.addEventListener('load', () => {
  if(storageValue === null || storageValue.length === 2) {
    bookmarksManager = [
      {
        __proto__: foldersMethods,
        name: 'Test Folder',
        status: `open`,
        icon: `fa-folder-open`,
        caret: `fa-caret-down`,
        body: `
          <div class="folder">
            <i class="fa-solid fa-trash-arrow-up ${changeTrashCansStatus()}"></i>
            <div class="folder-info-container">
              <i class="fa-solid ${this.icon}"></i>
              <p>Test Folder</p>
              <i class="fa-solid ${this.caret} ${changeCaretsStatus()}"></i>
            </div>
            <div class="folder-content-container ${this.status}">
              <div class="folder-content">     
                ${refreshLinksContainer(this.arrayOfLinks)}
                <div class="create-new-link-button">
                  <i class="fa-solid fa-plus"></i>
                  <p>Add new link</p> 
                </div>
              </div>
            </div>
          </div>`,
        arrayOfLinks: [
          {
            __proto__: linksMethods,
            name: 'Test Link',
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
            body: `
              <div class="stellar-link-container">
                <span class="stellar-icon"></span>
            
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="stellar-link" target="_blank">
                  <p>Test Link</p>   
                </a>
            
                <i class="fa-solid fa-trash-can ${changeTrashCansStatus()}"></i>
              </div>`,          
          },
        ],
      },
    ];

    bookmarksManager[0].refreshFolderBody();
    refreshBookmarksManager();
    refreshEventListeners();//Первый запуск для тестовых папок, ссылок
  } else {
    bookmarksManager = JSON.parse(storageValue);

    for(let folder of bookmarksManager){

      Object.setPrototypeOf(folder, foldersMethods);

      for(let link of folder.arrayOfLinks) {
        Object.setPrototypeOf(link, linksMethods);
  
        link.refreshLinksBody();
      }

      folder.refreshFolderBody();
    }

    refreshBookmarksManager();
    refreshEventListeners();
  }
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('storageValue', JSON.stringify(bookmarksManager));
})

/*
  PROTOTYPES WITH METHODS FOR CONSTRUCTORS
*/
let foldersMethods = {
  refreshFolderBody() {
    this.body = `
    <div class="folder">
      <i class="fa-solid fa-trash-arrow-up ${changeTrashCansStatus()}"></i>
      <div class="folder-info-container">
        <i class="fa-solid ${this.icon}" style="color: ${this.color};"></i>
        <p>${this.name}</p>
        <i class="fa-solid ${this.caret} ${changeCaretsStatus()}"></i>
      </div>
      <div class="folder-content-container ${this.status}">
        <div class="folder-content">     
          ${refreshLinksContainer(this.arrayOfLinks)}
          <div class="create-new-link-button">
            <i class="fa-solid fa-plus"></i>
            <p>Add new link</p> 
          </div>
        </div>
      </div>
    </div>`
  }
}

let linksMethods = {
  refreshLinksBody()  {
    this.body = `
    <div class="stellar-link-container">
      <span class="stellar-icon" ${this.iconBackground}></span>
  
      <a href="${this.url}" class="stellar-link" target="_blank">
        <p>${this.name}</p>   
      </a>
  
      <i class="fa-solid fa-trash-can ${changeTrashCansStatus()}"></i>
    </div>`
  }
}

/*
  CONSTRUCTORS
*/

function CreateNewFolder() {
  this.name = folderNameInput.value;
  this.color = hexToRGBA(folderColorInput.value, 0, 0, 0, 1);
  this.status = `open`;
  this.icon = `fa-folder-open`;
  this.caret = `fa-caret-down`;
  this.body = `
    <div class="folder">
      <i class="fa-solid fa-trash-arrow-up ${changeTrashCansStatus()}"></i>
      <div class="folder-info-container">
        <i class="fa-solid ${this.icon}" style="color: ${this.color};"></i>
        <p>${this.name}</p>
        <i class="fa-solid ${this.caret} ${changeCaretsStatus()}"></i>
      </div>
      <div class="folder-content-container ${this.status}">     
        <div class="folder-content">     
          ${refreshLinksContainer(this.arrayOfLinks)}
          <div class="create-new-link-button">
            <i class="fa-solid fa-plus"></i>
            <p>Add new link</p> 
          </div>
        </div>
      </div>
    </div>`
  this.arrayOfLinks = [];
}

CreateNewFolder.prototype = foldersMethods;

function CreateNewLink() {
  this.name = linkNameInput.value;
  this.url = linkUrlInput.value;
  this.iconBoxShadow = `box-shadow: 0 0 5px 0px ${hexToRGBA(linkColorInput.value, 1, -8, 7, 1)};`;
  this.iconBackground = `style="background: radial-gradient(circle, ${hexToRGBA(linkColorInput.value, 0, 0, 0, 0.5)} 0%, 
    ${hexToRGBA(linkColorInput.value, 1, -8, 7, 1)} 100%); ${this.iconBoxShadow}"`;
  this.body = `
    <div class="stellar-link-container">
      <span class="stellar-icon" ${this.iconBackground}></span>
  
      <a href="${this.url}" class="stellar-link" target="_blank">
        <p>${this.name}</p>   
      </a>
  
      <i class="fa-solid fa-trash-can ${changeTrashCansStatus()}"></i>
    </div>`;
}

CreateNewLink.prototype = linksMethods;

/*
  REFRESHERS
*/

function refreshLinksContainer(arr){
  if(arr == undefined || arr == null) {
    return `<div class="folder-links-container"></div>`;
  }

  let str = ``;

  for(let element of arr) {
    str += element.body;
  }

  return `<div class="folder-links-container">` + str + `</div>`;
}

function refreshBookmarksManager(){
  let allFolders = ``;

  for(let element of bookmarksManager) {
    allFolders += element.body;
  }

  mainFoldersContainer.innerHTML = allFolders;
}

function refreshFoldersStatus(){
  const foldersContentContainers = document.querySelectorAll('.folder-content-container');

  for(let i = 0; i < foldersContentContainers.length; i++) {
    if(foldersContentContainers[i].classList.contains('open')) {
      bookmarksManager[i].status = `open`;
      bookmarksManager[i].icon = `fa-folder-open`;
      bookmarksManager[i].caret = `fa-caret-down`;
    } else  {
      bookmarksManager[i].status = ``;
      bookmarksManager[i].icon = `fa-folder`;
      bookmarksManager[i].caret = `fa-caret-right`;
    }
    bookmarksManager[i].refreshFolderBody();
  }
}

function refreshEventListeners(){
  const foldersInfoContainers = document.getElementsByClassName('folder-info-container');
  const createNewLinkButtons = document.querySelectorAll('.create-new-link-button');

  for(let i = 0; i < foldersInfoContainers.length; i++) {
    let folderId = 'folder-id-' + [i];
    let buttonId = [i];
    foldersInfoContainers[i].setAttribute('id', `${folderId}`);
    foldersInfoContainers[i].addEventListener('click', () => {
      changeFolderStatus(folderId);
    })
    createNewLinkButtons[i].addEventListener('click', () => {
      openLinkCreationForm(buttonId);
    })
  }

  refreshTrahscansEventListeners();
}

function refreshObjectsBodies() {
  bookmarksManager.forEach((folder) => folder.arrayOfLinks.forEach((link) => link.refreshLinksBody()));
  bookmarksManager.forEach((folder) => folder.refreshFolderBody());
}

/*
 CHANGE RENDER STATUS
*/

function changeFolderStatus(folderId){
  const infoContainerFolderIcon = document.querySelector('#' + folderId + ' i:first-child');
  const infoContainerCaretIcon = document.querySelector('#' + folderId + ' i:last-child');
  const folderContentContainer = document.querySelector('div#' + folderId + ' + div');


  if(infoContainerFolderIcon.classList.contains('fa-folder-open')) {
    infoContainerFolderIcon.classList.remove('fa-folder-open');
    infoContainerCaretIcon.classList.remove('fa-caret-down');
    folderContentContainer.classList.remove('open');

    infoContainerFolderIcon.classList.add('fa-folder');
    infoContainerCaretIcon.classList.add('fa-caret-right');

    refreshFoldersStatus();
  } else {
    infoContainerFolderIcon.classList.add('fa-folder-open');
    infoContainerCaretIcon.classList.add('fa-caret-down');
    folderContentContainer.classList.add('open');

    infoContainerFolderIcon.classList.remove('fa-folder');
    infoContainerCaretIcon.classList.remove('fa-caret-right');

    refreshFoldersStatus();
  }
}

function openLinkCreationForm(id){
  linkNameInput.removeAttribute('style');
  labelForLinkNameInput.innerHTML = 'Enter link name';
  newLinkFormContainer.classList.add('flex');

  indexOfCreateLinkButton = id;
}

function changeTrashCansStatus(){
  return (deleteModeButton.classList.contains('on')) ? `` : `display-none`;
}

function changeCaretsStatus(){
  return (deleteModeButton.classList.contains('on')) ? `hidden-element` : ``;
}

/*
  OTHERS
*/

function hexToRGBA(hex, rCorrection, gCorrection, bCorrection, alpha) {
  let r = parseInt(hex.slice(1, 3), 16) + rCorrection;
  let  g = parseInt(hex.slice(3, 5), 16) + gCorrection;
  let  b = parseInt(hex.slice(5, 7), 16) + bCorrection;

  return `rgba(${r}, ${g}, ${b}, ${alpha} )`;
}

function findLinkWithSameName(){
  let result = bookmarksManager.some((folder) => {
    let result = folder.arrayOfLinks.some((link) => link.name === linkNameInput.value);

    if(result === true) return true;
  })

  return (result === true) ? true : false;
}

/*
  EVENTS LISTENERS
*/

createNewFolderConfirmButtom.addEventListener('click', () => {
  bookmarksManager.push(new CreateNewFolder());

  refreshFoldersStatus();
  refreshBookmarksManager();
  refreshEventListeners();

  newFolderFormContainer.classList.remove('flex');
});

createNewLinkConfirmButtom.addEventListener('click', () => {
  if(findLinkWithSameName())  {
    linkNameInput.setAttribute('style', 'border-color: rgba(205, 69, 69, 1);');
    labelForLinkNameInput.innerHTML = 'This name is taken';
  } else {
    bookmarksManager[indexOfCreateLinkButton].arrayOfLinks.push(new CreateNewLink());
    refreshObjectsBodies();

    refreshBookmarksManager();
    refreshEventListeners();

    newLinkFormContainer.classList.remove('flex');
  }
});