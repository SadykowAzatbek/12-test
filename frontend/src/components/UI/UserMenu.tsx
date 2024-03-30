import React, {useState} from 'react';
import {UserTypes} from '../../types';
import {Avatar, Button, CardMedia, Menu, MenuItem, styled} from '@mui/material';
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

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    padding: '22px',
    borderRadius: '50%',
    marginLeft: '10px'
  });

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.displayName}!
      </Button>
      {user.avatar ? <ImageCardMedia image={`${apiUrl}/${user.avatar}`}/> : <Avatar sx={{ml: 2}} />}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;