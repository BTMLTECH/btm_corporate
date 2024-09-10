import { json, type RequestHandler } from '@sveltejs/kit';
import { flutterwave } from '$lib/server/flutterwave';
import { FLW_SECRET_KEY, FLW_ENC_KEY } from '$env/static/private';
import crypto from 'crypto';
import { generateTransactionReference } from '$lib/server/utils/transactionRef';

interface PaymentPayload {
  card_number: string;
  cvv: string;
  expiry_month: string;
  expiry_year: string;
  amount: string;
  currency: string;
  fullname: string;
  email: string;
  tx_ref: string;
  redirect_url: string;
  enckey: string;
  authorization?: {
    mode: string;
    [key: string]: string | number;
  };
}

function createPayloadHash(amount: string, currency: string, email: string, txRef: string): string {
  const hashedSecretKey = crypto.createHash('sha256').update(FLW_SECRET_KEY, 'utf8').digest('hex');
  const stringToHash = amount + currency + email + txRef + hashedSecretKey;
  return crypto.createHash('sha256').update(stringToHash, 'utf8').digest('hex');
}

async function handleCardCharge(payload: PaymentPayload) {
  try {
    const resp = await flutterwave.Charge.card(payload);
    
    if (!resp) {
      return json({ data: null, status: 'error', message: 'An error has occurred' }, { status: 400 });
    }

	console.log("jhgftyh", resp)

    if (resp.status === 'success') {
      switch (resp.meta && resp.meta.authorization.mode) {
        case 'pin':
          return json(resp);
        case 'redirect':
          return json({ redirect_url: resp.meta.authorization.redirect }, { status: 301 });
        case 'avs_noauth':
          return json({
            data: null,
            status: 'required',
            meta: {
              authorization: {
                mode: 'avs_noauth',
                fields: ['city', 'address', 'state', 'country', 'zipcode']
              }
            }
          }, { status: 400 });
      }
    }

	console.log("respons ", resp)
    return json({ data: resp.data, status: resp.status }, { status: resp.status === 'success' ? 200 : 400 });
  } catch (err) {
    console.error('Error in handleCardCharge:', err);
    return json({ data: null, status: 'error', message: 'An unexpected error occurred' }, { status: 500 });
  }
}

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const payload: PaymentPayload = {
    card_number: form.get('card_number') as string,
    cvv: form.get('cvv') as string,
    expiry_month: form.get('month') as string,
    expiry_year: (form.get('year') as string)?.slice(2),
    amount: '1',
    currency: 'USD',
    fullname: form.get('fullname') as string,
    email: 'oluwatobi.agunloye@btmlimited.net',
    tx_ref: generateTransactionReference("BTM_FLIGHT_TXN"),
    redirect_url: 'http://127.0.0.1:5173/flight/book',
    enckey: FLW_ENC_KEY
  };

  const mode = form.get('mode') as string;
  const updatePayment = form.get('updatePayment') as string;

  if (mode === 'pin') {
    payload.authorization = {
      mode: 'pin',
      pin: parseInt(form.get('pin') as string)
    };
  }

  if (updatePayment === 'true') {
    payload.authorization = {
      mode: 'avs_noauth',
      city: form.get('city') as string,
      address: form.get('address') as string,
      state: form.get('state') as string,
      country: form.get('country') as string,
      zipcode: form.get('zipCode') as string
    };
  }

  const payloadHash = createPayloadHash(payload.amount, payload.currency, payload.email, payload.tx_ref);
  console.log('Payload hash:', payloadHash);

  return handleCardCharge(payload);
};