import React, { useState, useRef } from "react";
import styles from "../../../scss/pc/mypage/productRegister/Singleproductform.module.scss";

type Brand = "MOLO" | "COSMO" | "NORALEE" | "SWEEBIES";
type Category = "Boys" | "Girls" | "Unisex";
type Season = "Summer 2025" | "Winter 2025" | "Spring 2025" | "Fall 2025";
type Size = "2Y" | "3Y" | "4Y" | "5Y" | "6Y" | "7Y" | "8Y" | "10Y" | "12Y";

const SIZE_OPTIONS: Size[] = [
  "2Y",
  "3Y",
  "4Y",
  "5Y",
  "6Y",
  "7Y",
  "8Y",
  "10Y",
  "12Y",
];
const BRANDS: Brand[] = ["MOLO", "COSMO", "NORALEE", "SWEEBIES"];
const CATEGORIES: Category[] = ["Boys", "Girls", "Unisex"];
const SEASONS: Season[] = [
  "Summer 2025",
  "Winter 2025",
  "Spring 2025",
  "Fall 2025",
];

interface SingleFormData {
  name: string;
  brand: Brand;
  category: Category;
  season: Season;
  description: string;
  price: string;
  sizes: Size[];
  imageFiles: File[];
  imagePreviews: string[];
}

const INITIAL: SingleFormData = {
  name: "",
  brand: "MOLO",
  category: "Boys",
  season: "Summer 2025",
  description: "",
  price: "",
  sizes: [],
  imageFiles: [],
  imagePreviews: [],
};

export default function SingleProductForm() {
  const [form, setForm] = useState<SingleFormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);

  function setField<K extends keyof SingleFormData>(
    key: K,
    value: SingleFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const previews = files.map((f) => URL.createObjectURL(f));
    setForm((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...files],
      imagePreviews: [...prev.imagePreviews, ...previews],
    }));
    // reset input so same file can be re-added if needed
    e.target.value = "";
  }

  function removeImage(idx: number) {
    setForm((prev) => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== idx),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== idx),
    }));
  }

  function toggleSize(size: Size) {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: API call here — createSingleProduct(form)
      await new Promise((r) => setTimeout(r, 800)); // placeholder
      setSuccess(true);
      setForm(INITIAL);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h3>Product saved successfully!</h3>
        <button onClick={() => setSuccess(false)}>Add new product</button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* ── Info ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>Product details</p>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Product name</label>
            <input
              type="text"
              placeholder="Stripe Shirt"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Brand</label>
            <select
              value={form.brand}
              onChange={(e) => setField("brand", e.target.value as Brand)}>
              {BRANDS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.grid3}>
          <div className={styles.field}>
            <label>Price ($)</label>
            <input
              type="number"
              min={0}
              placeholder="65"
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) =>
                setField("category", e.target.value as Category)
              }>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Season</label>
            <select
              value={form.season}
              onChange={(e) => setField("season", e.target.value as Season)}>
              {SEASONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.field}>
          <label>Description</label>
          <textarea
            placeholder="Brief description of the product..."
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* ── Images ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>Images</p>
        <div className={styles.imagesGrid}>
          {form.imagePreviews.map((src, idx) => (
            <div key={idx} className={styles.thumb}>
              <img src={src} alt={`img-${idx}`} />
              <button
                type="button"
                className={styles.removeImg}
                onClick={() => removeImage(idx)}>
                ×
              </button>
              {idx === 0 && <span className={styles.mainBadge}>Main</span>}
            </div>
          ))}
          <div
            className={styles.uploadBox}
            onClick={() => imgRef.current?.click()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4v12M8 8l4-4 4 4M4 18h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span>Add image</span>
          </div>
        </div>
        <input
          ref={imgRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImages}
          hidden
        />
        <p className={styles.hint}>
          First image will be the main image · JPG, PNG · max 5MB
        </p>
      </div>

      {/* ── Sizes ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>Sizes</p>
        <div className={styles.sizes}>
          {SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              type="button"
              className={`${styles.sizeBtn} ${form.sizes.includes(size) ? styles.active : ""}`}
              onClick={() => toggleSize(size)}>
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* ── Actions ── */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => setForm(INITIAL)}>
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Saving..." : "Save product →"}
        </button>
      </div>
    </form>
  );
}
