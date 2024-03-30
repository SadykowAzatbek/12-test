import {Button, Card, CardContent, CardMedia, CircularProgress, Grid, styled, Typography} from '@mui/material';
import {apiUrl} from '../../constants.ts';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {selectUserPhotos, selectUserIsLoading} from './photosGallerySlice.ts';
import {useEffect} from 'react';
import {deletePhoto, getUserPhotos, userDeletePhoto} from './photoGalleryThunks.ts';
import {selectUser} from '../Users/usersSlice.ts';
import {useParams} from 'react-router-dom';

const UserPhotos = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const userPhotos = useAppSelector(selectUserPhotos);
  const isLoading = useAppSelector(selectUserIsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const fetchUrl = async () => {
      if (params.id) await dispatch(getUserPhotos(params.id));
    };

    void fetchUrl();
  }, [dispatch]);

  const deleteOnePhoto = async (id: string) => {
    await dispatch(deletePhoto(id));
    if (params.id) await dispatch(getUserPhotos(params.id));
  };

  const userDeleteOnePhoto = async (id: string) => {
    await dispatch(userDeletePhoto(id));
    if (params.id) await dispatch(getUserPhotos(params.id));
  };

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
  });

  return (
    <>
      <Grid container spacing={3}>
        {!isLoading ? userPhotos.map((elem) => (
          <Grid item xs={3} key={elem._id}>
            <Card>
              <ImageCardMedia image={`${apiUrl}/${elem.image}`}/>
              <CardContent>
                <Typography component="div" variant="h6">
                  {elem.title}
                </Typography>
                <Typography>
                  {elem.user.displayName}
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