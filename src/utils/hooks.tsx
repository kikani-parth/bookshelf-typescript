import * as React from 'react';

function useSafeDispatch<T>(dispatch: React.Dispatch<T>): React.Dispatch<T> {
  const mounted = React.useRef<boolean>(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (...args: Parameters<typeof dispatch>) =>
      mounted.current ? dispatch(...args) : void 0,
    [dispatch]
  );
}

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])

type Error = {
  message: string;
  [key: string]: any; // Index signature to allow other properties
};

interface State<T> {
  status: string;
  data?: T | null;
  error?: Error | null;
}

interface useAsyncReturnType<T> {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  setData(data: T): void;
  setError(error: Error): void;
  error?: Error | null;
  status: string;
  data?: T | null;
  run(promise: Promise<T>): Promise<T>;
  reset: () => void;
}

const defaultInitialState: State<null> = {
  status: 'idle',
  data: null,
  error: null,
};

function useAsync<T>(
  initialState: Partial<State<T>> = {}
): useAsyncReturnType<T> {
  const initialStateRef = React.useRef<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = React.useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({ ...state, ...action }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = React.useCallback(
    (data: T) => safeSetState({ data, status: 'resolved' }),
    [safeSetState]
  );
  const setError = React.useCallback(
    (error: Error) => safeSetState({ error, status: 'rejected' }),
    [safeSetState]
  );
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  );

  const run = React.useCallback(
    (promise: Promise<T>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }
      safeSetState({ status: 'pending' });
      return promise.then(
        (data: T) => {
          setData(data);
          return data;
        },
        (error: Error) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export { useAsync };
