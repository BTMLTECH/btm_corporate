import crypto from 'crypto';

/**
 * Generates a random hashed string for use as a transaction reference.
 * @param prefix An optional prefix for the transaction reference.
 * @param length The desired length of the hashed string (default is 32).
 * @returns A hashed string to be used as a transaction reference.
 */
export function generateTransactionReference(prefix: string = 'TXN', length: number = 32): string {
  // Generate a random buffer
  const randomBytes = crypto.randomBytes(32);
  
  // Create a hash object
  const hash = crypto.createHash('sha256');
  
  // Update the hash with the random bytes
  hash.update(randomBytes);
  
  // Generate the hashed string
  const hashedString = hash.digest('hex');
  
  // Create the final transaction reference
  const txnRef = `${prefix}_${hashedString.slice(0, length)}`;
  
  return txnRef;
}

// Example usage
// const txnRef = generateTransactionReference('BTM_FLIGHT');
// console.log(txnRef); // Outputs something like: BTM_FLIGHT_8f4d8b3a1e9cb2e8d3b5f6a7c9d1e2f3