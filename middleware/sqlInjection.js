const sqlInjectionPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /(\%22)|(\")|(\%3C)|(<)|(\%3E)|(>)/i
];

export const detectSQLInjection = (input) => {
    for (let pattern of sqlInjectionPatterns) {
        if (pattern.test(input)) {
            return { type: 'SQL Injection', pattern: pattern.toString() };
        }
    }
    return null;
};
