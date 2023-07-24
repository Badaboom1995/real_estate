import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Logo from '../Logo/Logo';
import { TabTemplate } from './TabTemplate';
import { ScriptForm } from '../ScriptForm/ScriptForm';
import { handleScriptsTab, insertAvatarButton } from './editorCustomUtils';
import { Alert, Snackbar } from '@mui/material';

export const EditorCustomComponents = () => {
  const [showSnackBar, setShowSnackbar] = useState(true);
  const [tabPanel, setTabPanel] = useState<Element | null>(null);
  const [editorHeader, setHeader] = useState<Element | null>(null);
  const [searchField, setSearchField] = useState<Element | null>(null);
  const [motionWrapper, setMotionWrapper] = useState<HTMLDivElement | null>(
    null,
  );
  const [choosedTab, setChoosedTab] = useState<string | null>(null);

  const insertLogo = () => {
    const header = document.querySelector(
      '.UBQ_Topbar__controlsContainerLeft--kAbkj',
    ) as HTMLElement;
    const container = document.createElement('div');
    header.prepend(container);
    setHeader(container);
  };

  // Observer catches moment when content wrapper in tab created and able to hide it ASAP
  // In useEffect down below we can show it again if needed
  const setTabObserver = () => {
    const panelLeft = document.getElementById('ubq-portal-container_panelLeft');
    const config = { attributes: false, childList: true, subtree: true };
    const callback = (mutationsList: MutationRecord[]) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const elem = mutation.addedNodes[0] as HTMLDivElement;
          if (
            elem?.classList?.contains(
              'UBQ_AssetLibraryContent__motionWrapper--wAanx',
            )
          ) {
            elem.style.visibility = 'hidden';
            elem.style.height = '0';
            setMotionWrapper(elem);
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(panelLeft as Node, config);
  };

  const setDockListener = () => {
    const dock = document.querySelector('[data-cy="asset-library-dock"]');
    dock?.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLButtonElement)) {
        return;
      }
      setChoosedTab(e.target?.dataset.cy || null);
    });
  };

  useEffect(() => {
    const header = document.querySelector('[data-cy="inspector-title"]');
    switch (choosedTab) {
      case 'librarydock-scripts':
        if (!header) return;
        handleScriptsTab(header, setSearchField, setTabPanel);
        break;
      case 'librarydock-avatar.asset':
        if (!motionWrapper) return;
        insertAvatarButton(motionWrapper, setShowSnackbar);
        break;
      default:
        break;
    }
    // (ALEX)TODO: move to switch
    if (choosedTab !== 'librarydock-scripts') {
      setTimeout(() => {
        motionWrapper?.setAttribute(
          'style',
          'visibility: visible; height: 100%',
        );
      }, 100);
      setTabPanel(null);
      if (header) header.innerHTML = 'Library';
      if (searchField) searchField.removeAttribute('style');
    }
  }, [choosedTab, searchField, motionWrapper]);

  useEffect(() => {
    setTimeout(() => {
      setDockListener();
      setTabObserver();
      insertLogo();
    }, 0);
  }, []);

  return (
    <div>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ marginTop: 6 }}
        onClose={() => {
          setShowSnackbar(false);
        }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="info"
          sx={{ width: '500px' }}
        >
          You can create custom avatar with your appearance and emotions with
          our{' '}
          <a
            target="_blank"
            href="https://spiritme.notion.site/SpiritMe-guide-95771ebeb0454059b8fd48ef7b77ce38"
            rel="noreferrer"
          >
            app
          </a>
          !
        </Alert>
      </Snackbar>
      {tabPanel &&
        createPortal(
          <TabTemplate>
            <ScriptForm />
          </TabTemplate>,
          tabPanel,
          'dockTab',
        )}
      {editorHeader && createPortal(<Logo />, editorHeader, 'editorHeader')}
    </div>
  );
};
