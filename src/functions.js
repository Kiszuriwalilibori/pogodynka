// import _ from 'lodash';

// export const limitStatus = (source, limit) => (!((source.length >= limit)));

// export function filterItems(source, pattern) {
//   let sourceCopy = [...source];
//   const comparator = (item) => !_.isEqual(item, pattern);
//   sourceCopy = sourceCopy.filter(comparator);
//   return sourceCopy;
// }

// export function checkDuplicates(source, pattern, column) {
//   const comparator = (item) => _.isEqual(_.nth(item, column), _.nth(pattern, column));
//   const result = source.filter(comparator);
//   return !((result.length > 0));
// }

// export const sortTable = (table, logical, key, func = _.lowerCase) => {
//   const getType = (k) => typeof (table[0][k - 1]);

//   const sorts = {

//     string: (logical, key) => {
//       table.sort((a, b) => {
//         const x = func(a[key]); const y = func(b[key]);

//         if (logical) {
//           if (x < y) { return 1; }
//           if (x > y) { return -1; }
//           return 0;
//         }
//         if (x < y) { return -1; }
//         if (x > y) { return 1; }
//         return 0;
//       });
//     },


//     number: (logical, key) => {
//       table.sort((a, b) => {
//         const x = a[key]; const y = b[key];

//         if (logical) {
//           if (x < y) { return 1; }
//           if (x > y) { return -1; }
//           return 0;
//         }
//         if (x < y) { return -1; }
//         if (x > y) { return 1; }
//         return 0;
//       });
//     },
//   };

//   sorts[getType(key)](logical, key - 1);
//   return table;
// };


// export const inputError = {
//   length: 'Name too long - it should not exceed 20 characters, clear input and try again', charName: 'Invalid Name, clear input and try again', email: 'Invalid E-mail format, clear input and try again', duplicate: 'This e-mail is already registered, clear input and try again',
// };

// export const validator = {
//   length: { func: (x) => (x.length <= 20), message: inputError.length },
//   name: {
//     func: (str) => {
//       const reg = /^[a-ząśżźćęółń]+\s*(?:[a-ząśżźćęółń]+(?:\s*-\s*)?[a-ząśżźćęółń]+)?$/i;
//       return reg.test(str);
//     },
//     message: inputError.charName,
//   },
//   email: {
//     func: (text) => {
//       const reg = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
//       return reg.test(text.trim());
//     },
//     message: inputError.email,
//   },
//   duplicate: { func: (tab) => ((tab[1].indexOf(tab[0]) === -1)), message: inputError.duplicate },

// };


// export const valid = (input, val) => {
//   const result = val.func(input);

//   if (result === false) { window.alert(val.message); } else {}

//   return result;
// };
