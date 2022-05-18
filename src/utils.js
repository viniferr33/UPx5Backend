function dateToCron(date) {
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const dayOfWeek = date.getDay();

    return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};

function compareDateCron(cron) {
    const cronDate = dateToCron(new Date()).split(' ');
    const cronSplited = cron.split(' ');

    if(cronDate.length !== 5) throw new Error('Invalid cron format!');
    
    for(let i in cronDate) {
        if(cronDate[i] !== cronSplited[i] && cronSplited[i] !== '*') return false;
    }

    return true;
}

module.exports = compareDateCron;