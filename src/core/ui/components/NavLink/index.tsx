import React, { ReactElement, forwardRef, ForwardRefRenderFunction } from 'react';
import { useLocation } from 'react-router-dom';

type NavLinkProps = {
  render: (args: { isActive: boolean }) => ReactElement | null;
  to: string;
};

const NavLink: ForwardRefRenderFunction<HTMLElement, NavLinkProps> = ({ to, render }, ref) => {
  const current = useLocation();
  const isActive = current.pathname.includes(to);
  return render({ isActive });
};

export default forwardRef<HTMLElement, NavLinkProps>(NavLink);
