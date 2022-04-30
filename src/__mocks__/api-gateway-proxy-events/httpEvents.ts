import { APIGatewayProxyEvent } from 'aws-lambda';

type APIGatewayProxyEventCreationObject = {
  body?: Record<string, unknown>;
  path?: string;
  pathParameters?: Record<string, string>;
  queryStringParameters?: Record<string, string>;
};

const eventDefault: APIGatewayProxyEvent = {
  body: null,
  headers: {},
  multiValueHeaders: {},
  httpMethod: '',
  isBase64Encoded: false,
  path: '',
  pathParameters: {},
  queryStringParameters: {},
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {
    accountId: '',
    apiId: '',
    authorizer: {},
    httpMethod: '',
    identity: {
      accessKey: '',
      accountId: '',
      apiKey: '',
      apiKeyId: '',
      caller: '',
      clientCert: null,
      cognitoAuthenticationProvider: '',
      cognitoAuthenticationType: '',
      cognitoIdentityId: '',
      cognitoIdentityPoolId: '',
      principalOrgId: '',
      sourceIp: '',
      user: '',
      userAgent: '',
      userArn: '',
    },
    path: '',
    protocol: '',
    requestId: '',
    requestTimeEpoch: 0,
    resourceId: '',
    resourcePath: '',
    stage: 'local',
  },
  resource: '',
};

const httpAPIGatewayProxyEvent = ({
  body = {},
  httpMethod,
  path = '',
  pathParameters = {},
  queryStringParameters = {},
}: APIGatewayProxyEventCreationObject & {
  httpMethod: string;
}): APIGatewayProxyEvent => {
  return {
    ...eventDefault,
    body: body ? JSON.stringify(body) : null,
    httpMethod,
    path,
    pathParameters,
    queryStringParameters,
  };
};

type MockEventFunc = (creationObject?: APIGatewayProxyEventCreationObject) => APIGatewayProxyEvent;

const httpGet: MockEventFunc = (creationObject = {}) => {
  return httpAPIGatewayProxyEvent({
    ...creationObject,
    httpMethod: 'GET',
  });
};

const httpPost: MockEventFunc = (creationObject = {}) => {
  return httpAPIGatewayProxyEvent({
    ...creationObject,
    httpMethod: 'POST',
  });
};

const httpPut: MockEventFunc = (creationObject = {}) => {
  return httpAPIGatewayProxyEvent({
    ...creationObject,
    httpMethod: 'PUT',
  });
};

const httpDelete: MockEventFunc = (creationObject = {}) => {
  return httpAPIGatewayProxyEvent({
    ...creationObject,
    httpMethod: 'DELETE',
  });
};

export const httpEvents = {
  GET: httpGet,
  POST: httpPost,
  PUT: httpPut,
  DELETE: httpDelete,
};
