

import React from 'react';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faTwitter, faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';  

const Footer = () => {  
  return (  
    <footer className="bg-gray-950 w-full py-6">  
      <div className="container mx-auto text-center">  
        {/* Logo Section */}  
        <div className="logo text-2xl font-bold text-purple-400 mb-2">  
          #<span className="text-white">Pass</span>PRO  
        </div>  

        {/* Creator Credit */}  
        <div className="text-white mb-4">  
          Created with ❤️ by <span className="font-semibold">Roshni Kumari</span>  
        </div>  

        {/* Social Media Icons */}  
        <div className="flex flex-wrap justify-center gap-6 text-white text-lg mb-4">  
          <a   
            href="https://twitter.com"   
            target="_blank"   
            rel="noopener noreferrer"   
            className="flex items-center hover:text-purple-400"  
          >  
            <FontAwesomeIcon icon={faTwitter} className="mr-2" />  
            Twitter  
          </a>  
          <a   
            href="https://linkedin.com"   
            target="_blank"   
            rel="noopener noreferrer"   
            className="flex items-center hover:text-purple-400"  
          >  
            <FontAwesomeIcon icon={faLinkedin} className="mr-2" />  
            LinkedIn  
          </a>  
          <a   
            href="https://github.com"   
            target="_blank"   
            rel="noopener noreferrer"   
            className="flex items-center hover:text-purple-400"  
          >  
            <FontAwesomeIcon icon={faGithub} className="mr-2" />  
            GitHub  
          </a>  
          <a   
            href="https://instagram.com"   
            target="_blank"   
            rel="noopener noreferrer"   
            className="flex items-center hover:text-purple-400"  
          >  
            <FontAwesomeIcon icon={faInstagram} className="mr-2" />  
            Instagram  
          </a>  
        </div>  

        {/* Copyright Section */}  
        <div className="text-white text-sm">  
          &copy; {new Date().getFullYear()} PassPRO. All rights reserved.  
        </div>  
      </div>  
    </footer>  
  );  
};  

export default Footer;