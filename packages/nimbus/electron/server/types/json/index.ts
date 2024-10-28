import { Fields } from "../mock/mockData";

export type JsonObjectType = {
    [key: string]: keyof Fields | (keyof Fields)[] | JsonObjectType;
};

