
export const AppConfiguration = () => ({ 
    environment: process.env.NODE_ENV || 'env',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defualtLimit: +process.env.DEFAULT_LIMIT || 5 // + para number
})