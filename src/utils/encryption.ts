// utils/encryption.ts
import { scrypt } from "@noble/hashes/scrypt";
import { utf8ToBytes } from "@noble/hashes/utils";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";

export async function compareHashedPassword(
  plainPassword: string,
  hashedPassword: string
) {
  // Parse stored hash parameters
  const [salt, hash] = hashedPassword.split(".");

  // Hash the input password with the same salt
  const hashBuffer = scrypt(utf8ToBytes(plainPassword), utf8ToBytes(salt), {
    N: 16384, // cost factor
    r: 8, // block size
    p: 1, // parallelization
    dkLen: 64, // output length
  });

  // Convert to hex for comparison
  const hashHex = bytesToHex(hashBuffer);

  // Use constant-time comparison to avoid timing attacks
  return constantTimeCompare(hashHex, hash);
}

// Implement our own constant-time comparison function
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    // XOR the character codes - if they're the same, the result is 0
    // Otherwise, it's non-zero. We OR all results together.
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  // If result is 0, all characters matched
  return result === 0;
}
