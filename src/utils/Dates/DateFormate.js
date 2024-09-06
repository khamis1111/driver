import moment from "moment"
import 'moment/locale/ar';

export const DateFormate = (date) => {
    return moment(date).format('MM/DD dddd hh:mm A')
}