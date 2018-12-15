/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Waves {
  auth(...args);
  on(...args);
  publicState(...args);
  signAndPublishCancelOrder(...args);
  signAndPublishOrder(...args);
  signAndPublishTransaction(...args);
  signBytes(...args);
  signCancelOrder(...args);
  signOrder(...args);
  signRequest(...args);
  signTransaction(...args);
}

interface Window {
  Waves: Waves;
}
