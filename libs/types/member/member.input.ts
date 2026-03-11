import { Direction } from "@/libs/enums/common.enum";
import {
  MemberAuthType,
  MemberStatus,
  MemberType,
} from "@/libs/enums/member.enum";

export interface MemberInput {
  memberNick: string;
  memberPassword: string;
  memberPhone: string;
  memberType?: MemberType;
  brandName?: string;
  memberAuthType?: MemberAuthType;
  agentCode?: string;
}
export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}
export interface AISearch {
  text?: string;
}

export interface AgentsInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: AISearch;
}

export interface MISearch {
  memberStatus?: MemberStatus;
  memberType?: MemberType;
  text?: string;
}
export interface MembersInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: MISearch;
}
