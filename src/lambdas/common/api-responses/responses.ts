import { APIGatewayProxyResult } from 'aws-lambda';

import { headers } from './headers';

export const responses = {
  _DefineResponse(statusCode = 502, body = {}): APIGatewayProxyResult {
    return {
      headers,
      statusCode,
      body: JSON.stringify(body ? body : null),
    };
  },

  /**
   * OK
   */
  _200(body = {}): APIGatewayProxyResult {
    return this._DefineResponse(200, body);
  },

  /**
   * No Content
   */
  _204(body = {}): APIGatewayProxyResult {
    return this._DefineResponse(204, body);
  },

  /**
   * Bad Request
   */
  _400(body = {}): APIGatewayProxyResult {
    return this._DefineResponse(400, body);
  },

  /**
   * Forbidden
   */
  _403(body = {}): APIGatewayProxyResult {
    return this._DefineResponse(403, body);
  },

  /**
   * Not Found
   */
  _404(body = {}): APIGatewayProxyResult {
    return this._DefineResponse(404, body);
  },

  /**
   * Conflict
   */
  _409(body = {}): APIGatewayProxyResult {
    return this._DefineResponse(409, body);
  },

  /**
   * Internal Server Error
   */
  _500(body = {}): APIGatewayProxyResult {
    return this._DefineResponse(500, body);
  },
};
