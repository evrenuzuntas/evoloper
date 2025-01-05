import { useState, useEffect } from "react";
import { translateText, getLanguage } from "../utils/translate";

// Çevirileri önbellekte tutmak için
const translationCache: { [key: string]: { [key: string]: string } } = {};

export const useTranslation = (text: string) => {
  const [translatedText, setTranslatedText] = useState(text);
  const currentLang = getLanguage();

  useEffect(() => {
    const fetchTranslation = async () => {
      // Eğer metin İngilizce ise veya dil İngilizce ise çevirme
      if (currentLang === "en") {
        setTranslatedText(text);
        return;
      }

      // Önbellekte varsa oradan al
      if (translationCache[currentLang]?.[text]) {
        setTranslatedText(translationCache[currentLang][text]);
        return;
      }

      try {
        const translated = await translateText(text, currentLang);

        // Önbelleğe kaydet
        if (!translationCache[currentLang]) {
          translationCache[currentLang] = {};
        }
        translationCache[currentLang][text] = translated;

        setTranslatedText(translated);
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedText(text); // Hata durumunda orijinal metni göster
      }
    };

    fetchTranslation();
  }, [text, currentLang]);

  return translatedText;
};
