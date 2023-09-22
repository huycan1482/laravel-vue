export default () => {
    const formatDate = (string, timeZone = 7, symbol = '/') => {
        if (string != '' && string != 0) {
            let date = new Date(string);
            date.setHours(date.getHours() - timeZone);
            return {
                'date' : (`0` + date.getDate()).slice(-2) + symbol + (`0`+(date.getMonth() + 1)).slice(-2) + symbol + date.getFullYear(),
                'time' : (`0`+date.getHours()).slice(-2) + `:` + (`0`+date.getMinutes()).slice(-2),
            };
        }

        return {
            'date' : '',
            'time' : '',
        };
    }  
    
    return {
        formatDate,
    }
}