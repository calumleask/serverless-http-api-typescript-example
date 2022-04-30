import { APIGatewayProxyResult } from 'aws-lambda';

import { handler as hello } from '~/lambdas/endpoints/hello';

import { httpEvents } from '~/__mocks__/api-gateway-proxy-events';
import { isApiGatewayResponse } from '~/__utils__/isApiGatewayResponse';

describe('create game http endpoint test', () => {
  let res: APIGatewayProxyResult;

  describe('when passed no name', () => {
    beforeEach(async () => {
      res = await hello(httpEvents.GET());
    });

    test('it should return an API Gateway response', async () => {
      expect(res).toBeDefined();
      expect(isApiGatewayResponse(res)).toBe(true);
    });

    test('it should return a 200', async () => {
      expect(res.statusCode).toBe(200);
    });

    test('it should return a message', async () => {
      const body = JSON.parse(res.body);
      expect(typeof body.message).toBe('string');
    });
  });

  describe('when passed a name', () => {
    const name = 'Calum';

    beforeEach(async () => {
      res = await hello(
        httpEvents.GET({
          queryStringParameters: { name },
        }),
      );
    });

    test('it should take an empty body and return an API Gateway response', async () => {
      expect(res).toBeDefined();
      expect(isApiGatewayResponse(res)).toBe(true);
    });

    test('it should return a 200', async () => {
      expect(res.statusCode).toBe(200);
    });

    test('it should contain the name in the message', async () => {
      const body = JSON.parse(res.body);
      expect(body.message).toContain(name);
    });
  });
});
