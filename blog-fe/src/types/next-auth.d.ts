import "next-auth"

declare module "next-auth"{
    interface Session{
        user:{
            objectId?: string;
            email: string;
            name: string;
        };
        userToken?: string;
    }

    interface JWT{
        objectId?: string;
        email: string;
        name: string;
        userToken?: string;
    }

    interface User{
        objectId?: string;
        email: string;
        name: string;
        userToken?: string;       
    }
}