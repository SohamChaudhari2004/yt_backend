
// 1st method
const asyncHandeler  = (requestHandler)=>{
   return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
}

export default asyncHandeler

//2nd method -> using higher order functions

// const asyncHandeler = (fn) => {
//     (req,res,next)=>{
//         try {
            
//         } catch (error) {
//            res.status(error.code || 500).json({
//             success  : false,
//             message : error.message
//            })
//         }
//     }
// }