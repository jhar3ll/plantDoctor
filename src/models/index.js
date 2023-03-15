// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Plant, Waterings } = initSchema(schema);

export {
  Plant,
  Waterings
};