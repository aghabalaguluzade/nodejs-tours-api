import express from "express";
import * as tourController from "../controller/tourController.js";

const router = express.Router();

router.route('/top-5-cheap').get(tourController.topaliasTopTours,tourController.getAllTours);

router
     .route('/')
     .get(tourController.getAllTours)
     .post(tourController.createTour)

router
     .route('/:id')
     .get(tourController.getTour)
     .patch(tourController.updateTour)
     .delete(tourController.deleteTour)

export default router;