// Configuration file for environment-specific settings

const config = {
    // API base URL - change this to match your backend endpoint
    apiUrl: 'http://localhost:8080/api/',
    
    // Authentication endpoints
    authEndpoints: {
      login: 'auth/login',
      register: 'auth/signup',
      refreshToken: 'auth/refreshtoken'
    },
    
    // Other application settings
    defaultPageSize: 10,
    tokenStorageKey: 'user'
  };
  
  export default config;