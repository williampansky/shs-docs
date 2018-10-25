/**
 * @description
 * This module defines and exports an Auth service class
 */

/**
 * @summary Auth0Lock module
 * @see https://auth0.com/docs/libraries/lock/v11
 */
import Auth0Lock from 'auth0-lock';
import deepmerge from '@/util/deepmerge';


/**
 * @summary Class constant mapping various Lock configuration options for the different supported types
 */
const TYPE_OPTIONS = {
    login: {
        closable: false,
        autoclose: true,
        auth: {
            sso: false
        },
        allowSignUp: false,
        allowLogin: true,
        allowPasswordReset: false
    },

    resetPassword: {
        closable: true,
        autoclose: true,
        auth: {
            sso: false
        },
        allowSignUp: false,
        allowLogin: false,
        allowForgotPassword: true
    }
};

/**
 * @summary Auth service class for Auth0 implementation
 * @example
 * ```js
 * import Auth from '@/auth';
 * 
 * const auth = new Auth('login');
 * auth.getLock().on('authenticated', (authResult) => {});
 * ```
 */
class Auth {
    /**
     * @param {String} type The type of lock this service should produce. Supports: 'login' or 'resetPassword'
     */
    constructor(type = 'login') {
        // If this value exists in the session, use the SHS credentials
        const api = JSON.parse(sessionStorage.getItem('shsuser')) || window.location.search.includes('shsuser=1')
            ? 'shs'
            : 'mohg';

        this.credentials = CREDENTIALS[api];

        // Store the type
        this.type = type;
        // Track when the type is changed
        this.typeChanged = false;

        // Retrieve session data if they exist
        this.accessToken = sessionStorage.getItem('accessToken') || '';
        this.idToken = sessionStorage.getItem('idToken') || '';
        this.expiresAt = sessionStorage.getItem('expiresAt') || '';

        this.lock = null;
    }

    setType(type = 'login') {
        this.type = type;
        this.typeChanged = true;
    }

    /**
     * Checks if the expiresAt value has not expired
     */
    isAuthenticated() {
        if (!this.accessToken || !this.expiresAt)
            return false;

        const expiresAt = JSON.parse(this.expiresAt);

        return new Date().getTime() < expiresAt;
    }

    /**
     * Clears the session stored values
     */
    clearSession() {
        ['accessToken', 'expiresAt', 'idToken'].forEach(key => {
            sessionStorage.removeItem(key);
        });

        this.accessToken = '';
        this.idToken = '';
        this.expiresAt = '';
    }

    /**
     * Sets token and expire values in session
     * @param {Object} authResult The auth response from authentication with Auth0
     */
    setSession(authResult) {
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());

        sessionStorage.setItem('accessToken', this.accessToken);
        sessionStorage.setItem('idToken', this.idToken);
        sessionStorage.setItem('expiresAt', this.expiresAt);
    }

    /**
     * Refreshes token and expiry through Auth0Lock's checkSession method
     * @see https://auth0.com/docs/libraries/lock/v11/api#checksession-
     */
    refreshLockToken() {
        const lock = this.getLock();

        return new Promise((resolve, reject) => {
            // checkSession does not seem to work without a redirectUri
            // @see https://github.com/auth0/lock/issues/1237
            lock.checkSession({
                redirectUri: window.location.origin
            }, (err, authResult) => {
                if (err) {
                    reject(err);
                } else {
                    this.setSession(authResult);
                    resolve();
                }
            });
        });
    }

    /**
     * Either instantiates or returns an already initialized Auth0Lock instance
     * @todo Build switch to toggle between different Auth0 client id/accounts
     * @param {Object} options Provide options to override or extend default type options
     */
    getLock(options = {}) {
        if (this.lock && !this.typeChanged)
            return this.lock;

        options = deepmerge(TYPE_OPTIONS[this.type], options);

        this.lock = new Auth0Lock(
            this.credentials.clientId,
            this.credentials.domain,
            options
        );

        this.typeChanged = false;
        return this.lock;
    }
};

export default Auth;
