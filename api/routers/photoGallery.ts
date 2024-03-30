import {Router} from "express";
import PhotoGallery from "../models/PhotoGallery";
import auth, {RequestWithUser} from "../middleware/auth";
import {imageUpload} from "../multer";
import {Types} from "mongoose";

const photoGalleryRouter = Router();

photoGalleryRouter.get('/', async (_req, res, next) => {
  try {
    const photos = await PhotoGallery.find();

    res.send(photos);
  } catch (err) {
    return next(err);
  }
});

photoGalleryRouter.get('/:id', async (req, res, next) => {
  try {
    try {
      let _id: Types.ObjectId;

      try {
        _id = new Types.ObjectId(req.params.id);
      } catch {
        return res.status(422).send({error: 'Wrong objectId!'});
      }

      const photos = await PhotoGallery.find({user: _id});

      if (!photos) {
        return res.status(422).send({error: 'Not found!'});
      }

      res.send(photos);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    return next(err);
  }
});

photoGalleryRouter.post('/', auth, imageUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const photo = new PhotoGallery({
      user: req.user?._id,
      title: req.body.title,
      image: req.file && req.file.filename,
    });

    await photo.save();

    res.send(photo);
  } catch (err) {
    return next(err);
  }
});

photoGalleryRouter.get('/:id', async (req, res, next) => {
  try {

  } catch (err) {
    return next(err);
  }
});

export default photoGalleryRouter;