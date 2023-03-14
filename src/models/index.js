// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Plant, Check } = initSchema(schema);

export {
  Plant,
  Check
};