import { numberOfShows } from './../src/modules/getShows.js'
 
 describe('numberOfShows Method', () => {
   test('It returns 4 as the total number of shows', () => {
    const allShows_v1 = [
      { id: '1', name: 'Best movie'},
      { id: '2', name: 'great movie'},
       { id: '3', name: 'awesome movie'},
       { id: '4', name: 'nice movie'}];
     expect(numberOfShows(allShows_v1)).toBe("4 shows available");
   });

   test('It returns 7 as the total number of shows', () => {
    const allShows_v2 = [
      { id: '1', name: 'Best movie'},
      { id: '2', name: 'great movie'},
       { id: '3', name: 'awesome movie'},
       { id: '4', name: 'nice movie'},
       { id: '5', name: 'great movie'},
       { id: '6', name: 'awesome movie'},
       { id: '7', name: 'nice movie'}];
     expect(numberOfShows(allShows_v2)).toBe("7 shows available");
   });
 
 });