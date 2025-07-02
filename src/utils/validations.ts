
export const nameRegex = /^[A-Za-zƏəÖöÜüÇçŞşĞğİı]{2,}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^.{6,}$/;
export const compingNameRegex = /^[\p{L}\d\s'.-]{2,50}$/u;
export const phoneRegex = /^\+994|0\s?(50|51|55|70|77|10)\s?\d{3}\s?\d{2}\s?\d{2}$/;
export const addressRegex = /^.{3,100}$/;





export const isValidPhone = (phone:string)=>phoneRegex.test(phone)
export const isValidAddress = (address:string)=>addressRegex.test(address)
export const isValidCompingName = (name:string)=>compingNameRegex.test(name)
export const isValidName = (name: string) => nameRegex.test(name);
export const isValidEmail = (email: string) => emailRegex.test(email);
export const isValidPassword = (password: string) => passwordRegex.test(password);
