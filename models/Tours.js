import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(


    {
        title:{
            type:String,
            required:true,
            
        },
        guide:{
            type:String,
            required:true,
            
        },
        location:{
            type:String,
            required:true,
            
        },
        date_of_tour:{
            type:String,
            required:true,
            
        },
        images:{
            type:String,
            required:false,
            
        },


    },
    {timestamps:true}
)

export default mongoose.model("Tour",tourSchema);