import React from 'react';
import Check from './Check';
import AIGenerator from './AIGenerator';


const FeaturePage = () => {
  return (
    <div  
    className="min-h-screen flex flex-col justify-between bg-cover bg-center"  
    style={{ backgroundImage: "url('/bg2.jpg')" }}  
  >  
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Features</h1>
      <div className="flex-col justify-center">
        <Check/>
        { <AIGenerator /> }
      </div>
    </div>
    </div>
  );
};

export default FeaturePage;
