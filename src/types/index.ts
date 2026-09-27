export type AlertKind = 'Disease'|'Fire'|'Smoke'|'Irrigation'|'Weather'|'Pest'|'Camera'|'Temperature'|'Device';
export interface FarmAlert { id:string; kind:AlertKind; title:string; message:string; zone:string; time:string; acknowledged:boolean; level:'red'|'yellow'|'green' }
export interface Field { id:string; name:string; crop:string; acres:number; location:string; health:number; zones:number }
