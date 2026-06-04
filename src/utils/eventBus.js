const listeners = {};

export const subscribe = (event, cb) => {
  if (!listeners[event]) listeners[event] = new Set();
  listeners[event].add(cb);
  return () => listeners[event].delete(cb);
};

export const emit = (event, payload) => {
  const set = listeners[event];
  if (!set) return;
  set.forEach((cb) => {
    try {
      cb(payload);
    } catch (e) {
      console.log('EventBus listener error', e);
    }
  });
};

export default { subscribe, emit };