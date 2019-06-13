
import images from '../../assets/illustrations.json';

export const formatDaysPassed = (date) => {
    const today = new Date();
    const newDay = new Date(date)
    const days = Math.ceil((today - newDay) / 8.64e7) - 1;

    return days > 0 ? `${days} days ago`: 'today'
}

export const parseMarkdown = (md) => {
    const mdArr = md.split('\n');
    const alerts = [];
    let alert = [];

    /************
    Loops through each markdown line
    checking to see if the line starts with '###'
    if it does, it appends the line to the alert array
    once we reach a line the does not start '###'
    we have all the alerts values and that current line is the body
    then we append a new alert object into the alerts array
    using the position in the alert array to determine what value it is
    ************/
    mdArr.forEach((ln, i) => {
      if (i !== 0) {
        const alen = alert.length;

        if (ln.startsWith('###')) {
          const content = ln.split('### ');
          alert.push(content[1]);

        } else if (alen === 4) {

          alerts.push({
            title: alert[0],
            date: alert[1],
            tag: alert[2],
            image: images[alert[3]],
            body:  ln,
          })

          alert = []

        } else if (ln !== ""){
          console.error(`
Error formatting markdown:
Alert: "${alert}"
Current line: "${ln}"
Index: "${i}"
          `)
        }
      }
    })

    alerts.sort((a, b) => new Date(b.date) - new Date(a.date))
    return alerts;
}