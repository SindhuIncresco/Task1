import React, { useState, useCallback, useEffect, useMemo, useReducer, useTransition } from 'react';
import './App.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const ExampleComponent = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  useEffect(() => {
    console.log('Effect triggered');

    const timer = setTimeout(() => {
      console.log('Count updated in effect');
      setCount(10);
    }, 3000);

    return () => {
      console.log('Effect cleanup');
      clearTimeout(timer);
    };
  }, []);
  const handleIncrementWithTransition = () => {
    startTransition(() => {
      setCount(count + 1);
    },5000);};
  const doubledCount = useMemo(() => {
    console.log('Memoization triggered');
    return count * 2;
  }, [count]);

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const incrementReducer = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrementReducer = () => {
    dispatch({ type: 'DECREMENT' });
  };

  
  

  return (
    <div>
      <h1>React Hooks Example</h1>
      <table>
        <thead>
          <tr>
            <th>Hook Name</th>
            <th>Button</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>useState and useCallback</td>
            <td>
              <button onClick={increment}>Increment</button>
            </td>
            <td>{count}</td>
          </tr>
          <tr>
            <td>useReducer</td>
            <td>
              <button onClick={incrementReducer}>Increment</button>
              <button onClick={decrementReducer}>Decrement</button>
            </td>
            <td>{state.count}</td>
          </tr>
          <tr>
            <td>useTransition</td>
            <td>
              <button onClick={handleIncrementWithTransition} disabled={isPending}>
                Increment with Transition
              </button>
            </td>
            <td>{count}</td>
          </tr>
          <tr>
            <td>useEffect</td>
            <td>-</td>
            <td>{count}</td>
          </tr>
          <tr>
            <td>useMemo</td>
            <td>-</td>
            <td>{doubledCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExampleComponent;


