  const dbConfig = {
    server: process.env.server,
    database: process.env.database,
    user:  process.env.user,
    password:  process.env.password,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',               
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' 
      }
  };

  export default dbConfig