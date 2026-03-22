import { gql } from "@apollo/client";
/**************************
 *         MEMBER         *
 *************************/

export const GET_MEMBER = gql`
  query GetMember($input: String!) {
    getMember(memberId: $input) {
      _id
      memberType
      memberStatus
      brandName
      memberAuthType
      memberPhone
      memberNick
      memberFullName
      memberImage
      memberAddress
      memberDesc
      memberProducts
      memberArticles
      memberFollowers
      memberFollowings
      memberLikes
      memberPoints
      memberViews
      memberComments
      memberRank
      memberWarnings
      memberBlocks
      createdAt
      deletedAt
      updatedAt
      accessToken
    }
  }
`;

export const GET_AGENTS = gql`
  query GetAgents($input: AgentsInquiry!) {
    getAgents(input: $input) {
      list {
        _id
        memberType
        memberStatus
        brandName
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberProducts
        memberArticles
        memberFollowers
        memberFollowings
        memberLikes
        memberPoints
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        createdAt
        deletedAt
        updatedAt
        accessToken
      }
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *        PRODUCT       *
 *************************/
export const GET_PRODUCT = gql`
  query GetProduct($input: String!) {
    getProduct(productId: $input) {
      _id
      productType
      productStatus
      productCategory
      size
      setItems
      productTitle
      productPrice
      gender
      productDiscount
      productViews
      productLikes
      productComments
      productRank
      productImages
      productDesc
      memberId
      soldAt
      deletedAt
      constructedAt
      createdAt
      updatedAt
      productColors
      ageGroup
      brandName
      memberData {
        _id
        memberType
        memberStatus
        brandName
        memberAuthType
        memberPhone
        memberNick
        agentCode
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberProducts
        memberArticles
        memberFollowers
        memberFollowings
        memberLikes
        memberPoints
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        createdAt
        deletedAt
        updatedAt
        accessToken
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($input: ProductsInquiry!) {
    getProducts(input: $input) {
      list {
        _id
        productType
        productStatus
        productCategory
        size
        setItems
        productTitle
        productPrice
        gender
        productDiscount
        productViews
        productLikes
        productComments
        productRank
        productImages
        productDesc
        memberId
        soldAt
        deletedAt
        constructedAt
        createdAt
        updatedAt
        productColors
        ageGroup
        brandName
        memberData {
          _id
          memberType
          memberStatus
          brandName
          memberAuthType
          memberPhone
          memberNick
          agentCode
          memberFullName
          memberImage
          memberAddress
          memberDesc
          memberProducts
          memberArticles
          memberFollowers
          memberFollowings
          memberLikes
          memberPoints
          memberViews
          memberComments
          memberRank
          memberWarnings
          memberBlocks
          createdAt
          deletedAt
          updatedAt
          accessToken
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_AGENT_PRODUCTS = gql`
  query GetAgentProducts($input: AgentProductsInquiry!) {
    getAgentProducts(input: $input) {
      list {
        _id
        productType
        productStatus
        productCategory
        size
        setItems
        productTitle
        productPrice
        gender
        productDiscount
        productViews
        productLikes
        productComments
        productRank
        productImages
        productDesc
        memberId
        soldAt
        deletedAt
        constructedAt
        createdAt
        updatedAt
        productColors
        ageGroup
        brandName
        memberData {
          _id
          memberType
          memberStatus
          brandName
          memberAuthType
          memberPhone
          memberNick
          agentCode
          memberFullName
          memberImage
          memberAddress
          memberDesc
          memberProducts
          memberArticles
          memberFollowers
          memberFollowings
          memberLikes
          memberPoints
          memberViews
          memberComments
          memberRank
          memberWarnings
          memberBlocks
          createdAt
          deletedAt
          updatedAt
          accessToken
          meLiked {
            memberId
            likeRefId
            myFavorite
          }
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_FAVORITIES = gql`
  query GetFavorities($input: OrdinaryInquiry!) {
    getFavorities(input: $input) {
      list {
        _id
        productType
        productStatus
        productCategory
        size
        setItems
        productTitle
        productPrice
        gender
        productDiscount
        productViews
        productLikes
        productComments
        productRank
        productImages
        productDesc
        memberId
        soldAt
        deletedAt
        constructedAt
        createdAt
        updatedAt
        productColors
        ageGroup
        brandName
        memberData {
          _id
          memberType
          memberStatus
          brandName
          memberAuthType
          memberPhone
          memberNick
          agentCode
          memberFullName
          memberImage
          memberAddress
          memberDesc
          memberProducts
          memberArticles
          memberFollowers
          memberFollowings
          memberLikes
          memberPoints
          memberViews
          memberComments
          memberRank
          memberWarnings
          memberBlocks
          createdAt
          deletedAt
          updatedAt
          accessToken
          meLiked {
            memberId
            likeRefId
            myFavorite
          }
          meFollowed {
            followingId
            followerId
            myFollowing
          }
        }
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
      }
      metaCounter {
        total
      }
    }
  }
`;
export const GET_VISITED = gql`
  query GetVisited($input: OrdinaryInquiry!) {
    getVisited(input: $input) {
      list {
        _id
        productType
        productStatus
        productCategory
        size
        setItems
        productTitle
        productPrice
        gender
        productDiscount
        productViews
        productLikes
        productComments
        productRank
        productImages
        productDesc
        memberId
        soldAt
        deletedAt
        constructedAt
        createdAt
        updatedAt
        productColors
        ageGroup
        brandName
        memberData {
          _id
          memberType
          memberStatus
          brandName
          memberAuthType
          memberPhone
          memberNick
          agentCode
          memberFullName
          memberImage
          memberAddress
          memberDesc
          memberProducts
          memberArticles
          memberFollowers
          memberFollowings
          memberLikes
          memberPoints
          memberViews
          memberComments
          memberRank
          memberWarnings
          memberBlocks
          createdAt
          deletedAt
          updatedAt
          accessToken
          meLiked {
            memberId
            likeRefId
            myFavorite
          }
          meFollowed {
            followingId
            followerId
            myFollowing
          }
        }
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
      }
      metaCounter {
        total
      }
    }
  }
`;
/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_BOARD_ARTICLE = gql`
  query GetBoardArticle($input: String!) {
    getBoardArticle(articleId: $input) {
      _id
      articleCategory
      articleStatus
      articleTitle
      articleContent
      articleImage
      articleViews
      articleLikes
      articleComments
      memberId
      createdAt
      updatedAt
      memberData {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberWarnings
        memberBlocks
        memberProperties
        memberRank
        memberPoints
        memberLikes
        memberViews
        deletedAt
        createdAt
        updatedAt
      }
      meLiked {
        memberId
        likeRefId
        myFavorite
      }
    }
  }
`;

export const GET_BOARD_ARTICLES = gql`
  query GetBoardArticles($input: BoardArticlesInquiry!) {
    getBoardArticles(input: $input) {
      list {
        _id
        articleCategory
        articleStatus
        articleTitle
        articleContent
        articleImage
        articleViews
        articleLikes
        articleComments
        memberId
        createdAt
        updatedAt
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
        memberData {
          _id
          memberType
          memberStatus
          memberAuthType
          memberPhone
          memberNick
          memberFullName
          memberImage
          memberAddress
          memberDesc
          memberWarnings
          memberBlocks
          memberProperties
          memberRank
          memberPoints
          memberLikes
          memberViews
          deletedAt
          createdAt
          updatedAt
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *         COMMENT        *
 *************************/

export const GET_COMMENTS = gql`
  query GetComments($input: CommentsInquiry!) {
    getComments(input: $input) {
      list {
        _id
        commentStatus
        commentGroup
        commentContent
        commentRefId
        memberId
        createdAt
        updatedAt
        memberData {
          _id
          memberType
          memberStatus
          memberAuthType
          memberPhone
          memberNick
          memberFullName
          memberImage
          memberAddress
          memberDesc
          memberWarnings
          memberBlocks
          memberProperties
          memberRank
          memberPoints
          memberLikes
          memberViews
          deletedAt
          createdAt
          updatedAt
          accessToken
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *         FOLLOW        *
 *************************/
export const GET_MEMBER_FOLLOWERS = gql`
  query GetMemberFollowers($input: FollowInquiry!) {
    getMemberFollowers(input: $input) {
      list {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
        meFollowed {
          followingId
          followerId
          myFollowing
        }
        followerData {
          _id
          memberType
          memberStatus
          memberAuthType
          memberPhone
          memberNick
          memberFullName
          memberImage
          memberAddress
          memberDesc
          memberProperties
          memberArticles
          memberPoints
          memberLikes
          memberViews
          memberComments
          memberFollowings
          memberFollowers
          memberRank
          memberWarnings
          memberBlocks
          deletedAt
          createdAt
          updatedAt
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_MEMBER_FOLLOWINGS = gql`
  query GetMemberFollowings($input: FollowInquiry!) {
    getMemberFollowings(input: $input) {
      list {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        followingData {
          _id
          memberType
          memberStatus
          memberAuthType
          memberPhone
          memberNick
          memberFullName
          memberImage
          memberAddress
          memberDesc
          memberProperties
          memberArticles
          memberPoints
          memberLikes
          memberViews
          memberComments
          memberFollowings
          memberFollowers
          memberRank
          memberWarnings
          memberBlocks
          deletedAt
          createdAt
          updatedAt
          accessToken
        }
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
        meFollowed {
          followingId
          followerId
          myFollowing
        }
      }
      metaCounter {
        total
      }
    }
  }
`;
