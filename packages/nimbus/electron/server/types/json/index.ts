import { Fields } from "../mock/mockDataTemplate";

export type JsonObjectType = {
    [key: string]: keyof Fields | (keyof Fields)[] | JsonObjectType;
};

