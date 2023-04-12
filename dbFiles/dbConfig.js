const config = {
    user: '',
    password: '',
    server: '',
    database: '',
    options: {
        trustServerCertificate: true,
        trustConnestion: false,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
};
    
module.exports = config;