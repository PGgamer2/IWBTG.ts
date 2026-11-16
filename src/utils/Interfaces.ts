export interface IDisposable {
    dispose(): void;
}

export interface InstanceFabric<T> {
    instantiate(): T;
}