import {Button, Card, CardContent, CardMedia, CircularProgress, Grid, styled, Typography} from '@mui/material';
import {apiUrl} from '../../constants.ts';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {selectUserPhotos, selectUserIsLoading} from './photosGallerySlice.ts';
import {useEffect} from 'react';
import {deletePhoto, getUserPhotos, getUsers, userDeletePhoto} from './photoGalleryThunks.ts';
import {selectUser, selectUsers, selectUsersLoading} from '../Users/usersSlice.ts';
import {useNavigate, useParams} from 'react-router-dom';

const UserPhotos = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userPhotos = useAppSelector(selectUserPhotos);
  const isLoading = useAppSelector(selectUserIsLoading);
  const user = useAppSelector(selectUser);
  const users = useAppSelector(selectUsers);
  const usersIsLoading = useAppSelector(selectUsersLoading);

  useEffect(() => {
    const fetchUrl = async () => {
      if (params.id) await dispatch(getUserPhotos(params.id));
      await dispatch(getUsers());
    };

    void fetchUrl();
  }, [dispatch, params.id]);

  const deleteOnePhoto = async (id: string) => {
    await dispatch(deletePhoto(id));
    if (params.id) await dispatch(getUserPhotos(params.id));
  };

  const userDeleteOnePhoto = async (id: string) => {
    await dispatch(userDeletePhoto(id));
    if (params.id) await dispatch(getUserPhotos(params.id));
  };

  const toForm = () => {
    navigate('/addPhoto');
  };

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
  });

  const getUserName = users.find(elem => elem._id === params.id);

  return (
    <>
      {user?._id === params.id && <Button onClick={toForm}>Add new photo</Button>}
      {!usersIsLoading && getUserName ? <Typography component="div" variant="h4">{getUserName.displayName}</Typography> : <CircularProgress />}
      <Grid container spacing={3}>
        {!isLoading ? userPhotos.map((elem) => (
          <Grid item xs={3} key={elem._id}>
            <Card>
              <ImageCardMedia image={`${apiUrl}/${elem.image}`}/>
              <CardContent>
                <Typography component="div" variant="h6">
                  {elem.title}
                </Typography>
                {user && user._id === elem.user._id && <Typography component="div">
                  <Button sx={{color: 'red'}} onClick={() => userDeleteOnePhoto(elem._id)}>Удалить</Button>
                </Typography>}
                {user && user.role === 'admin' && <Typography component="div">
                  <Button sx={{color: 'red'}} onClick={() => deleteOnePhoto(elem._id)}>Удалить</Button>
                </Typography>}
              </CardContent>
            </Card>
          </Grid>
        )) : <CircularProgress />}
      </Grid>
    </>
  );
};

export default UserPhotos;