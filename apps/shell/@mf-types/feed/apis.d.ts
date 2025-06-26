
    export type RemoteKeys = 'feed/injector';
    type PackageType<T> = T extends 'feed/injector' ? typeof import('feed/injector') :any;