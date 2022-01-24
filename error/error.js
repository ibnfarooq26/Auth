const handleError=(err)=>{
    let errors={email:'', password:''}
    console.log('error js',err
    ) 

    if(err.Error=='incorrect password'){
        errors.password=err.error
    }
    
    if (err.Error=='incorrect Email') {
        errors.email=err.error
    }
    
        if (err.errors){
            if (err.errors.password){
                errors.password= err.errors.password.properties.message
            }
            if (err.errors.email){
                errors.email= err.errors.email.properties.message
            }
        }

        
         if (err.code==11000){
             errors.email='Email already exists'
             console.log('110000 error')
         }
         return errors
    
   

}
module.exports= handleError