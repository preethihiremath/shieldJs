import chalk from 'chalk';
import crypto from 'crypto'; // Node.js built-in crypto module
import CryptoJS from 'crypto-js'; // npm module for cryptographic functions

/**
 * Detects cryptographic failures based on input.
 * @param {string} input - The input string to be scanned for cryptographic vulnerabilities.
 * @returns {Array} - An array of detected vulnerability objects.
 */
export const detectCryptoFailure = (input) => {
    const results = [];

    // Common cryptographic vulnerabilities patterns and checks
    const patterns = [
        {
            pattern: /(crypto\.createCipher)/,
            message: "Insecure cryptographic function detected: crypto.createCipher",
            fix: "Use crypto.createCipheriv or a more secure alternative like AES-GCM for encryption.",
        },
        {
            pattern: /(MD5|SHA1)/,
            message: "Insecure hashing algorithm detected: MD5 or SHA1",
            fix: "Use stronger hashing algorithms like SHA-256 or SHA-3 for better security.",
        },
        {
            pattern: /(Math\.random\(\))/,
            message: "Insecure random number generation detected: Math.random()",
            fix: "Use crypto.randomBytes() or window.crypto.getRandomValues() for secure random number generation.",
        },
        {
            pattern: /(ECDSA|DSA)/,
            message: "Insecure digital signature algorithm detected: ECDSA or DSA",
            fix: "Prefer stronger digital signature algorithms like RSA or ECC with appropriate key lengths.",
        },
        {
            pattern: /(AES-ECB)/,
            message: "Insecure mode of operation detected: AES-ECB",
            fix: "Use AES-GCM, AES-CBC, or other authenticated encryption modes instead of AES-ECB.",
        },
        {
            pattern: /(base64|atob|btoa)/,
            message: "Insecure encoding/decoding function detected: base64, atob, or btoa",
            fix: "Use secure encoding methods like Base64url or Buffer.from() for data encoding/decoding.",
        },
        {
            // Example of custom check using crypto-js library
            pattern: /CryptoJS\.MD5\(/,
            message: "Insecure hashing function detected: CryptoJS.MD5",
            fix: "Prefer using CryptoJS.SHA256 or stronger hashing functions from CryptoJS.",
        },
        {
            // Example of custom check using Node.js built-in crypto module
            pattern: /crypto\.createHash\(['"]md5['"]\)/i,
            message: "Insecure hashing function detected: crypto.createHash('md5')",
            fix: "Use crypto.createHash('sha256') or stronger hashing algorithms provided by Node.js crypto module.",
        },
        {
            // Example of custom check using Node.js crypto module for randomBytes
            pattern: /crypto\.randomBytes\(/,
            message: "Insecure random bytes generation detected: crypto.randomBytes",
            fix: "Ensure crypto.randomBytes() is used with sufficient length and securely managed.",
        },
    ];

    patterns.forEach(({ pattern, message, fix }) => {
        if (pattern.test(input)) {
            results.push({
                type: 'Cryptographic Failure',
                message,
                fix,
                input
            });
        }
    });

    return results.length > 0 ? results : null;
};
