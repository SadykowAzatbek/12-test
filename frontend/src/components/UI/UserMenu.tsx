import React from 'react';
import {UserTypes} from '../../types';
import {Avatar, CardMedia, styled, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {logout} from '../../features/Users/usersThunks.ts';
import {useAppDispatch} from '../../App/hooks.ts';
import {apiUrl} from '../../constants.ts';

interface Props {
  user: UserTypes;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toProfile = () => {
    navigate(`/photos/${user._id}`);
  };

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    padding: '22px',
    borderRadius: '50%',
    marginLeft: '10px'
  });

  return (
    <>
      <Typography component="div" sx={{mr: 2}}>
        <div onClick={toProfile}>
          Hello, {user.displayName}!
        </div>
      </Typography>
      <Typography component="div">
        <div onClick={handleLogout}>Logout</div>
      </Typography>
      {user.avatar ? <ImageCardMedia image={`${apiUrl}/${user.avatar}`}/> : <Avatar sx={{ml: 2}} />}
    </>
  );
};

export default UserMenu;