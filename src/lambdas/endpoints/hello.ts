import * as yup from 'yup';

import { withHooks, LambdaHandler } from '~/lambdas/common/hooks';
import Responses from '~/lambdas/common/api-responses';

type QueryStringParams = {
  name?: string;
};

const queryStringSchema = yup.object().shape({
  name: yup.string().notRequired(),
});

const _handler: LambdaHandler<null, null, QueryStringParams> = async event => {
  const { name } = event.queryStringParameters;

  return Responses._200({
    message: name ? `Hello ${name}` : 'Hello',
  });
};

export const handler = withHooks(_handler, { queryStringSchema });
