export type ChannelEventMap = {
  'auth-channel': {
    'auth-change': boolean;
  };
  'feed-channel': {
    'feed-update': { id: string; data: any };
  };
};

export type ChannelName = keyof ChannelEventMap;

export class BroadcastChannelEventBus<C extends ChannelName> {
  private channel: BroadcastChannel;
  // 각 채널의 이벤트 맵을 자동 타입 추론!
  private listeners: {
    [K in keyof ChannelEventMap[C]]?: ((payload: ChannelEventMap[C][K]) => void)[];
  } = {};

  constructor(channelName: C) {
    this.channel = new BroadcastChannel(channelName);
    this.channel.onmessage = (ev: MessageEvent) => {
      const { event, payload } = ev.data as { event: keyof ChannelEventMap[C]; payload: any };
      this.emitLocal(event, payload);
    };
  }

  private emitLocal<K extends keyof ChannelEventMap[C]>(event: K, payload: ChannelEventMap[C][K]) {
    (this.listeners[event] || []).forEach((listener) => listener(payload));
  }

  emit<K extends keyof ChannelEventMap[C]>(event: K, payload: ChannelEventMap[C][K]) {
    this.emitLocal(event, payload);
    this.channel.postMessage({ event, payload });
  }

  on<K extends keyof ChannelEventMap[C]>(
    event: K,
    listener: (payload: ChannelEventMap[C][K]) => void,
  ) {
    if (!this.listeners[event]) this.listeners[event] = [];
    (this.listeners[event] as ((payload: ChannelEventMap[C][K]) => void)[]).push(listener);
  }

  off<K extends keyof ChannelEventMap[C]>(
    event: K,
    listener: (payload: ChannelEventMap[C][K]) => void,
  ) {
    this.listeners[event] = (
      this.listeners[event] as ((payload: ChannelEventMap[C][K]) => void)[]
    ).filter((l) => l !== listener);
  }

  close() {
    this.channel.close();
  }
}
