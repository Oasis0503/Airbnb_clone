"use client"

import React from 'react';
import { useWindowSizeEffect, useWindowSizeStore } from '@/store';
import AppLgTopBar from './AppLgTopBar';
import AppMobileBar from './AppMobileBar';

type AppTopBarProps = {
  children?: React.ReactNode;
}

// Check the width of the window, if it is larger than 743px, use AppLgTopBar, otherwise use AppMobileBar
const AppTopBar: React.FC<AppTopBarProps> = ({ children }) => {
  const { width } = useWindowSizeStore();

  useWindowSizeEffect();

  return (width > 743 ? <AppLgTopBar>{children}</AppLgTopBar> : <AppMobileBar>{children}</AppMobileBar>)
}

export default AppTopBar;
