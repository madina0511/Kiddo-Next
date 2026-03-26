import {
  MemberAuthType,
  MemberStatus,
  MemberType,
} from "@/libs/enums/member.enum";
import { MeFollowed } from "../follow/follow";
import { MeLiked, TotalCounter } from "../product/product";

export interface Member {
  _id: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberAuthType: MemberAuthType;
  brandName: string;
  memberPhone: string;
  memberNick: string;
  memberPassword?: string;
  memberFullName?: string;
  memberImage?: string;
  agentCode?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberProducts: number;
  memberRank: number;
  memberArticles: number;
  memberPoints: number;
  memberLikes: number;
  memberFollowers?: number;
  memberFollowings?: number;
  memberViews: number;
  memberComments: number;
  memberWarnings: number;
  memberBlocks: number;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  // Enable for authentications
  meLiked?: MeLiked[];
  meFollowed?: MeFollowed[];
  accessToken?: string;
}

export interface Members {
  list: Member[];
  metaCounter: TotalCounter[];
}
