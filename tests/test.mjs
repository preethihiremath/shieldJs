 //imported for assertions
import sinon from 'sinon'; //imported for creating spies and mocks
import securityMiddleware from '../middleware/index.js';

import { expect } from 'chai';

//descibe groups releated test cases
describe('Security Middleware', () => {
    it('should detect SQL injection patterns in query parameters', () => {
        const req = {
            query: { user: "admin' --" },
            body: {}
        };
        const res = {};
        const next = sinon.spy();

        console.warn = sinon.spy(); //to verify that the middleware logs a warning.
        securityMiddleware(req, res, next);

        expect(console.warn.calledOnce).to.be.true; //calledonce
        expect(console.warn.calledWithMatch(/Vulnerabilities detected/)).to.be.true; //calledwithmatch
        expect(next.calledOnce).to.be.true; //next calledonce
    });
     // Test case 2 : XSS
    it('should detect XSS patterns in request body', () => {
        const req = {
            query: {},
            body: { content: '<script>alert("XSS")</script>' }
        };
        const res = {};
        const next = sinon.spy();

        console.warn = sinon.spy();
        securityMiddleware(req, res, next);

        expect(console.warn.calledOnce).to.be.true;
        expect(console.warn.calledWithMatch(/Vulnerabilities detected/)).to.be.true;
        expect(next.calledOnce).to.be.true;
    });

    it('should call next() without warnings for safe inputs', () => {
        const req = {
            query: { user: 'safeUser' },
            body: { content: 'Hello, world!' }
        };
        const res = {};
        const next = sinon.spy();

        console.warn = sinon.spy();
        securityMiddleware(req, res, next);

        expect(console.warn.notCalled).to.be.true;
        expect(next.calledOnce).to.be.true;
    });
});
