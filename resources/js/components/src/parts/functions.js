export const base = '/'
export function callSwal(mesg){ swal({ title: mesg, timer: 4000 }) }
export function printError(mesg){ console.log('mesg', mesg) }
export const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
export const imgPath = "/storage/"
// export const imgPath = "/saukhyam/storage/app/public/"