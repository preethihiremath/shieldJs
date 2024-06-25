import { detectSQLInjection } from './sqlInjection.js';
import { detectXSS } from './xss.js';
import chalk from 'chalk';
/**
 * Scans a given input for known security vulnerabilities (SQL Injection and XSS).
 * @param {string} input - The input string to be scanned for vulnerabilities.
 * @returns {Array} - An array of detected vulnerability objects, each containing the type and pattern.
 */
const scanForVulnerabilities = (input) => {
    const results = [];

    //Scan for SQ injection pattern
    const sqlInjectionResult = detectSQLInjection(input);
    if (sqlInjectionResult) {
        results.push(sqlInjectionResult);
    }
    //Scan for XS pattern
    const xssResult = detectXSS(input);
    if (xssResult) {
        results.push(xssResult);
    }
    const cryptoFailureResult = detectCryptoFailure(input);
    if (cryptoFailureResult) {
        results.push(...cryptoFailureResult);
    }
    const ssrfResult = detectSSRF(input);
    if (ssrfResult) {
        results.push(ssrfResult);
    }

    return results;
};
/**
 * Middleware function to scan incoming HTTP requests for security vulnerabilities.
 * It checks query parameters and request body for patterns of SQL Injection and XSS.
 * If vulnerabilities are detected, they are logged to the console.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function in the stack.
 */

export default (req, res, next) => {
    // Combine all query parameters and request body into a single array of inputs
    const inputs = [...Object.values(req.query), ...Object.values(req.body)];
    console.log(inputs); //to be removed after testing
    // Iterate over each input to scan for vulnerabilities
    inputs.forEach(input => {
        if (typeof input === 'string') {
            const detectedVulnerabilities = scanForVulnerabilities(input);
            detectedVulnerabilities.forEach(vulnerability => {
                console.warn(chalk.yellow(`WARN: Vulnerability detected: ${vulnerability.message} `));
                console.warn(chalk.yellow(`Input: ${vulnerability.input}`));
                console.warn( chalk.green(`Suggested fix: ${vulnerability.fix}`));
            });
        }
    });
 // Proceed to the next middleware or route handler
    next();
};