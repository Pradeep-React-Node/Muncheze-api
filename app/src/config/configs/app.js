module.exports = {
    ip: {
        doc: 'The IP address to bind.',
        default: process.env.IP_ADDRESS,
        env: 'IP_ADDRESS'
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: process.env.PORT,
        env: 'PORT',
        arg: 'port'
    }
}