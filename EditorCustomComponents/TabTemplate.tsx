interface ITabTemplate {
  children: React.ReactNode;
}

export const TabTemplate = ({ children }: ITabTemplate) => (
  <div style={{ padding: '12px' }}>{children}</div>
);
