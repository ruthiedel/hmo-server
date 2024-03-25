import jwt  from "jsonwebtoken";

export  default function makeToken(user)
{
  
    const token = jwt.sign({
        user_pin:user.pin,
        user_email:user.email,
        role:user.role
      },
      "asdf", {
        expiresIn: "7h"
      }
    );
    
    
    return token;
    
}


