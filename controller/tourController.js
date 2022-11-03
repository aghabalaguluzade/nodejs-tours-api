import Tour from "../model/tourModel.js";


const createTour = async (req,res) => {
     try {          
          const newTour = await Tour.create(req.body);
          
          res.status(201).json({
               status : "success",
               data : newTour
          });
     } catch (error) {
          res.status(400).json({
               status : "fail",
               message : "Invalid data sent!",
               detail : error
          });
     };
};

const getAllTours = async (req,res) => {
     try {
          // Build Query
          const queryObj = { ...req.query };
          const excludedFields = ['page', 'sort', 'limit', 'fields'];
          excludedFields.forEach(e => delete queryObj[e]);

          const query = Tour.find();
          
          // Execute Query
          const tours = await query;

          res.status(200).json({
               status : "success",
               length : tours.length,
               data : tours
          });
     } catch (error) {
          res.status(404).json({
               status : "fail",
               message : error
          });
     };
};


const getTour = async (req,res) => {
     try {
          const tour = await Tour.findById(req.params.id);
          
          res.status(200).json({
               status : "success",
               data : tour
          });
     } catch (error) {
          res.status(404).json({
               status : "fail",
               message : error
          });
     };
};

const updateTour = async (req,res) => {
     try {
          const tour = await Tour.findByIdAndUpdate(req.params.id,req.body, {
               new: true,
               runValidators : true
          });
          
          res.status(200).json({
               status : "success",
               data : tour
          });
     } catch (error) {
          res.status(404).json({
               status : "fail",
               message : error
          });
     };
};

const deleteTour = async (req,res) => {
     try {
          await Tour.findByIdAndDelete(req.params.id);
          
          res.status(204).json({
               status : "success",
               data : null
          });
     } catch (error) {
          res.status(404).json({
               status : "fail",
               message : error
          });          
     };
};

export {
     createTour,
     getAllTours,
     getTour,
     updateTour,
     deleteTour
};