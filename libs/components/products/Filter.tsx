import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import styles from "@/scss/pc/products/filter.module.scss";

const sizeGroup = [
  "0-3M",
  "3-6M",
  "6-12M",
  "12-18M",
  "18-24M",
  "2-3Y",
  "4-5Y",
  "6-7Y",
  "8-9Y",
  "10-11Y",
];

const genderGroup = ["Girls", "Boys"];

const colorGroup = [
  "Blue",
  "Blush",
  "Brown",
  "Grey",
  "Ivory",
  "Pink",
  "Yellow",
  "Stripe",
];

type Props = {
  open: boolean;
  onClose: () => void;
};

const Filter = ({ open, onClose }: Props) => {
  const [openSize, setOpenSize] = useState(true);
  const [openGender, setOpenGender] = useState(true);
  const [openColor, setOpenColor] = useState(true);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggleSelect = (
    value: string,
    selected: string[],
    setSelected: (items: string[]) => void,
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleClear = () => {
    setSelectedSizes([]);
    setSelectedGenders([]);
    setSelectedColors([]);
  };

  const totalSelected =
    selectedSizes.length + selectedGenders.length + selectedColors.length;

  if (!open) return null;

  return (
    <Box className={styles.overlay}>
      <Box className={styles.backdrop} onClick={onClose} />

      <Box className={styles.drawer}>
        <Stack
          className={styles.header}
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Typography className={styles.resultText}>
            Filter: 11 products
          </Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider />

        {/* SIZE */}
        <Box className={styles.section}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={styles.sectionHeader}
            onClick={() => setOpenSize(!openSize)}>
            <Typography className={styles.sectionTitle}>Size</Typography>
            <KeyboardArrowUpIcon
              className={!openSize ? styles.rotateIcon : ""}
            />
          </Stack>

          <Collapse in={openSize}>
            <Box className={styles.tagWrap}>
              {sizeGroup.map((item) => (
                <Button
                  key={item}
                  className={`${styles.tagBtn} ${
                    selectedSizes.includes(item) ? styles.activeTag : ""
                  }`}
                  onClick={() =>
                    toggleSelect(item, selectedSizes, setSelectedSizes)
                  }>
                  {item}
                </Button>
              ))}
            </Box>
          </Collapse>
        </Box>

        {/* GENDER */}
        <Box className={styles.section}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={styles.sectionHeader}
            onClick={() => setOpenGender(!openGender)}>
            <Typography className={styles.sectionTitle}>Gender</Typography>
            <KeyboardArrowUpIcon
              className={!openGender ? styles.rotateIcon : ""}
            />
          </Stack>

          <Collapse in={openGender}>
            <Box className={styles.tagWrap}>
              {genderGroup.map((item) => (
                <Button
                  key={item}
                  className={`${styles.tagBtn} ${
                    selectedGenders.includes(item) ? styles.activeTag : ""
                  }`}
                  onClick={() =>
                    toggleSelect(item, selectedGenders, setSelectedGenders)
                  }>
                  {item}
                </Button>
              ))}
            </Box>
          </Collapse>
        </Box>

        {/* COLOR */}
        <Box className={styles.section}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={styles.sectionHeader}
            onClick={() => setOpenColor(!openColor)}>
            <Typography className={styles.sectionTitle}>Color</Typography>
            <KeyboardArrowUpIcon
              className={!openColor ? styles.rotateIcon : ""}
            />
          </Stack>

          <Collapse in={openColor}>
            <Box className={styles.tagWrap}>
              {colorGroup.map((item) => (
                <Button
                  key={item}
                  className={`${styles.tagBtn} ${
                    selectedColors.includes(item) ? styles.activeTag : ""
                  }`}
                  onClick={() =>
                    toggleSelect(item, selectedColors, setSelectedColors)
                  }>
                  {item}
                </Button>
              ))}
            </Box>
          </Collapse>
        </Box>

        <Box className={styles.footer}>
          <Button className={styles.clearBtn} onClick={handleClear}>
            CLEAR ({totalSelected})
          </Button>

          <Button className={styles.applyBtn}>APPLY</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
