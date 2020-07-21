
export let lbBaseUrl:string
if(process.env['NODE_ENV'] === 'production'){
    //npm run build
   
    lbBaseUrl = 'http://35.190.70.41'
    // lbBaseUrl = 'http://node-service.saivyl.com'

}else {
    //test or dev
    lbBaseUrl = 'http://localhost:2006'
}