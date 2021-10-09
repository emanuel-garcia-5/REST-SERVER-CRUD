const mongosee = require('mongoose');




const dbConnection = async() => {

try{

   await mongosee.connect(process.env.MONGODB_CNN,{
    //    useNewUrlParser: true,
    //    useUnifiedTopology: true,
    //    useCreateIndex: true,
    //    useFindAndModify: false
   });

   console.log('Base de datos en linea');
   
}catch (error){
    console.log(error)
    throw new Error('Error al iniciar la base de datos');
    
}

}

module.exports = {
    dbConnection
}