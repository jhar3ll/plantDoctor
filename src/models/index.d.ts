import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerWaterings = {
  readonly wateringCount?: number | null;
  readonly wateringDate?: string | null;
}

type LazyWaterings = {
  readonly wateringCount?: number | null;
  readonly wateringDate?: string | null;
}

export declare type Waterings = LazyLoading extends LazyLoadingDisabled ? EagerWaterings : LazyWaterings

export declare const Waterings: (new (init: ModelInit<Waterings>) => Waterings)

type EagerPlant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Plant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly waterFrequency: number;
  readonly owner: string;
  readonly waterings?: (Waterings | null)[] | null;
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
  readonly waterings?: (Waterings | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Plant = LazyLoading extends LazyLoadingDisabled ? EagerPlant : LazyPlant

export declare const Plant: (new (init: ModelInit<Plant>) => Plant) & {
  copyOf(source: Plant, mutator: (draft: MutableModel<Plant>) => MutableModel<Plant> | void): Plant;
}