import customAvatar from '../../assets/customAvatar.png';
import './editorCustomStyles.css';

export const insertAvatarButton = (
  motionWrapper: HTMLDivElement,
  setShowSnackbar: (p: boolean) => void,
) => {
  setTimeout(() => {
    const buttonsContainer = motionWrapper?.querySelector(
      '.UBQ_MasonryGrid__block--zspbY',
    );
    const avatarDiv: HTMLDivElement = document.createElement('div');
    avatarDiv.classList.add('avatarButtonWrapper');
    const avatarInnerDiv: HTMLDivElement = document.createElement('div');
    avatarInnerDiv.classList.add('UBQ_AssetResultContainer__block--TbRJ6');
    const avatarButton = document.createElement('button');
    avatarButton.classList.add('avatarButton');

    avatarInnerDiv.appendChild(avatarButton);
    avatarDiv.appendChild(avatarInnerDiv);
    avatarDiv.onclick = () => {
      setShowSnackbar(true);
    };
    avatarButton.setAttribute(
      'style',
      `background-image: url(${customAvatar});`,
    );
    if (buttonsContainer) buttonsContainer.prepend(avatarDiv);
  }, 0);
};

type setFunction = (elem: Element | null) => void;
export const handleScriptsTab = (
  header: Element,
  setSearchField: setFunction,
  setTabPanel: setFunction,
) => {
  // eslint-disable-next-line no-param-reassign
  header.innerHTML = 'Scripts';
  const panel = document.querySelector(
    '.UBQ_AssetLibraryContent__block--mQiYI',
  );
  const searchButton: HTMLDivElement | null = document.querySelector(
    '.UBQ_AssetLibrarySearch__inputContainer--KX4zC',
  );
  if (searchButton) {
    setSearchField(searchButton);
    searchButton.style.display = 'none';
  }
  if (panel) setTabPanel(panel);
};

export const setNormalState = (
  motionWrapper: Element,
  setTabPanel: setFunction,
  header: Element,
  searchField: Element,
) => {
  setTimeout(() => {
    motionWrapper?.setAttribute('style', 'visibility: visible; height: 100%');
  }, 100);
  setTabPanel(null);
  // eslint-disable-next-line no-param-reassign
  if (header) header.innerHTML = 'Library';
  if (searchField) searchField.removeAttribute('style');
};
