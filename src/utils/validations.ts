/* Artıq mövcud olanlar */
export const nameRegex       = /^[A-Za-zƏəÖöÜüÇçŞşĞğİı]{2,}$/;
export const emailRegex      = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex   = /^.{6,}$/;
export const compingNameRegex= /^[\p{L}\d\s'.-]{2,50}$/u;
export const phoneRegex      = /^\+994|0\s?(50|51|55|70|77|10)\s?\d{3}\s?\d{2}\s?\d{2}$/;
export const addressRegex    = /^.{3,100}$/;

/* ✅ TaskModal üçün əlavə edilənlər */
export const titleRegex      = /^[\p{L}\d\s'.-]{3,100}$/u;  // 3–100 simvol
export const descRegex       = /^.{10,}$/;                  // min 10 simvol

/* Köməkçi funksiyalar */
export const isValidName        = (s: string) => nameRegex.test(s);
export const isValidEmail       = (s: string) => emailRegex.test(s);
export const isValidPassword    = (s: string) => passwordRegex.test(s);
export const isValidCompingName = (s: string) => compingNameRegex.test(s);
export const isValidPhone       = (s: string) => phoneRegex.test(s);
export const isValidAddress     = (s: string) => addressRegex.test(s);

/* ✅ TaskModal üçün köməkçilər */
export const isValidTitle       = (s: string) => titleRegex.test(s);
export const isValidDescription = (s: string) => descRegex.test(s);
export const isValidDeadline    = (iso: string) => {
  if (!iso) return false;
  const today = new Date();                           // bu gün 00:00
  today.setHours(0, 0, 0, 0);
  const date = new Date(iso);
  return date >= today;                               // keçmiş tarix olmaz
};
