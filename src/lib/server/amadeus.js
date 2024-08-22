import { AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } from '$env/static/private'
// @ts-ignore
import Amadeus from 'amadeus'

export const amadeus = new Amadeus({
    clientId: AMADEUS_CLIENT_ID,
    clientSecret: AMADEUS_CLIENT_SECRET,
    hotsname: 'test'
})