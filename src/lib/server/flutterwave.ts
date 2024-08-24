import { FLW_PUBLIC_KEY, FLW_SECRET_KEY } from '$env/static/private';
/// @ts-ignore
import Flutterwave from 'flutterwave-node-v3';

export const flutterwave = new Flutterwave(FLW_PUBLIC_KEY, FLW_SECRET_KEY);
