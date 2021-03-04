encodedHeader = base64urlEncode(header);
/* Result */
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"

const encodedPayload = base64urlEncode(payload);
/* Result */
"eyJ1c2VySWQiOiJhYmNkMTIzNDVnaGlqayIsInVzZXJuYW1lIjoiYmV6a29kZXIiLCJlbWFpbCI6ImNvbnRhY3RAYmV6a29kZXIuY29tIn0"

const data = encodedHeader + "." + encodedPayload;
const hashedData = Hash(data, secret);
const signature = base64urlEncode(hashedData);
/* Result */
"crrCKWNGay10ZYbzNG3e0hfLKbL7ktolT7GqjUMwi3k"

// header.payload.signature
const JWT = encodedHeader + "." + encodedPayload + "." + signature;
