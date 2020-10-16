import React, { useState, useEffect } from 'react';

export default function Count() {

    const [count, setCount] = useState(0);

    useEffect(() => {
    
        return () => {  }
    }, [count]);

    return <div>
        <p>Count : {count}</p>
        <button onClick={() => { setCount(count + 1) }}>Click</button>
    </div>
}