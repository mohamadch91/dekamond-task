import { UserData } from "@constants/api/user";

export interface LoginData {
  results: UserData[];
  info: Info;
}

export interface Info {
    seed:    string;
    results: number;
    page:    number;
    version: string;
}

