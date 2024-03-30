import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {selectIsLoading, selectPhotos} from './photosGallerySlice.ts';
import {selectUser} from '../Users/usersSlice.ts';
import {Card, CardContent, CardMedia, CircularProgress, Grid, styled, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {apiUrl} from '../../constants.ts';
import {useEffect} from 'react';
import {getPhotos} from './photoGalleryThunks.ts';

const Photos = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const photos = useAppSelector(selectPhotos);
  const isLoading = useAppSelector(selectIsLoading);

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
  });

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(getPhotos());
    };

    void fetchUrl();
  }, [dispatch]);

  const toProfile = (id: string) => {
    navigate(`/photos/${id}`);
  };

  return (
    <>
      <Grid container spacing={3}>
        {!isLoading ? photos.map((elem) => (
          <Grid item xs={3} key={elem._id}>
            <Card>
              <ImageCardMedia image={`${apiUrl}/${elem.image}`}/>
              <CardContent>
                <Typography component="div" variant="h6">
                  <div onClick={() => toProfile(elem.user)}>{elem.title}</div>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )) : <CircularProgress />}
      </Grid>
      </>
  );
};

export default Photos;