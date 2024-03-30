import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {selectIsLoading, selectPhotos} from './photosGallerySlice.ts';
import {selectUser} from '../Users/usersSlice.ts';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress, Dialog, DialogActions,
  DialogContent,
  Grid,
  styled,
  Typography
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {apiUrl} from '../../constants.ts';
import {useEffect, useState} from 'react';
import {deletePhoto, getPhotos} from './photoGalleryThunks.ts';

const Photos = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const photos = useAppSelector(selectPhotos);
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);

  const [photosData, setPhotosData] = useState<null | string>(null);
  const [dialog, setDialog] = useState(false);

  const handleOpen = (photo: string) => {
    setPhotosData(photo);
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(getPhotos());
    };

    void fetchUrl();
  }, [dispatch]);

  const toProfile = (id: string) => {
    navigate(`/photos/${id}`);
  };

  const deleteOnePhoto = async (id: string) => {
    await dispatch(deletePhoto(id));
    await dispatch(getPhotos());
  };

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '65.25%',
  });

  return (
    <>
      <Grid container spacing={3}>
        {!isLoading ? photos.map((elem) => (
          <Grid item xs={3} key={elem._id}>
            <Card onClick={() => handleOpen(elem.image)}>
              <ImageCardMedia image={`${apiUrl}/${elem.image}`}/>
              <CardContent>
                <Typography component="div" variant="h6">
                  {elem.title}
                </Typography>
                <Typography component="div">
                  <div onClick={() => toProfile(elem.user._id)}>By: {elem.user?.displayName}</div>
                </Typography>
                {user && user.role === 'admin' && <Typography component="div">
                  <Button sx={{color: 'red'}} onClick={() => deleteOnePhoto(elem._id)}>Удалить</Button>
                </Typography>}
              </CardContent>
            </Card>
          </Grid>
        )) : <CircularProgress />}
      </Grid>

      <Dialog open={dialog} onClose={handleClose}>
        <DialogContent sx={{width: "400px", height: "auto"}}>
          <ImageCardMedia image={`${apiUrl}/${photosData}`} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </>
  );
};

export default Photos;