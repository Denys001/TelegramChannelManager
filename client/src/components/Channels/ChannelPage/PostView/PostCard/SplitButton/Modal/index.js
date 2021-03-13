import React from 'react';




export default function SimpleModal() {
  
  // getModalStyle is not a pure function, we roll the style only on the first render
  

  

  const body = (
    
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      
    </div>
  );
}
