export interface DataInterface {
    temperature: Number,
    humidity: Number,
    geolocation: {
        location: {
            lat: Number,
            lng: Number
        },
        accuracy: Number
    },
    timestamp: Date,
    user: string
}