import type { SpeechLanguage } from './voiceService';
export type AlertPriority = 'CRITICAL' | 'WARNING' | 'INFO';
export type FarmerVoiceMessage = { text: string; english: string; priority: AlertPriority };
export function getFarmerVoiceMessage(event: 'Disease'|'SevereDisease'|'DangerousTemperature'|'Fire'|'Smoke'|'Irrigation'|'Weather'|'CameraOffline'|'CameraOnline'|'DeviceConnected'|'DeviceDisconnected'|'Captured'|'Healthy'|'PumpStarted'|'PumpStopped'|'Analysis', zone = 'Zone 2', crop = 'Tomato'): FarmerVoiceMessage {
  const messages: Record<typeof event, FarmerVoiceMessage> = {
    Disease: { text:`ध्यान दीजिए। आपके खेत के ${zone} में ${crop} की फसल में बीमारी पाई गई है। कृपया प्रभावित पौधों की जाँच करें और ज़्यादा प्रभावित पत्तियों को हटा दें।`, english:`Attention. A crop disease was found in ${crop} in ${zone}. Please check affected plants and remove badly affected leaves.`, priority:'WARNING' },
    SevereDisease: { text:`ध्यान दीजिए। आपके खेत के ${zone} में ${crop} की फसल में गंभीर बीमारी पाई गई है। कृपया प्रभावित पौधों की तुरंत जाँच करें और सुझाए गए उपाय करें।`, english:`Attention. A severe crop disease was detected in ${crop} in ${zone}. Inspect affected plants immediately and follow the recommended steps.`, priority:'CRITICAL' },
    DangerousTemperature: { text:`सावधान। आपके खेत में तापमान बहुत ज़्यादा है। कृपया फसल और पानी की स्थिति तुरंत जाँचें।`, english:'Warning. Field temperature is dangerously high. Check your crops and water supply immediately.', priority:'CRITICAL' },
    Fire: { text:`सावधान। आपके खेत के ${zone} में आग का खतरा पाया गया है। कृपया तुरंत खेत की जाँच करें और सुरक्षित स्थान पर रहें।`, english:`Warning. A fire hazard was detected in ${zone}. Check the field immediately and move to a safe place.`, priority:'CRITICAL' },
    Smoke: { text:`सावधान। आपके खेत के ${zone} में धुआँ पाया गया है। कृपया तुरंत जाँच करें।`, english:`Warning. Smoke was detected in ${zone}. Please check immediately.`, priority:'WARNING' },
    Irrigation: { text:'ध्यान दीजिए। आपके खेत की मिट्टी में नमी कम है। सिंचाई करने की सलाह दी जाती है।', english:'Your soil moisture is low. Irrigation is recommended.', priority:'WARNING' },
    Weather: { text:'मौसम की चेतावनी। कल भारी बारिश होने की संभावना है। अभी सिंचाई कम करने की सलाह दी जाती है।', english:'Weather warning. Heavy rain is possible tomorrow. Reduce irrigation for now.', priority:'WARNING' },
    CameraOffline: { text:`ध्यान दीजिए। ${zone} का कैमरा अभी बंद है। कृपया कैमरे की जाँच करें।`, english:`The camera in ${zone} is offline. Please check the camera.`, priority:'WARNING' },
    CameraOnline: { text:`${zone} का कैमरा अब चालू है।`, english:`The camera in ${zone} is now online.`, priority:'INFO' },
    DeviceConnected: { text:`${zone} अब जुड़ा हुआ है।`, english:`${zone} is now connected.`, priority:'INFO' },
    DeviceDisconnected: { text:`ध्यान दीजिए। ${zone} का कनेक्शन टूट गया है। कृपया उपकरण की जाँच करें।`, english:`Warning. ${zone} is disconnected. Please check the device.`, priority:'WARNING' },
    Captured: { text:`${zone} की फसल की तस्वीर ले ली गई है।`, english:`A crop image has been captured in ${zone}.`, priority:'INFO' },
    Healthy: { text:`${zone} में ${crop} की फसल स्वस्थ दिखाई दे रही है।`, english:`The ${crop} crop in ${zone} looks healthy.`, priority:'INFO' },
    PumpStarted: { text:'सिंचाई शुरू हो गई है। मिट्टी की नमी बढ़ने पर पंप अपने आप बंद हो जाएगा।', english:'Irrigation has started. The pump will stop automatically as soil moisture rises.', priority:'INFO' },
    PumpStopped: { text:'सिंचाई का पंप बंद कर दिया गया है।', english:'The irrigation pump has been turned off.', priority:'INFO' },
    Analysis: { text:`${zone} में ${crop} की फसल की जाँच पूरी हो गई है।`, english:`Crop analysis is complete for ${crop} in ${zone}.`, priority:'INFO' },
  };
  return messages[event];
}
export function localizeVoiceMessage(message: FarmerVoiceMessage, language: SpeechLanguage) { return language === 'hi-IN' ? message.text : message.english; }
