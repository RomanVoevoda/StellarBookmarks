const newFolderButton = document.querySelector('.fa-folder-plus');
const deleteModeButton = document.querySelector('.fa-folder-minus');

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