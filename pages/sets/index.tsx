import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, IconButton, Pagination, Stack, Typography } from "@mui/material";
import withLayoutBase from "@/libs/components/layout/LayoutBase";
import { useRouter } from "next/router";
import { useState } from "react";

const SETS_PER_PAGE = 6;

const mockSets = [
  {
    _id: "1",
    setName: "Summer Breeze Set",
    setImage: "/img/sets/jacketset.webp",
    brand: "Molo",
  },
  {
    _id: "2",
    setName: "Classic Everyday Set",
    setImage: "/img/sets/jacketset.webp",
    brand: "Cosmo",
  },
  {
    _id: "3",
    setName: "Cozy Winter Set",
    setImage: "/img/sets/jacketset.webp",
    brand: "Noralee",
  },
  {
    _id: "4",
    setName: "Playful Day Set",
    setImage: "/img/sets/jacketset.webp",
    brand: "Sweebies",
  },
  {
    _id: "5",
    setName: "Spring Fresh Set",
    setImage: "/img/sets/jacketset.webp",
    brand: "Molo",
  },
  {
    _id: "6",
    setName: "Autumn Warm Set",
    setImage: "/img/sets/jacketset.webp",
    brand: "Cosmo",
  },
  {
    _id: "7",
    setName: "Party Look Set",
    setImage: "/img/sets/jacketset.webp",
    brand: "Noralee",
  },
  {
    _id: "8",
    setName: "Weekend Chill Set",
    setImage: "/img/sets/jacketset.webp",
    brand: "Sweebies",
  },
];

const SetsPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [likedSets, setLikedSets] = useState<Record<string, boolean>>({});

  const totalPages = Math.ceil(mockSets.length / SETS_PER_PAGE);
  const currentSets = mockSets.slice(
    (page - 1) * SETS_PER_PAGE,
    page * SETS_PER_PAGE,
  );

  // Apollo

  // Effects

  // Handlers
  const likeProductHandler = (e: React.MouseEvent, setId: string) => {
    e.stopPropagation(); // detail pagega o'tmasin
    setLikedSets((prev) => ({ ...prev, [setId]: !prev[setId] }));
  };

  return (
    <Box className="sets-page">
      <Box className="sets-container">
        <Typography className="sets-count">({mockSets.length} sets)</Typography>

        <Box className="sets-grid">
          {currentSets.map((set) => (
            <Box
              key={set._id}
              className="set-card"
              onClick={() => router.push(`/sets/${set._id}`)}>
              <img
                src={set.setImage}
                alt={set.setName}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/img/banner/header1.svg";
                }}
              />

              {/* Like tugmasi — yuqori o'ng burchak */}
              <IconButton
                className="set-like-btn"
                onClick={(e) => likeProductHandler(e, set._id)}>
                {likedSets[set._id] ? (
                  <FavoriteIcon className="liked" />
                ) : (
                  <FavoriteBorderIcon className="not-liked" />
                )}
              </IconButton>
            </Box>
          ))}
        </Box>

        {totalPages > 1 && (
          <Stack className="sets-pagination">
            <Pagination
              page={page}
              count={totalPages}
              onChange={(_, value) => {
                setPage(value);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              shape="circular"
              color="primary"
            />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default withLayoutBase(SetsPage);
