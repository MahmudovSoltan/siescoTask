
export const nameRegex = /^[A-Za-zƏəÖöÜüÇçŞşĞğİı]{2,}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;


export const isValidName = (name: string) => nameRegex.test(name);
export const isValidEmail = (email: string) => emailRegex.test(email);
export const isValidPassword = (password: string) => passwordRegex.test(password);
