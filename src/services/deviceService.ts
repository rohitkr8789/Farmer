export type DeviceId = 'camera'|'soil'|'temperature'|'smoke'|'flame'|'pump';
export type DeviceStatus = 'connected'|'disconnected';
export type DeviceMap = Record<DeviceId, DeviceStatus>;
const initial: DeviceMap = { camera:'connected', soil:'connected', temperature:'connected', smoke:'connected', flame:'connected', pump:'connected' };
let statuses: DeviceMap = (() => { try { return { ...initial, ...JSON.parse(localStorage.getItem('farmai-devices') || '{}') }; } catch { return initial; } })();
const subscribers = new Set<(next: DeviceMap) => void>();
export function getDeviceStatus(): DeviceMap { return { ...statuses }; }
function publish() { localStorage.setItem('farmai-devices', JSON.stringify(statuses)); subscribers.forEach(fn => fn(getDeviceStatus())); }
export function connectDevice(device: DeviceId) { statuses = { ...statuses, [device]:'connected' }; publish(); }
export function disconnectDevice(device: DeviceId) { statuses = { ...statuses, [device]:'disconnected' }; publish(); }
export function subscribeToDeviceUpdates(callback:(next:DeviceMap)=>void) { subscribers.add(callback); return () => { subscribers.delete(callback); }; }
export function toggleDevice(device:DeviceId,status:DeviceStatus) { status === 'connected' ? connectDevice(device) : disconnectDevice(device); }
