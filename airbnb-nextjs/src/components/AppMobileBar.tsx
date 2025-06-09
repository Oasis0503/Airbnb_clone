"use Client"

import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { HolidayVillage, Logout, ManageSearch, Person } from '@mui/icons-material';
import { BottomBarIcon, BottomBarIconBox, BottomBarTypography } from '@/styles/appBarStyle';
import { useAlertErrorStore, usePageStore, useSnackbarStore, useTokenStore } from '@/store';
import { useRouter } from 'next/navigation';
import { newRequests } from '../../helper';
import { ChildrenTypes } from '@/interfaces';

const AppMobileBar: React.FC<ChildrenTypes> = ({ children }) => {
  const { token, setToken } = useTokenStore();
  const { page } = usePageStore();
  const { showSnackbar } = useSnackbarStore();
  const { showAlertError } = useAlertErrorStore();
  const router = useRouter();

  const navigateLand = () => router.push("/"); 

  // define for mobile log out button, show notice when log out success
  const handleLogout = () : void => {
    newRequests('/user/auth/logout', 'POST', undefined, token)
      .then(() : void => {
        setToken(null);
        navigateLand();
        showSnackbar('Logout Success', 'success');
      }).catch((error) : void => {
        showAlertError('Logout Error', error.error);
      })
  }

  return (
    <>
    {children}
    <BottomBarIcon sx={{ flexGrow: 1 }}>
      {/* AppBar is the bottom bar of the page for mobile, it contains the logo, search bar, profile button, and login button */}
      <AppBar position="fixed" color="default" sx={{
        height: 64,
        bottom: 0,
        top: 'auto',
        borderTop: 1,
        borderColor: '#DDDDDD',
        bgcolor: '#ffffff',
        boxShadow: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 44, width: '70%' }}>
          {/* Logo is the Airbnb logo, it will direct to landing page when click */}
          <BottomBarIcon sx={{ color: page === 0 ? '#FF385C' : 'rgb(113, 113, 113)' }}>
            <BottomBarIconBox onClick={() => router.push('/')}><ManageSearch /></BottomBarIconBox>
            <BottomBarTypography>Listing</BottomBarTypography>
          </BottomBarIcon>
          {/* SearchFilterBar is the search bar, it will direct to search result page when click */}
          <BottomBarIcon sx={{ color: page === 1 ? '#FF385C' : 'rgb(113, 113, 113)' }}>
            <BottomBarIconBox onClick={() => router.push('/myHosting')}><HolidayVillage /></BottomBarIconBox>
            <BottomBarTypography>Your Hosting</BottomBarTypography></BottomBarIcon>
          {/* Profile button is the button that will show user's email first letter in a avatar, it will direct to profile page when click */}
          <BottomBarIcon>
            { token
              ? <>
                  <BottomBarIconBox onClick={handleLogout}><Logout /></BottomBarIconBox>
                  <BottomBarTypography>Log out</BottomBarTypography>
              </>
              : <>
                <BottomBarIconBox onClick={() => router.push('/login')}><Person/></BottomBarIconBox>
                <BottomBarTypography>Log in</BottomBarTypography>
              </>
            }
          </BottomBarIcon>
        </Toolbar>
      </AppBar>
    </BottomBarIcon>
    </>
  );
}

export default AppMobileBar;
