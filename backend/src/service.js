import fs from 'fs';
import jwt from 'jasonwebtoken';
import AsyncLock from 'async-lock';
import {InputError, AccessError} from './error';
import { resolve } from 'path';
import { rejects } from 'assert';

const lock = new AsyncLock();

const JWT_SECRET = 'giraffegiraffebeetroot';
const DATABASE_FILE = './database.json';

/***************************************************************
                       State Management
***************************************************************/

let users = {};
let listings = {};
let bookings = {};

const update = (users, listings, bookings) => 
  new Promise((resolve, reject) => {
    lock.acquire('saveData', () => {
      try {
        fs.writeFileSync(
          DATABASE_FILE,
          JSON.stringify(
            {
              users,
              listings,
              bookings,
            },
            null,
            2,
          ),
        );
        resolve();
      } catch {
        reject(new Error('Writing to database failed'));
      }
    });
  });

export const save = () => update(users, listings, bookings);
export const reset = () => {
  update({}, {}, {});
  users = {};
  listings = {};
  bookings = {};
};

try {
  const data = JSON.parse(fs.readFileSync(DATABASE_FILE));
  users = data.users;
  listings = data.listings;
  bookings = data.bookings;
} catch {
  console.log('WARNING: No database found, crate a new one');
  save();
}

/***************************************************************
                       Helper Functions
***************************************************************/

const newListingId = (_) => generateId(Object.keys(listings));
const newBookingId = (_) => generateId(Object.keys(bookings));

export const resourceLock = (callback) => 
  new Promise((resolve, reject) => {
    lock.acquire('resourceLock', callback(resolve, reject));
  });

const randNum = (max) => Math.round(Math.random() * (max - Math.floor(max / 10)) + Math.floor(max / 10));
const generateId = (currentList, max = 999999999) => {
  let R = randNum(max);
  while (currentList.includes(R)) {
    R = randNum(max);
  }
  return R.toString();
}