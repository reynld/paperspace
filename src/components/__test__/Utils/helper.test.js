import { formatDaysPassed } from '../../Utils/helper.js'

describe('Test formatDaysPassed function', () => {
    it('Test if function returns `today` if passed in current day', () => {
        const today = new Date();
        const dateString = formatDaysPassed(today)
        
        expect(dateString).toEqual('today')
    })

    it('Test if function returns `3 days ago` if passed the date 3 days ago', () => {
        const today = new Date();
        const threeDaysAgo = today.setDate(today.getDate() - 4);
        const dateString = formatDaysPassed(threeDaysAgo)
        
        expect(dateString).toEqual('3 days ago')
    })
})