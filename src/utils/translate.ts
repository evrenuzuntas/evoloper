// Desteklenen diller
export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

// Google Translate API'si için basit wrapper
export const translateText = async (text: string, targetLang: string): Promise<string> => {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0][0][0];
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Hata durumunda orijinal metni döndür
  }
};

// Dil kodunu localStorage'da sakla
export const setLanguage = (langCode: string) => {
  localStorage.setItem("app-lang", langCode);
};

// Kaydedilmiş dil kodunu al
export const getLanguage = (): string => {
  return localStorage.getItem("app-lang") || "en";
};
