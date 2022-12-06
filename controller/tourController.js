import Tour from "../model/tourModel.js";

const topaliasTopTours = (req,res,next) => {
     req.query.limit = '5';
     req.query.sort = '-ratingsAverage,price';
     req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
     next();
};

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

          // Advanced Filtering
          let queryStr = JSON.stringify(queryObj);
          queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

          let query = Tour.find(JSON.parse(queryStr));

          // Sorting
          if(req.query.sort) {
               const sortBy = req.query.sort.split(',').join(' ');
               console.log(sortBy);
               query = query.sort(sortBy);
          }else {
               query = query.sort('-createdAt');
          }

          // Field Limiting
          if(req.query.fields) {
               const fields = req.query.fields.split(',').join(' ');
               query = query.select(fields);
          }else {
               query = query.select('-__v');
          }

          // Pagination
          const page = req.query.page * 1 || 1;
          const limit = req.query.limit * 1 || 100;
          const skip = (page - 1) * limit;
          query = query.skip(skip).limit(limit); //page=2&limit=10, 1-10, page 1, 11-20, page 2, 21-30 page 3;

          if(req.query.page) {
               const numTours = await Tour.countDocuments();
               if(skip >= numTours) throw new Error("This page does not exist");
          }

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
     deleteTour,
     topaliasTopTours
};