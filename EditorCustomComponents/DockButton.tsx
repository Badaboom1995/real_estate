import React from 'react';

interface IDockButton {
  name: string;
  icon: string;
  active: boolean;
  onClick: (name: string) => void;
  children?: React.ReactNode;
}

export const DockButton = ({
  onClick,
  children,
  name,
  icon,
  active,
}: IDockButton) => (
  <button
    type="button"
    className={`${
      active && 'UBQ_Button__ubq-variant_Selected--HJVnG'
    } customDockButton UBQ_Button__block--C5ITk UBQ_Button__ubq-variant_Plain--tlabL UBQ_Dock__button--sx24I`}
    onClick={() => onClick(name)}
  >
    <span>
      <div className="UBQ_Dock__buttonLabel--hClD8">
        <img src={icon} alt="" />
        <span>{children}</span>
      </div>
    </span>
  </button>
);
