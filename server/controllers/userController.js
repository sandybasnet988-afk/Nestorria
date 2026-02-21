// get user profile and  reciet searches [get '/']
export const getUserProfile = async (req, res)=>{
    try {
        const role = req.user.role
        const recentSearchedCities = res.user.recentSearchedCities
        res.json({success:true, role, recentSearchedCities})
        
    } catch (error) {

        res.json({success:false, Message: error.Message})
        
    }
}

// add a new city to the user's recient search history [post '/store-recient-search']
export const addRecentsearchCity = async(req,res)=>{
    try {
        const {recentSearchedCities} = req.body
        const user = await req.user

        if(user.recentSearchedCities.length < 3){
            user.recentSearchedCities.push(recentSearchedCities)
        }else{
            user.recentSearchedCities.shift()
            user.recentSearchedCities.push(recentSearchedCities)
        }
        await user.save()

         res.json({success:true, message: "City Added"})
    } catch (error) {
         res.json({success:false, Message: error.Message})
        
    }
}