// Polar license-key deactivate 프록시 (Vercel Serverless Function)
// 플러그인은 secret 토큰을 담을 수 없으므로, deactivate(license_keys:write 필요)만 서버 경유.
// activate/validate는 플러그인이 customer-portal 무인증 엔드포인트로 직접 호출한다.
//
// 필요한 Vercel 환경변수:
//   POLAR_ACCESS_TOKEN  — license_keys:write 스코프 토큰 (secret)
//   POLAR_ORG_ID        — organization id
//   POLAR_API_BASE      — (선택) 기본 https://api.polar.sh / sandbox: https://sandbox-api.polar.sh

export const config = { runtime: 'nodejs' };

export default async function handler(req: any, res: any) {
  // CORS — CEP 패널(file:// origin)에서 호출
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }

  const token = process.env.POLAR_ACCESS_TOKEN;
  const orgId = process.env.POLAR_ORG_ID;
  const apiBase = process.env.POLAR_API_BASE || 'https://api.polar.sh';
  if (!token || !orgId) { res.status(500).json({ error: 'server_misconfigured' }); return; }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const key = body?.key;
  const activationId = body?.activation_id;
  if (!key || !activationId) { res.status(400).json({ error: 'missing_params' }); return; }

  try {
    const r = await fetch(`${apiBase}/v1/license-keys/deactivate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ key, organization_id: orgId, activation_id: activationId }),
    });
    if (r.status === 204 || r.ok) { res.status(200).json({ success: true }); return; }
    const text = await r.text();
    res.status(r.status).json({ success: false, detail: text.slice(0, 300) });
  } catch {
    res.status(502).json({ success: false, error: 'upstream_error' });
  }
}
