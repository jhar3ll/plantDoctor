import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerCheck = {
  readonly id?: string | null;
  readonly date?: string | null;
  readonly checked: boolean;
}

type LazyCheck = {
  readonly id?: string | null;
  readonly date?: string | null;
  readonly checked: boolean;
}

export declare type Check = LazyLoading extends LazyLoadingDisabled ? EagerCheck : LazyCheck

export declare const Check: (new (init: ModelInit<Check>) => Check)

type EagerPlant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Plant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly waterFrequency: number;
  readonly owner: string;
  readonly history?: (Check | null)[] | null;
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
  readonly history?: (Check | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Plant = LazyLoading extends LazyLoadingDisabled ? EagerPlant : LazyPlant

export declare const Plant: (new (init: ModelInit<Plant>) => Plant) & {
  copyOf(source: Plant, mutator: (draft: MutableModel<Plant>) => MutableModel<Plant> | void): Plant;
}