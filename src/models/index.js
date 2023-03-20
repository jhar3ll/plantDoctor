// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Plant, Watering } = initSchema(schema);

export {
  Plant,
  Watering
};