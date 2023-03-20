import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerWatering = {
  readonly waterDate?: string | null;
  readonly waterCount?: number | null;
}

type LazyWatering = {
  readonly waterDate?: string | null;
  readonly waterCount?: number | null;
}

export declare type Watering = LazyLoading extends LazyLoadingDisabled ? EagerWatering : LazyWatering

export declare const Watering: (new (init: ModelInit<Watering>) => Watering)

type EagerPlant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Plant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly waterFrequency: number;
  readonly owner: string;
  readonly waterings?: (Watering | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Plant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly waterFrequency: number;
  readonly owner: string;
  readonly waterings?: (Watering | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Plant = LazyLoading extends LazyLoadingDisabled ? EagerPlant : LazyPlant

export declare const Plant: (new (init: ModelInit<Plant>) => Plant) & {
  copyOf(source: Plant, mutator: (draft: MutableModel<Plant>) => MutableModel<Plant> | void): Plant;
}