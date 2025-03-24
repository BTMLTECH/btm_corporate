import { error, json } from "@sveltejs/kit";

interface FlutterwaveResponse {
  id: number;
  tx_ref: string;
  flw_ref: string;
  device_fingerprint: string;
  amount: number;
  charged_amount: number;
  app_fee: number;
  merchant_fee: number;
  processor_response: string;
  auth_model: string;
  currency: string;
  ip: string;
  narration: string;
  status: string;
  payment_type: string;
  fraud_status: string;
  created_at: string;
  account_id: number;
//   customer: {
//     id: number;
//     name: string;
//     email: string;
//     phone_number: string | null;
//     created_at: string;
//   };
  [key: string]: any; // For any additional fields
}

function parseFlutterwaveResponse(url: URL): Partial<FlutterwaveResponse> {
  try {
    const responseParam = url.searchParams.get("response");

    if (!responseParam) {
      // return json({status: "success"})
      throw new Error("No response parameter found in URL");
    }

    const decodedResponse = decodeURIComponent(responseParam);
    const parsedResponse = JSON.parse(decodedResponse) as Partial<FlutterwaveResponse>;

    // Validate and transform the parsed response
    return {
      id: parsedResponse.id,
      tx_ref: parsedResponse.tx_ref,
      flw_ref: parsedResponse.flw_ref,
      device_fingerprint: parsedResponse.device_fingerprint,
      amount: parsedResponse.amount,
      charged_amount: parsedResponse.charged_amount,
      app_fee: parsedResponse.app_fee,
      merchant_fee: parsedResponse.merchant_fee,
      processor_response: parsedResponse.processor_response,
      auth_model: parsedResponse.auth_model,
      currency: parsedResponse.currency,
      ip: parsedResponse.ip,
      narration: parsedResponse.narration,
      status: parsedResponse.status,
      payment_type: parsedResponse.payment_type,
      fraud_status: parsedResponse.fraud_status,
      created_at: parsedResponse.created_at,
      account_id: parsedResponse.account_id,
    //   customer: {
    //     id: parsedResponse.customer.id,
    //     name: parsedResponse.customer.name,
    //     email: parsedResponse.customer.email,
    //     phone_number: parsedResponse.customer.phone_number,
    //     created_at: parsedResponse.customer.created_at,
    //   },
      // Include any other fields you needq
    };
  } catch (err) {
    console.error("Error parsing Flutterwave response:", err);
    throw error(400, "Invalid Flutterwave response");
  }
}

// Usage in +page.server.ts
export const load = async ({ url }) => {
  // try {
  //   const flutterwaveResponse = parseFlutterwaveResponse(url);

  //   // console.log("FLW", flutterwaveResponse);
  //   // Use the parsed response data as needed
  //   return {
  //     flutterwaveResponse,
  //   };
  // } catch (err) {
  //   // Handle the error appropriately
  //   console.error("Error in load function:", err);
  //   throw error(400, "Failed to process payment response");
  // }

  return {}
};

// export const actions = {
//   default: async ({ request }) => {
//     const form = await request.formData();
//     const flightData = form.get("flightData") as string;

//     console.log("dfgh", flightData);

//     return {};
//   },
// };
