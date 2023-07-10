// To edit the generated template, please edit this file

const fs = require('fs-extra');
const path = require('path');

const args = process.argv.slice(2);
const name = args[0];

const newModuleDir = path.join(__dirname, '..', 'modules', name);

if (fs.existsSync(newModuleDir)) {
    console.log(`Component ${name} already exists`);
    process.exit(1);
}

fs.mkdirSync(newModuleDir);

/***
 *
 * Generate enum file
 */
const enumDir = path.join(newModuleDir, 'enum');
fs.mkdirSync(enumDir);

/***
 *
 * Generate interface file
 */
const interfaceDir = path.join(newModuleDir, 'interfaces');
fs.mkdirSync(interfaceDir);

const interfaceFile = path.join(interfaceDir, `${name.toLowerCase()}.ts`);

// Write to file
const interfaceFileContent = `export interface ${name} {
    }
`

fs.writeFileSync(interfaceFile, interfaceFileContent)

/***
 *
 * Generate requests file
 */
const requestsDir = path.join(newModuleDir, 'requests');
fs.mkdirSync(requestsDir);

// Write to file
const requestFile = path.join(requestsDir, `requests.tsx`);
const requestContent = `import axios, {AxiosResponse} from 'axios';
import {${name}} from "../interfaces/${name.toLowerCase()}";

// request example using axios
// const getBookingList = (query: string): Promise<Booking[]> => {
//     return axios
//         .get<Booking[]>(API_URL + GET_BOOKING_LIST_URL)
//         .then((response: AxiosResponse<Booking[]>) => response.data)
// }

export { }
`;

fs.writeFileSync(requestFile, requestContent)

/***
 *
 * Generate components file
 */
const componentsDir = path.join(newModuleDir, 'components');
fs.mkdirSync(componentsDir);

const componentFile = path.join(componentsDir, `${name.toLowerCase()}.tsx`);

// Write to file
const componentContent = `import React from 'react';

const ${name.charAt(0).toUpperCase() + name.slice(1)} = () => {
  return (
    <div className="${name}">
      ${name} Component
    </div>
  );
}

export { ${name.charAt(0).toUpperCase() + name.slice(1)} };
`;

fs.writeFileSync(componentFile, componentContent);


console.log(`Component ${name} successfully created!`);