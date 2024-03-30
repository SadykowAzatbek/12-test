import {Router} from "express";
import PhotoGallery from "../models/PhotoGallery";
import auth, {RequestWithUser} from "../middleware/auth";
import {imageUpload} from "../multer";
import {Types} from "mongoose";
import permit from "../middleware/permit";

const photoGalleryRouter = Router();

photoGalleryRouter.get('/', async (_req, res, next) => {
  try {
    const photos = await PhotoGallery.find();

    return res.send(photos);
  } catch (err) {
    return next(err);
  }
});

photoGalleryRouter.get('/:id', async (req, res, next) => {
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

    return res.send(photos);
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

    return res.send(photo);
  } catch (err) {
    return next(err);
  }
});

photoGalleryRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(422).send({error: 'Wrong objectId!'});
    }

    const deleteOnePhoto = await PhotoGallery.findByIdAndDelete(_id);

    if (!deleteOnePhoto) {
      return res.status(422).send({error: 'Not found!'});
    }

    return res.send({message: 'One photo deleted'});
  } catch (err) {
    return next(err);
  }
});

photoGalleryRouter.delete('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const photoId = req.query.photo as string;

    const photo = await PhotoGallery.findById(photoId);

    if (!photo) {
      return res.status(404).send({error: 'Photo not found'});
    }

    if (photo.user.toString() !== req.user?._id.toString()) {
      return res.status(403).send({error: 'Access denied!!'});
    }

    await PhotoGallery.findByIdAndDelete(photoId);

    return res.send({message: 'One photo deleted'});

  } catch (err) {
    return next(err);
  }
});

export default photoGalleryRouter;