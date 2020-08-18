export const DateFormat = {
    getDateNow() {
        const locales = "ru-RU"
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
        return new Date().toLocaleString(locales, options)
    }
}