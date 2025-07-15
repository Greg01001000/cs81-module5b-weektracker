// CS 81 Module 5 Assignment 5B: My Week in Data, GregH, 7/14/25
// https://github.com/Greg01001000/cs81-module5b-weektracker

let myWeek = [{day: 'Monday', activity: 'Schoolwork', category: 'learning', hoursSpent: 13, enjoyment: 7, timeOfDay: 'all day'},
    {day: 'Tuesday', activity: 'Shave & shower', category: 'physical', hoursSpent: 3, enjoyment: 4, timeOfDay: 'afternoon'},
    {day: 'Wednesday', activity: 'Bible study', category: 'learning', hoursSpent: 2, enjoyment: 8, timeOfDay: 'evening'},
    {day: 'Thursday', activity: 'Bible meeting', category: 'social', hoursSpent: 3, enjoyment: 9, timeOfDay: 'evening'},
    {day: 'Friday', activity: 'Shave & shower', category: 'physical', hoursSpent: 3, enjoyment: 4, timeOfDay: 'afternoon'},
    {day: 'Saturday', activity: 'Ministry', category: 'social', hoursSpent: 2, enjoyment: 9, timeOfDay: 'morning'},
    {day: 'Sunday', activity: 'Schoolwork', category: 'learning', hoursSpent: 13, enjoyment: 7, timeOfDay: 'all day'}];

/* Which activity will have the highest enjoyment?
* I predict that 'Bible meeting' and 'Ministry' will have the highest enjoyment.
*
* What category will dominate your week?
* I predict that 'Schoolwork' will dominate my week.
*
* What patterns might exist around time of day?
* I think I tend to do boring stuff in the afternoons; so I predict enjoyment will be higher in the mornings and evenings.
*/

const sumKey = (log, key) => log.reduce((sum, entry) => sum + entry[key], 0);

const avgKey = (log, key) => sumKey(log, key) / log.length;

function mostCommon(log, key) {
    const counts = {};
    [...new Set(log.map(entry => entry[key]))].forEach(value => {
        counts[value] = log.filter(entry => entry[key] == value).length;
    });
    return Object.keys(counts).filter(key => counts[key] == Math.max(...Object.values(counts)));
}

const sumKeyValue = (log, key, value) => sumKey(log.filter(entry => entry[key] == value), 'hoursSpent');


function avgEnjoyKey(log, key) {
    const averages = {};
    [...new Set(log.map(entry => entry[key]))].forEach(value => {
        averages[value] = avgKey(log.filter(entry => entry[key] == value), 'enjoyment');
    });
    return averages;
}

const filterByCondition = (log, testFn) => log.filter(testFn);

let key = 'category';
let value = mostCommon(myWeek, key);
console.log(`Most common value of ${key}: ${value}\n`);
console.log(`Total hours logged when ${key} = ${value}: ${sumKeyValue(myWeek, key, value)}\n`);

key = 'timeOfDay';
console.log(`Average enjoyment level for each value of ${key}: `);
console.log(avgEnjoyKey(myWeek, key));

console.log('\nActivities which took less time than average and had more enjoyment than average were:');
console.log(filterByCondition(myWeek, act => 
    act.hoursSpent < avgKey(myWeek, 'hoursSpent') && act.enjoyment > avgKey(myWeek, 'enjoyment')).map(item => item.activity));

// https://github.com/Greg01001000/cs81-module5b-weektracker