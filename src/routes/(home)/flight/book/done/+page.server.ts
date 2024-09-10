import { error } from "@sveltejs/kit";

interface FlutterwaveResponse {
	id: number;
	txRef: string;
	flwRef: string;
	deviceFingerprint: string;
	amount: number;
	chargedAmount: number;
	appfee: number;
	merchantfee: number;
	processorResponse: string;
	authModel: string;
	currency: string;
	ip: string;
	narration: string;
	status: string;
	paymentType: string;
	fraudStatus: string;
	createdAt: string;
	accountId: number;
	customer: {
	  id: number;
	  fullName: string;
	  email: string;
	  phoneNumber: string | null;
	  createdAt: string;
	};
	[key: string]: any; // For any additional fields
  }
  
  function parseFlutterwaveResponse(url: URL): FlutterwaveResponse {
	try {
	  const responseParam = url.searchParams.get('response');
	  if (!responseParam) {
		throw new Error('No response parameter found in URL');
	  }
  
	  const decodedResponse = decodeURIComponent(responseParam);
	  const parsedResponse = JSON.parse(decodedResponse) as FlutterwaveResponse;
  
	  // Validate and transform the parsed response
	  return {
		id: parsedResponse.id,
		txRef: parsedResponse.txRef,
		flwRef: parsedResponse.flwRef,
		deviceFingerprint: parsedResponse.device_fingerprint,
		amount: parsedResponse.amount,
		chargedAmount: parsedResponse.charged_amount,
		appfee: parsedResponse.appfee,
		merchantfee: parsedResponse.merchantfee,
		processorResponse: parsedResponse.chargeResponseMessage,
		authModel: parsedResponse.authModelUsed,
		currency: parsedResponse.currency,
		ip: parsedResponse.IP,
		narration: parsedResponse.narration,
		status: parsedResponse.status,
		paymentType: parsedResponse.paymentType,
		fraudStatus: parsedResponse.fraud_status,
		createdAt: parsedResponse.createdAt,
		accountId: parsedResponse.AccountId,
		customer: {
		  id: parsedResponse.customer.id,
		  fullName: parsedResponse.customer.fullName,
		  email: parsedResponse.customer.email,
		  phoneNumber: parsedResponse.customer.phoneNumber,
		  createdAt: parsedResponse.customer.createdAt
		},
		// Include any other fields you need
	  };
	} catch (err) {
	  console.error('Error parsing Flutterwave response:', err);
	  throw error(400, 'Invalid Flutterwave response');
	}
  }
  
  // Usage in +page.server.ts
  export const load = async ({ url }) => {
	try {
	  const flutterwaveResponse = parseFlutterwaveResponse(url);

	  console.log(flutterwaveResponse)
	  // Use the parsed response data as needed
	  return {
		flutterwaveResponse
	  };
	} catch (err) {
	  // Handle the error appropriately
	  console.error('Error in load function:', err);
	  throw error(400, 'Failed to process payment response');
	}
  };

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const flightData = form.get('flightData') as string;

		console.log('dfgh', flightData);

		return {};
	}
};
