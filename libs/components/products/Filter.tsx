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
import withLayoutBase from "./../../../pages/_admin/index";
import styles from "@/scss/pc/products/filter.module.scss";
import {
  CLOTHING_SIZE_LABELS,
  Gender,
  ProductColor,
} from "@/libs/enums/product.enum";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: {
    sizes: string[];
    genders: string[];
    colors: string[];
  }) => void;
};

const Filter = ({ open, onClose, onApply }: Props) => {
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
              {Object.entries(CLOTHING_SIZE_LABELS).map(([key, label]) => (
                <Button
                  key={key}
                  className={`${styles.tagBtn} ${
                    selectedSizes.includes(key) ? styles.activeTag : ""
                  }`}
                  onClick={() =>
                    toggleSelect(key, selectedSizes, setSelectedSizes)
                  }>
                  {label}
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
              {Object.entries(Gender).map(([key, value]) => (
                <Button
                  key={key}
                  className={`${styles.tagBtn} ${
                    selectedGenders.includes(key) ? styles.activeTag : ""
                  }`}
                  onClick={() =>
                    toggleSelect(key, selectedGenders, setSelectedGenders)
                  }>
                  {value}
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
              {Object.entries(ProductColor).map(([key, value]) => (
                <Button
                  key={key}
                  className={`${styles.tagBtn} ${
                    selectedColors.includes(key) ? styles.activeTag : ""
                  }`}
                  onClick={() =>
                    toggleSelect(key, selectedColors, setSelectedColors)
                  }>
                  {value}
                </Button>
              ))}
            </Box>
          </Collapse>
        </Box>

        <Box className={styles.footer}>
          <Button className={styles.clearBtn} onClick={handleClear}>
            CLEAR ({totalSelected})
          </Button>

          <Button
            className={styles.applyBtn}
            onClick={() => {
              onApply({
                sizes: selectedSizes,
                genders: selectedGenders,
                colors: selectedColors,
              });
              onClose();
            }}>
            APPLY
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
