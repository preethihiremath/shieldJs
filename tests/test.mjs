import sinon from 'sinon';
import securityMiddleware from '../middleware/index.js';
import { expect } from 'chai';

describe('Security Middleware', () => {
    // Test case 1: SQL Injection
    it('should detect SQL injection patterns in query parameters', () => {
        const req = {
            query: { user: "admin' --" },
            body: {}
        };
        const res = {};
        const next = sinon.spy();

        console.warn = sinon.spy();
        securityMiddleware(req, res, next);

        expect(console.warn.calledOnce).to.be.true;
        expect(console.warn.calledWithMatch(/Possible SQL injection detected/)).to.be.true;
        expect(console.warn.calledWithMatch(/Single quote character found/)).to.be.true;
        expect(next.calledOnce).to.be.true;
    });

    // Test case 2: XSS
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
        expect(console.warn.calledWithMatch(/Possible XSS attack detected/)).to.be.true;
        expect(console.warn.calledWithMatch(/Script tags found/)).to.be.true;
        expect(next.calledOnce).to.be.true;
    });

    // Test case 3: Safe inputs
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
