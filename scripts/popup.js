const newFolderButton = document.querySelector('.fa-folder-plus');
const deleteModeButton = document.querySelector('.fa-folder-minus');
const createNewLinkButton = document.querySelector('.create-new-link-button');

const newFolderFormCloseButton = document.querySelector('#folder-form-close-button');
const newLinkFormCloseButton = document.querySelector('#link-form-close-button');

const newFolderFormContainer = document.querySelector('.new-folder-form-container');
const newLinkFormContainer = document.querySelector('.new-link-form-container');

newFolderButton.addEventListener('click', () => {
  newFolderFormContainer.classList.add('flex');
});

newFolderFormCloseButton.addEventListener('click', () => {
  newFolderFormContainer.classList.remove('flex');
});

createNewLinkButton.addEventListener('click', () => {
  newLinkFormContainer.classList.add('flex');
});

newLinkFormCloseButton.addEventListener('click', () => {
  newLinkFormContainer.classList.remove('flex');
});

deleteModeButton.addEventListener('click', () => {
  const linksTrashCans = document.getElementsByClassName('fa-trash-can');
  if(linksTrashCans == null) {
    return;
  }

  if(deleteModeButton.classList.contains('on')) {
    deleteModeButton.classList.remove('on');

    for(let trashCan of linksTrashCans) {
      trashCan.classList.add('display-none');
    }  
  } else {
    deleteModeButton.classList.add('on');

    for(let trashCan of linksTrashCans) {
      trashCan.classList.remove('display-none');
    }  
  }
});

//Дальше функционал открыти, закрытия папок
const foldersInfoContainers = document.getElementsByClassName('folder-info-container');
const infoContainerFolderIcons = document.querySelectorAll('.folder-info-container i:first-child');
const infoContainerCaretIcons = document.querySelectorAll('.folder-info-container i:last-child');
const folderContentContainers = document.getElementsByClassName('folder-content-container');

for(let i = 0; i < foldersInfoContainers.length; i ++) {
  foldersInfoContainers[i].addEventListener('click', () => {
    if(infoContainerFolderIcons[i].classList.contains('fa-folder-open')) {
      infoContainerFolderIcons[i].classList.remove('fa-folder-open');
      infoContainerCaretIcons[i].classList.remove('fa-caret-down');
      folderContentContainers[i].classList.remove('open');

      infoContainerFolderIcons[i].classList.add('fa-folder');
      infoContainerCaretIcons[i].classList.add('fa-caret-right');
    } else {
      infoContainerFolderIcons[i].classList.add('fa-folder-open');
      infoContainerCaretIcons[i].classList.add('fa-caret-down');
      folderContentContainers[i].classList.add('open');

      infoContainerFolderIcons[i].classList.remove('fa-folder');
      infoContainerCaretIcons[i].classList.remove('fa-caret-right');
    }
  })
};