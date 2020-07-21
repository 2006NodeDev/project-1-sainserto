import { Request, Response, NextFunction} from "express";

export function corsFilter(req:Request, res:Response, next:NextFunction){
    // res.header('Access-Control-Allow-Origin', `${req.headers.origin}`)
    res.header('Access-Control-Allow-Origin', `http://findmytutor.saivyl.com`)
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')

    if(req.method === 'OPTIONS'){
        res.sendStatus(200)
    }else{
        console.log("CORS allowed");
        next()
    }
}
