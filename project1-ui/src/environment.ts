
export let fmtBaseUrl: string
if (process.env['NODE_ENV'] === 'production') {
    // fmtBaseUrl = 'http://35.190.70.41'
    fmtBaseUrl = 'http://node-service.saivyl.com'

} else {
    //test or dev
    fmtBaseUrl = 'http://localhost:2006'
}