var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
function useSafeDispatch(dispatch) {
    var mounted = React.useRef(false);
    React.useLayoutEffect(function () {
        mounted.current = true;
        return function () {
            mounted.current = false;
        };
    }, []);
    return React.useCallback(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return mounted.current ? dispatch.apply(void 0, args) : void 0;
    }, [dispatch]);
}
var defaultInitialState = {
    status: 'idle',
    data: null,
    error: null,
};
function useAsync(initialState) {
    if (initialState === void 0) { initialState = {}; }
    var initialStateRef = React.useRef(__assign(__assign({}, defaultInitialState), initialState));
    var _a = React.useReducer(function (state, action) { return (__assign(__assign({}, state), action)); }, initialStateRef.current), _b = _a[0], status = _b.status, data = _b.data, error = _b.error, setState = _a[1];
    var safeSetState = useSafeDispatch(setState);
    var setData = React.useCallback(function (data) { return safeSetState({ data: data, status: 'resolved' }); }, [safeSetState]);
    var setError = React.useCallback(function (error) { return safeSetState({ error: error, status: 'rejected' }); }, [safeSetState]);
    var reset = React.useCallback(function () { return safeSetState(initialStateRef.current); }, [safeSetState]);
    var run = React.useCallback(function (promise) {
        if (!promise || !promise.then) {
            throw new Error("The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?");
        }
        safeSetState({ status: 'pending' });
        return promise.then(function (data) {
            setData(data);
            return data;
        }, function (error) {
            setError(error);
            return Promise.reject(error);
        });
    }, [safeSetState, setData, setError]);
    return {
        // using the same names that react-query uses for convenience
        isIdle: status === 'idle',
        isLoading: status === 'pending',
        isError: status === 'rejected',
        isSuccess: status === 'resolved',
        setData: setData,
        setError: setError,
        error: error,
        status: status,
        data: data,
        run: run,
        reset: reset,
    };
}
export { useAsync };
