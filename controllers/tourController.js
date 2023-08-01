import Tours from "../models/Tours.js";

//crete new tour

export const createTour = async (req,res)=>{
    const newTour  = new Tours(req.body)

    try {
        const savedTour = await newTour.save()
        res.status(200).json({sucess:true,message:'Sucessfulle created',data:savedTour})
    } catch (error) {
        res.status(500).json({sucess:false,message:'Failed',data:error})
        
    }
}
export const getTour = async(req,res)=>{
    try {
        const tour = await Tours.find({ })
        res.status(200).json({sucess:true,message:'Sucessfull',data:tour})
    } catch (error) {
        res.status(500).json({sucess:false,message:'Failed',data:error})
    }
}
export const deleteTour = async(req,res)=>{
    const id=  req.params.id;
    try {
        const updatedTour = await Tours.findByIdAndDelete(id)

        res.status(200).json({
            sucess:true,
            message:"successfully deleted",
            data:updatedTour
        })
    } catch (error) {
            res.status(500).json({
                sucess:false,
                message:"Failed",
                data:error
            })
    }
}
export const updateTour = async(req,res)=>{

    const id=  req.params.id;
    try {
        const updatedTour = await Tours.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})

        res.status(200).json({
            sucess:true,
            message:"successfully updated",
            data:updatedTour
        })
    } catch (error) {
            res.status(500).json({
                sucess:false,
                message:"Failed",
                data:error
            })
    }
}
export const getTourById = async(req,res)=>{

    const id=  req.params.id;
    try {
        const updatedTour = await Tours.findById(id)

        res.status(200).json({
            sucess:true,
            message:"successfull",
            data:updatedTour
        })
    } catch (error) {
            res.status(500).json({
                sucess:false,
                message:"Failed",
                data:error
            })
    }
}


