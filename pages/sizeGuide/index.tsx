import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import withLayoutBase from "@/libs/components/layout/LayoutBase";
import {
  AgeGroup,
  ClothingSize,
  AGE_GROUP_LABELS,
  CLOTHING_SIZE_LABELS,
} from "@/libs/enums/product.enum";
import styles from "../../scss/pc/sizeGuide/SizeGuidePage.module.scss";

interface SizeRow {
  ageGroup: AgeGroup;
  size: ClothingSize;
  height: string;
  chest: string;
  waist: string;
  hip: string;
  inseam: string;
}

const SIZE_GUIDE_DATA: SizeRow[] = [
  {
    ageGroup: AgeGroup.M0_3,
    size: ClothingSize.SIZE_86_92,
    height: "50–62 cm",
    chest: "36–40 cm",
    waist: "36–40 cm",
    hip: "38–42 cm",
    inseam: "14–18 cm",
  },
  {
    ageGroup: AgeGroup.M3_6,
    size: ClothingSize.SIZE_86_92,
    height: "62–68 cm",
    chest: "40–44 cm",
    waist: "40–43 cm",
    hip: "42–46 cm",
    inseam: "18–22 cm",
  },
  {
    ageGroup: AgeGroup.M6_12,
    size: ClothingSize.SIZE_86_92,
    height: "68–80 cm",
    chest: "44–48 cm",
    waist: "43–47 cm",
    hip: "46–50 cm",
    inseam: "22–28 cm",
  },
  {
    ageGroup: AgeGroup.M12_18,
    size: ClothingSize.SIZE_86_92,
    height: "80–86 cm",
    chest: "48–50 cm",
    waist: "47–49 cm",
    hip: "50–53 cm",
    inseam: "28–31 cm",
  },
  {
    ageGroup: AgeGroup.M18_24,
    size: ClothingSize.SIZE_92_98,
    height: "86–92 cm",
    chest: "50–52 cm",
    waist: "49–51 cm",
    hip: "53–55 cm",
    inseam: "31–33 cm",
  },
  {
    ageGroup: AgeGroup.Y2_3,
    size: ClothingSize.SIZE_92_98,
    height: "92–98 cm",
    chest: "52–54 cm",
    waist: "51–52 cm",
    hip: "55–57 cm",
    inseam: "33–37 cm",
  },
  {
    ageGroup: AgeGroup.Y3_4,
    size: ClothingSize.SIZE_98_104,
    height: "98–104 cm",
    chest: "54–56 cm",
    waist: "52–53 cm",
    hip: "57–60 cm",
    inseam: "37–41 cm",
  },
  {
    ageGroup: AgeGroup.Y5_6,
    size: ClothingSize.SIZE_110_116,
    height: "110–116 cm",
    chest: "58–60 cm",
    waist: "54–55 cm",
    hip: "63–66 cm",
    inseam: "45–49 cm",
  },
  {
    ageGroup: AgeGroup.Y7_8,
    size: ClothingSize.SIZE_122_128,
    height: "122–128 cm",
    chest: "63–65 cm",
    waist: "57–58 cm",
    hip: "69–72 cm",
    inseam: "53–57 cm",
  },
  {
    ageGroup: AgeGroup.Y9_10,
    size: ClothingSize.SIZE_134_140,
    height: "134–140 cm",
    chest: "68–71 cm",
    waist: "60–62 cm",
    hip: "76–80 cm",
    inseam: "61–65 cm",
  },
  {
    ageGroup: AgeGroup.Y11_12,
    size: ClothingSize.SIZE_146_152,
    height: "146–152 cm",
    chest: "74–78 cm",
    waist: "64–66 cm",
    hip: "84–88 cm",
    inseam: "69–73 cm",
  },
  {
    ageGroup: AgeGroup.Y13_14,
    size: ClothingSize.SIZE_158_164,
    height: "158–164 cm",
    chest: "82–86 cm",
    waist: "68–70 cm",
    hip: "92–96 cm",
    inseam: "77–80 cm",
  },
  {
    ageGroup: AgeGroup.Y15_16,
    size: ClothingSize.SIZE_170_176,
    height: "170–176 cm",
    chest: "86–90 cm",
    waist: "70–72 cm",
    hip: "96–100 cm",
    inseam: "80–84 cm",
  },
];

const AGE_GROUP_TO_MONTHS: Record<AgeGroup, number> = {
  [AgeGroup.ALL]: -1,
  [AgeGroup.M0_3]: 1,
  [AgeGroup.M3_6]: 4,
  [AgeGroup.M6_12]: 7,
  [AgeGroup.M12_18]: 13,
  [AgeGroup.M18_24]: 19,
  [AgeGroup.Y2_3]: 25,
  [AgeGroup.Y3_4]: 37,
  [AgeGroup.Y5_6]: 61,
  [AgeGroup.Y7_8]: 85,
  [AgeGroup.Y9_10]: 109,
  [AgeGroup.Y11_12]: 133,
  [AgeGroup.Y13_14]: 157,
  [AgeGroup.Y15_16]: 181,
  [AgeGroup.ONE_SIZE]: -1,
};

const AGE_GROUP_MAX_MONTHS: Record<AgeGroup, number> = {
  [AgeGroup.ALL]: Infinity,
  [AgeGroup.M0_3]: 3,
  [AgeGroup.M3_6]: 6,
  [AgeGroup.M6_12]: 12,
  [AgeGroup.M12_18]: 18,
  [AgeGroup.M18_24]: 24,
  [AgeGroup.Y2_3]: 36,
  [AgeGroup.Y3_4]: 48,
  [AgeGroup.Y5_6]: 72,
  [AgeGroup.Y7_8]: 96,
  [AgeGroup.Y9_10]: 120,
  [AgeGroup.Y11_12]: 144,
  [AgeGroup.Y13_14]: 168,
  [AgeGroup.Y15_16]: 192,
  [AgeGroup.ONE_SIZE]: Infinity,
};

