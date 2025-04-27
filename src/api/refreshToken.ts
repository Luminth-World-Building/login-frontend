import ky from 'ky';

const KEYCLOAK_BASE_URL = 'http://luminth-keycloak-keycloak.apps-crc.testing';
const TOKEN_ENDPOINT = '/realms/luminth/protocol/openid-connect/token';
const CLIENT_ID = 'luminth-studio';

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  id_token: string;
  token_type: 'Bearer';
  expires_in: number;
}

export async function refreshAccessToken(refreshToken: string): Promise<RefreshResponse> {
  const params = new URLSearchParams();
  params.set('grant_type', 'refresh_token');
  params.set('client_id', CLIENT_ID);
  params.set('refresh_token', refreshToken);

  try {
    const res = await ky.post(KEYCLOAK_BASE_URL + TOKEN_ENDPOINT, {
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 8000,
    }).json<RefreshResponse>();
    return res;
  } catch (err: any) {
    if (err.response) {
      const data = await err.response.json();
      throw new Error(data.error_description || data.error || 'Token refresh failed');
    }
    throw new Error('Network error. Please try again.');
  }
}
