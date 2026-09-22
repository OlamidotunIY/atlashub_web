import type { ApiClient } from "../http";


export async function requestWsTicket(apiClient: ApiClient): Promise<string> {
    const response = await apiClient.post<{ status: boolean | string; data: { ticket: string } }>(
        '/ws/ticket',
        {}
    );

    if (!response.data.data?.ticket) {
        throw new Error('Failed to obtain WebSocket ticket');
    }

    return response.data.data.ticket;
}

export function buildAuthenticatedWsUrl(wsBaseUrl: string, ticket: string): string {
    const url = new URL(`${wsBaseUrl.replace(/\/$/, '')}/ws-events`);
    url.searchParams.set('ticket', ticket);
    return url.toString();
}