function parseInputToMonths(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  // "6m" or "6 months" → months
  const monthMatch = trimmed.match(/^(\d+)\s*m/i);
  if (monthMatch) return parseInt(monthMatch[1]);

  // "2y" or "2 years" or plain number ≤ 2 with decimal → years
  const yearMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*y/i);
  if (yearMatch) return Math.round(parseFloat(yearMatch[1]) * 12);

  const num = parseFloat(trimmed);
  if (isNaN(num)) return null;

  // Heuristic: ≤ 24 treat as months if ends in "m", else years
  // Plain number: ≤ 24 → months; > 24 → years (e.g. "36" = 3 years)
  if (Number.isInteger(num) && num <= 24) return num;
  return Math.round(num * 12);
}

function findMatchedRow(months: number): SizeRow | null {
  return (
    SIZE_GUIDE_DATA.find(
      (row) =>
        months >= AGE_GROUP_TO_MONTHS[row.ageGroup] &&
        months <= AGE_GROUP_MAX_MONTHS[row.ageGroup],
    ) ?? null
  );
}

const COLUMNS = [
  {
    key: "ageGroup",
    label: "Age group",
    render: (r: SizeRow) => AGE_GROUP_LABELS[r.ageGroup],
  },
  {
    key: "size",
    label: "Size",
    render: (r: SizeRow) => CLOTHING_SIZE_LABELS[r.size],
  },
  { key: "height", label: "A — Height", render: (r: SizeRow) => r.height },
  { key: "chest", label: "B — Chest", render: (r: SizeRow) => r.chest },
  { key: "waist", label: "C — Waist", render: (r: SizeRow) => r.waist },
  { key: "hip", label: "D — Hip", render: (r: SizeRow) => r.hip },
  { key: "inseam", label: "E — Inseam", render: (r: SizeRow) => r.inseam },
];

function SizeGuidePage() {
  const [inputValue, setInputValue] = useState("");
  const [matchedRow, setMatchedRow] = useState<SizeRow | null>(null);
  const [hint, setHint] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (!val.trim()) {
      setMatchedRow(null);
      setHint("");
      return;
    }

    const months = parseInputToMonths(val);
    if (months === null || months < 0) {
      setMatchedRow(null);
      setHint("Enter age as months (e.g. 6m) or years (e.g. 2y)");
      return;
    }

    const found = findMatchedRow(months);
    if (found) {
      setMatchedRow(found);
      setHint(`Showing size for ${AGE_GROUP_LABELS[found.ageGroup]}`);
    } else {
      setMatchedRow(null);
      setHint("No matching size found for this age");
    }
  };

  return (
    <Box className={styles.page}>
      <Container maxWidth="lg">
        <Box className={styles.header}>
          <Typography className={styles.eyebrow}>Children's fashion</Typography>
          <Typography className={styles.title} component="h1">
            Size Guide
          </Typography>
          <Typography className={styles.subtitle}>
            Enter your child's age to find the right size
          </Typography>
        </Box>

        {/* Age input */}
        <Box className={styles.inputSection}>
          <Box className={styles.inputWrap}>
            <label className={styles.inputLabel} htmlFor="age-input">
              Age
            </label>
            <input
              id="age-input"
              className={styles.ageInput}
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="e.g. 6m · 2y · 18"
              autoComplete="off"
            />
          </Box>
          <Typography
            className={`${styles.hint} ${matchedRow ? styles.hintActive : ""}`}>
            {hint || "Tip: enter months (6m), years (2y), or a plain number"}
          </Typography>
        </Box>

        {/* Matched size card */}
        {matchedRow && (
          <Box className={styles.matchCard}>
            <Box className={styles.matchCardInner}>
              <Typography className={styles.matchLabel}>Your size</Typography>
              <Typography className={styles.matchSize}>
                {CLOTHING_SIZE_LABELS[matchedRow.size]}
              </Typography>
              <Typography className={styles.matchAge}>
                {AGE_GROUP_LABELS[matchedRow.ageGroup]}
              </Typography>
            </Box>
            <Box className={styles.matchMeasurements}>
              {[
                { label: "Height", value: matchedRow.height },
                { label: "Chest", value: matchedRow.chest },
                { label: "Waist", value: matchedRow.waist },
                { label: "Hip", value: matchedRow.hip },
                { label: "Inseam", value: matchedRow.inseam },
              ].map(({ label, value }) => (
                <Box key={label} className={styles.matchMeasurementItem}>
                  <Typography className={styles.matchMeasurementLabel}>
                    {label}
                  </Typography>
                  <Typography className={styles.matchMeasurementValue}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Full table */}
        <Box className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th key={col.key} className={styles.th}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZE_GUIDE_DATA.map((row) => {
                const isMatch = matchedRow?.ageGroup === row.ageGroup;
                return (
                  <tr
                    key={row.ageGroup}
                    className={`${styles.tr} ${
                      isMatch ? styles.trMatched : ""
                    }`}>
                    {COLUMNS.map((col) => (
                      <td
                        key={col.key}
                        className={`${styles.td} ${
                          col.key === "ageGroup" ? styles.tdFirst : ""
                        }`}>
                        {col.render(row)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>

        {/* Legend */}
        <Box className={styles.legend}>
          <span className={styles.legendDot} />
          <Typography className={styles.legendText}>
            Highlighted row matches entered age
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default withLayoutBase(SizeGuidePage);
