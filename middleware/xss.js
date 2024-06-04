const xssPatterns = [
    /<script.*?>.*?<\/script>/i,
    /<.*?on.*?=.*?>/i
];

export const detectXSS = (input) => {
    for (let pattern of xssPatterns) {
        if (pattern.test(input)) {
            return { type: 'XSS', pattern: pattern.toString() };
        }
    }
    return null;
};
