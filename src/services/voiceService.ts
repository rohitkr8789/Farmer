export type SpeechLanguage = 'hi-IN' | 'en-IN';
export type VoicePreferences = { language: SpeechLanguage; preferredGender: 'female' | 'any'; autoAlerts: boolean; volume: number };
const PREF_KEY = 'farmai-voice-preferences';
const defaults: VoicePreferences = { language: 'hi-IN', preferredGender: 'female', autoAlerts: true, volume: 0.9 };
let voiceError = '';
export function getVoicePreferences(): VoicePreferences {
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(PREF_KEY) || '{}') }; } catch { return defaults; }
}
export function saveVoicePreferences(preferences: VoicePreferences) { localStorage.setItem(PREF_KEY, JSON.stringify(preferences)); }
export function getAvailableVoices(): SpeechSynthesisVoice[] { return 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []; }
export function getPreferredVoice(language: SpeechLanguage = getVoicePreferences().language): SpeechSynthesisVoice | undefined {
  const voices = getAvailableVoices();
  const matches = voices.filter(v => v.lang.toLowerCase().startsWith(language.slice(0, 2)));
  if (!matches.length) return undefined;
  if (language === 'hi-IN' && getVoicePreferences().preferredGender === 'female') {
    const female = matches.find(v => /female|woman|lekha|kalpana|heera|veena/i.test(v.name));
    if (female) return female;
  }
  return matches.find(v => v.default) || matches[0];
}
export function getVoiceError() { return voiceError; }
export function speak(text: string, language: SpeechLanguage = getVoicePreferences().language): boolean {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) { voiceError = 'Speech playback is not supported on this device.'; return false; }
  const voices = getAvailableVoices();
  const voice = getPreferredVoice(language);
  if (!voice) { voiceError = `No ${language === 'hi-IN' ? 'Hindi' : 'English'} voice is available. Add a ${language === 'hi-IN' ? 'Hindi' : 'English'} speech voice in your device settings.`; return false; }
  voiceError = '';
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.volume = getVoicePreferences().volume;
  if (voice) utterance.voice = voice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
}
export function stop() { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }
export function pause() { if ('speechSynthesis' in window) window.speechSynthesis.pause(); }
export function resume() { if ('speechSynthesis' in window) window.speechSynthesis.resume(); }
export function listenForVoiceChanges(callback: () => void) {
  if (!('speechSynthesis' in window)) return () => {};
  window.speechSynthesis.addEventListener('voiceschanged', callback);
  return () => window.speechSynthesis.removeEventListener('voiceschanged', callback);
}
