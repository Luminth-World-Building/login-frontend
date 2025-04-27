import ky from 'ky';

const KEYCLOAK_BASE_URL = 'http://luminth-keycloak-keycloak.apps-crc.testing';
const TOKEN_ENDPOINT = '/realms/luminth/protocol/openid-connect/token';
const CLIENT_ID = 'luminth-studio';

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  id_token: string;
  token_type: 'Bearer';
  expires_in: number;
}

export async function loginWithPassword(email: string, password: string): Promise<TokenResponse> {
  const params = new URLSearchParams();
  params.set('grant_type', 'password');
  params.set('client_id', CLIENT_ID);
  params.set('username', email);
  params.set('password', password);
  params.set('scope', 'openid');

  try {
    const res = await ky.post(KEYCLOAK_BASE_URL + TOKEN_ENDPOINT, {
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 8000,
    }).json<TokenResponse>();
    return res;
  } catch (err: any) {
    if (err.response) {
      // Keycloak error response
      const data = await err.response.json();
      throw new Error(data.error_description || data.error || 'Login failed');
    }
    throw new Error('Network error. Please try again.');
  }
}
