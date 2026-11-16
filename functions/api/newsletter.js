const buttondownEndpoint = 'https://api.buttondown.com/v1/subscribers';

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function messageFor(status, result) {
  if (result?.code === 'email_invalid') return 'Confira o endereço de e-mail e tente novamente.';
  if (status === 429) return 'Muitas tentativas agora. Aguarde um pouco e tente novamente.';
  if (status >= 500) return 'O serviço de newsletter está temporariamente indisponível.';
  return 'Não foi possível concluir a inscrição. Tente novamente.';
}

export async function onRequestPost(context) {
  const form = await context.request.formData();
  const email = String(form.get('email') || '').trim().toLowerCase();
  const website = String(form.get('website') || '').trim();

  if (website) return json({ok: true});
  if (!context.env.BUTTONDOWN_API_KEY) {
    return json({message: 'A newsletter ainda não está configurada.'}, 503);
  }
  if (!email || email.length > 254 || !/^\S+@\S+\.\S+$/.test(email)) {
    return json({message: 'Confira o endereço de e-mail e tente novamente.'}, 400);
  }

  const ipAddress = context.request.headers.get('CF-Connecting-IP');
  const referrer = context.request.headers.get('Referer');
  const payload = {
    email_address: email,
    tags: ['livro'],
    type: 'regular',
    utm_source: 'desenhando-confianca',
    utm_medium: 'site',
  };

  if (ipAddress) payload.ip_address = ipAddress;
  if (referrer) payload.referrer_url = referrer;

  const response = await fetch(buttondownEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Token ${context.env.BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json',
      'X-Buttondown-Collision-Behavior': 'add',
    },
    body: JSON.stringify(payload),
  });

  let result = {};
  try {
    result = await response.json();
  } catch {
    result = {};
  }

  if (!response.ok) return json({message: messageFor(response.status, result)}, response.status);
  return json({ok: true}, 201);
}

export function onRequestGet() {
  return json({message: 'Método não permitido.'}, 405);
}

export function onRequestPut() {
  return json({message: 'Método não permitido.'}, 405);
}

export function onRequestPatch() {
  return json({message: 'Método não permitido.'}, 405);
}

export function onRequestDelete() {
  return json({message: 'Método não permitido.'}, 405);
}