import {test} from '@playwright/test'

test('mqa smoke 1', ({}, testInfo) =>{
 console.log(`>>> Running "${testInfo.title}" on worker #${testInfo.workerIndex}`);
console.log('first smoke mqa testcase')

})

test('mqa smoke 2', ({}, testInfo) =>{
console.log(`>>> Running "${testInfo.title}" on worker #${testInfo.workerIndex}`);
console.log('Second smoke mqa testcase')

})


test('mqa smoke 3', ({}, testInfo) =>{
console.log(`>>> Running "${testInfo.title}" on worker #${testInfo.workerIndex}`);
console.log('Third smoke mqa testcase')

})

test('mqa smoke 4', ({}, testInfo) =>{
console.log(`>>> Running "${testInfo.title}" on worker #${testInfo.workerIndex}`);
console.log('Fourth smoke mqa testcase')

})