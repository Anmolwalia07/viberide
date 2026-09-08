export const track=(event:string,payload:Record<string,unknown>={})=>{if(typeof window!=='undefined' && process.env.NODE_ENV!=='production') console.debug('[analytics]',event,payload)};
