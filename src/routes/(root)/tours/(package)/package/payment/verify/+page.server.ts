import { LIVE_URL, LOCAL_URL } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, request, fetch }) => {
  const url = new URL(request.url);
  const response = url.searchParams.get("response") ?? "";

  if (response.length > 0) {
    try {
      let responseJson: {
        txRef: string;
        id: string;
        orderRef: string;
        flwRef: string;
      } = JSON.parse(response) as {
        txRef: string;
        id: string;
        orderRef: string;
        flwRef: string;
      };

      const req = await fetch(
        `${process.env.NODE_ENV === "production" ? LIVE_URL + "/payment/verify" : LOCAL_URL + "/payment/verify"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tx_ref: responseJson.txRef,
          }),
        }
      );

      const resp = await req.json();

      return {
        status: resp.data.status,
        txRef: resp.data.tx_ref,
        flwRef: resp.data.flw_ref,
        amount: resp.data.amount,
        currency: resp.data.currency,
        message: resp.data.processor_response,
        createdAt: resp.data.created_at,
        userData: {
          name: resp.data.name,
          email: resp.data.email,
        },
        user: locals.user
      };
    } catch (err: any) {
      return {
        message: "An error has occured",
        status: undefined,
        txRef: undefined,
        flwRef: undefined,
        amount: undefined,
        currency: undefined,
        createdAt: undefined,
        userData: {
          name: undefined,
          email: undefined,
        },
      };
    }
  }

  return {};
};
