export const normalizeArabic = (text: string): string => {
  if (!text) return text;
  return text
    // Replace Alef variations with basic Alef
    .replace(/[أإآ]/g, 'ا')
    // Replace Teh Marbuta with Heh
    .replace(/ة/g, 'ه')
    // Replace Alef Maksura with Yeh
    .replace(/ى/g, 'ي')
    // Remove diacritics (Harakat, Tanween, Shadda, Sukoon)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .trim();
};
