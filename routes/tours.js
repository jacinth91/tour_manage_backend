import express from 'express'
import {createTour, deleteTour, getTour, getTourById, updateTour} from '../controllers/tourController.js';


const tourRouter = express.Router()

//create new route

tourRouter.post('/',createTour)


tourRouter.post('/:id',updateTour)
tourRouter.post('/delete/:id',deleteTour)

tourRouter.get('/',getTour)
tourRouter.get('/:id',getTourById)

export default tourRouter;