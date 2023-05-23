import { AddUser } from './add-user';

export type EventName = keyof EventPayload;

export type EventPayload = {
  ADD_USER: AddUser;
};
