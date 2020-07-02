const { getDate, getMonth, getYear } = require('date-fns')

module.exports = {
    parseDate(start_date, end_date) {
        const dayStart = getDate(start_date)
        const monthStart = getMonth(start_date) + 1
        const yearStart = getYear(start_date)
  
        const parsedDayStart = String(dayStart).padStart(2, '0')
        const parsedMonthStart = String(monthStart).padStart(2, '0')


        const dayEnd = getDate(end_date)
        const monthEnd = getMonth(end_date) + 1
        const yearEnd = getYear(end_date)

        const parsedDayEnd = String(dayEnd).padStart(2, '0')
        const parsedMonthEnd = String(monthEnd).padStart(2, '0')

        const parsedDateStart = `${parsedDayStart}/${parsedMonthStart}/${yearStart}`
        const parsedDateEnd = `${parsedDayEnd}/${parsedMonthEnd}/${yearEnd}`

        return dates = {
            start_date: parsedDateStart,
            end_date: parsedDateEnd
        }
    }
}