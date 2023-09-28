import jwt from "jsonwebtoken";
interface User {
    id?: string;
    firstName: string;
    lastName: string;
    imageURL: string;
    email: string;
    password: string;
    role: string;
    status: "ACTIVE" | "INACTIVE" | "DELETED";
    createdAt: Date;
    updatedAt: Date;
  }
  

class VerifyToken {
    constructor(){}

    public  tokenVerification(user:User) {
        try {
            const token = jwt.sign(
                { email: user.email, password: user.password },
                "SomeThingReallyTricky1345",
                {
                  expiresIn: "10h",
                }
              );
              return token;
        }catch(error) {
            console.log("==============Token Verification Error=================",error);
        }
    }
}
var TokenVerificationHelper = new VerifyToken;
export default TokenVerificationHelper;