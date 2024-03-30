import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import FileInput from '../../components/UI/FileInput.tsx';
import React, {useState} from 'react';
import {PhotoGalleryTypes} from '../../types';
import {addPhoto} from './photoGalleryThunks.ts';
import {useAppDispatch} from '../../App/hooks.ts';
import {useNavigate} from 'react-router-dom';

const PhotoGalleryForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState<PhotoGalleryTypes>({
    title: '',
    image: '',
  });

  const [active, setActive] = useState(true);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState, [name]: files[0]
      }));

      setActive(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(addPhoto(state));
    navigate('/');
  };

  return (
    <>
      <Typography variant="h5">Add new photo</Typography>
      <Box component="form" onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={8} sx={{mb: 2}}>
            <TextField
              required
              label="title"
              name="title"
              autoComplete="title"
              value={state.title}
              onChange={inputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={8}>
            <FileInput label="image" name="image" onChange={fileInputChangeHandler} />
          </Grid>
        </Grid>
        <Button type="submit" disabled={active}>Add photo</Button>
      </Box>
    </>
  );
};

export default PhotoGalleryForm;