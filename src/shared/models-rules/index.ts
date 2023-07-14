import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
  return request.user && request.user.id;
}

export function getOrderIdFromRequest(request: {
  order: { id: string };
}): string {
  return request.order && request.order.id;
}
