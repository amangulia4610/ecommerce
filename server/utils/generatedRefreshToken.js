import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js'; // Adjust the import path as necessary


const generatedRefreshToken = async(userId) => {
    const token = await jwt.sign({ id:userId},
        process.env.JWT_SECRET_KEY_REFRESH,
    {expiresIn: '7d'}
)

    // Store the refresh token in the user's document
    const updateRefreshTokenUser = await UserModel.updateOne(
        { _id: userId },
        { refresh_token: token }
    );
    

    return token
}
export default generatedRefreshToken;