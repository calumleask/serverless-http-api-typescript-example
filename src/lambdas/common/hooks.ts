import { APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult } from 'aws-lambda';
import { useHooks, logEvent, parseEvent, handleUnexpectedError, Hook } from 'lambda-hooks';
import { AnyObjectSchema } from 'yup';

import Responses from '~/lambdas/common/api-responses';

type AWSBody = Obj | null;
type AWSPathParams = Obj | null;
type AWSQueryStringParams = Obj | null;
type AWSEvent<TBody extends AWSBody, TPathParams extends AWSPathParams, TQueryStringParams extends AWSQueryStringParams> = APIGatewayProxyEvent & {
  body: TBody;
  pathParameters: TPathParams;
  queryStringParameters: TQueryStringParams;
};
type AWSContext = APIGatewayEventRequestContext;

type Lambda = (event: APIGatewayProxyEvent, context?: APIGatewayEventRequestContext) => Promise<APIGatewayProxyResult>;
export type LambdaHandler<TBody extends AWSBody = null, TPathParams extends AWSPathParams = null, TQueryStringParams extends AWSQueryStringParams = null> = (
  event: AWSEvent<TBody, TPathParams, TQueryStringParams>,
  context: AWSContext,
) => Promise<APIGatewayProxyResult>;

const validateEventBody: Hook = async state => {
  const { bodySchema } = state.config;

  if (!bodySchema) {
    throw Error('missing required bodySchema for validation');
  }

  try {
    const { event } = state;
    await bodySchema.validate(event.body, { strict: true });
  } catch (error) {
    console.log(`yup error validating event.body: ${error}`);
    state.exit = true;
    state.response = Responses._400({ error: error.message });
  }

  return state;
};

const validateEventPath: Hook = async state => {
  const { pathSchema } = state.config;

  if (!pathSchema) {
    throw Error('missing required pathSchema for validation');
  }

  try {
    const { event } = state;
    await pathSchema.validate(event.pathParameters, { strict: true });
  } catch (error) {
    console.log(`yup error validating event.pathParameters: ${error}`);
    state.exit = true;
    state.response = Responses._400({ error: error.message });
  }

  return state;
};

const validateEventQueryString: Hook = async state => {
  const { queryStringSchema } = state.config;

  if (!queryStringSchema) {
    throw Error('missing required queryStringSchema for validation');
  }

  try {
    const { event } = state;
    await queryStringSchema.validate(event.queryStringParameters, {
      strict: true,
    });
  } catch (error) {
    console.log(`yup error validating event.queryStringParameters: ${error}`);
    state.exit = true;
    state.response = Responses._400({ error: error.message });
  }

  return state;
};

type WithHooksConfig = {
  bodySchema?: AnyObjectSchema;
  pathSchema?: AnyObjectSchema;
  queryStringSchema?: AnyObjectSchema;
};
type WithHooks = <TBody extends AWSBody, TPathParams extends AWSPathParams, TQueryStringParams extends AWSQueryStringParams>(
  handler: LambdaHandler<TBody, TPathParams, TQueryStringParams>,
  config?: WithHooksConfig,
) => Lambda;

export const withHooks: WithHooks = (handler, config) =>
  useHooks(
    {
      before: [
        logEvent,
        parseEvent,
        ...(config?.bodySchema ? [validateEventBody] : []),
        ...(config?.pathSchema ? [validateEventPath] : []),
        ...(config?.queryStringSchema ? [validateEventQueryString] : []),
      ],
      after: [],
      onError: [handleUnexpectedError],
    },
    config,
  )(handler);
