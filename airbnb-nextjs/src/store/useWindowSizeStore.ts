import { create } from 'zustand';
import { useEffect } from 'react';
import { WindowSizeTypes } from '@/interfaces';

export const useWindowSizeStore = create<WindowSizeTypes>(() => ({
  width: 0,
  height: 0
}));

const updateWindowSize = () => {
  useWindowSizeStore.setState({
    width: window.innerWidth,
    height: window.innerHeight
  });
};

export function useWindowSizeEffect() {
  useEffect(() => {
    // 初始更新
    updateWindowSize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', updateWindowSize);
    
    // 清理
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);
}