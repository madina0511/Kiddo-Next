"use client";

import React, { useState, useRef } from "react";

import styles from "../../../scss/pc/mypage/productRegister/Setproductform.module.scss";

type Brand = "MOLO" | "COSMO" | "NORALEE" | "SWEEBIES";
type Category = "Boys" | "Girls" | "Unisex";
type Season = "Summer 2025" | "Winter 2025" | "Spring 2025" | "Fall 2025";
type ItemType =
  | "Shirt / Jacket"
  | "Shorts / Pants"
  | "T-shirt"
  | "Cap / Hat"
  | "Shoes"
  | "Other";
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
const ITEM_TYPES: ItemType[] = [
  "Shirt / Jacket",
  "Shorts / Pants",
  "T-shirt",
  "Cap / Hat",
  "Shoes",
  "Other",
];

interface SetItem {
  id: string;
  name: string;
  price: string;
  type: ItemType;
  category: Category;
  sizes: Size[];
  imageFile: File | null;
  imagePreview: string | null;
}

interface SetFormData {
  name: string;
  brand: Brand;
  category: Category;
  season: Season;
  description: string;
  coverImageFile: File | null;
  coverImagePreview: string | null;
  items: SetItem[];
}

const makeItem = (): SetItem => ({
  id: crypto.randomUUID(),
  name: "",
  price: "",
  type: "T-shirt",
  category: "Boys",
  sizes: [],
  imageFile: null,
  imagePreview: null,
});

const INITIAL: SetFormData = {
  name: "",
  brand: "MOLO",
  category: "Boys",
  season: "Summer 2025",
  description: "",
  coverImageFile: null,
  coverImagePreview: null,
  items: [makeItem(), makeItem(), makeItem()],
};

export default function SetProductForm() {
  const [form, setForm] = useState<SetFormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  const totalPrice = form.items.reduce(
    (sum, i) => sum + (parseFloat(i.price) || 0),
    0,
  );

  function setField<K extends keyof SetFormData>(
    key: K,
    value: SetFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      coverImageFile: file,
      coverImagePreview: URL.createObjectURL(file),
    }));
  }

  function setItemField<K extends keyof SetItem>(
    id: string,
    key: K,
    value: SetItem[K],
  ) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function handleItemImage(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setItemField(id, "imageFile", file);
    setItemField(id, "imagePreview", URL.createObjectURL(file));
  }

  function toggleSize(id: string, size: Size) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id
          ? {
              ...item,
              sizes: item.sizes.includes(size)
                ? item.sizes.filter((s) => s !== size)
                : [...item.sizes, size],
            }
          : item,
      ),
    }));
  }

  function addItem() {
    setForm((prev) => ({ ...prev, items: [...prev.items, makeItem()] }));
  }

  function removeItem(id: string) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== id),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: API call here — createSetProduct(form)
      await new Promise((r) => setTimeout(r, 800)); // placeholder
      setSuccess(true);
      setForm(INITIAL);
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h3>Set saved successfully!</h3>
        <button onClick={() => setSuccess(false)}>Add new set</button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* ── Set info ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>Set details</p>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Set name</label>
            <input
              type="text"
              placeholder="Summer Breeze Set"
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
        <div className={styles.grid2}>
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
            placeholder="Brief description of the set..."
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* ── Cover image ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>Cover image</p>
        <div
          className={styles.uploadArea}
          onClick={() => coverRef.current?.click()}>
          {form.coverImagePreview ? (
            <div className={styles.previewWrap}>
              <img src={form.coverImagePreview} alt="cover" />
              <button
                type="button"
                className={styles.removeImg}
                onClick={(e) => {
                  e.stopPropagation();
                  setForm((prev) => ({
                    ...prev,
                    coverImageFile: null,
                    coverImagePreview: null,
                  }));
                }}>
                ×
              </button>
            </div>
          ) : (
            <div className={styles.uploadHint}>
              <UploadIcon />
              <span>Upload image</span>
              <small>JPG, PNG · max 5MB</small>
            </div>
          )}
        </div>
        <input
          ref={coverRef}
          type="file"
          accept="image/*"
          onChange={handleCover}
          hidden
        />
      </div>

      {/* ── Items ── */}
      <div className={styles.card}>
        <div className={styles.itemsTop}>
          <p className={styles.sectionLabel}>Set items</p>
          <div className={styles.totalBadge}>
            Total: <strong>${totalPrice.toFixed(0)}</strong>
          </div>
        </div>

        {form.items.map((item, idx) => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.itemHead}>
              <span className={styles.itemNum}>Item {idx + 1}</span>
              {form.items.length > 1 && (
                <button
                  type="button"
                  className={styles.removeItemBtn}
                  onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              )}
            </div>

            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Stripe Shirt"
                  value={item.name}
                  onChange={(e) =>
                    setItemField(item.id, "name", e.target.value)
                  }
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Price ($)</label>
                <input
                  type="number"
                  min={0}
                  placeholder="65"
                  value={item.price}
                  onChange={(e) =>
                    setItemField(item.id, "price", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Type</label>
                <select
                  value={item.type}
                  onChange={(e) =>
                    setItemField(item.id, "type", e.target.value as ItemType)
                  }>
                  {ITEM_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label>Category</label>
                <select
                  value={item.category}
                  onChange={(e) =>
                    setItemField(
                      item.id,
                      "category",
                      e.target.value as Category,
                    )
                  }>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label>Sizes</label>
              <div className={styles.sizes}>
                {SIZE_OPTIONS.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`${styles.sizeBtn} ${item.sizes.includes(size) ? styles.active : ""}`}
                    onClick={() => toggleSize(item.id, size)}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label>Image</label>
              <div
                className={styles.uploadAreaSm}
                onClick={() =>
                  document.getElementById(`item-img-${item.id}`)?.click()
                }>
                {item.imagePreview ? (
                  <div className={styles.previewWrap}>
                    <img src={item.imagePreview} alt="item" />
                    <button
                      type="button"
                      className={styles.removeImg}
                      onClick={(e) => {
                        e.stopPropagation();
                        setItemField(item.id, "imageFile", null);
                        setItemField(item.id, "imagePreview", null);
                      }}>
                      ×
                    </button>
                  </div>
                ) : (
                  <div className={styles.uploadHint}>
                    <UploadIcon size={16} />
                    <span>Upload</span>
                  </div>
                )}
              </div>
              <input
                id={`item-img-${item.id}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleItemImage(item.id, e)}
                hidden
              />
            </div>
          </div>
        ))}

        <button type="button" className={styles.addItemBtn} onClick={addItem}>
          <span>+</span> Add item
        </button>
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
          {loading ? "Saving..." : "Save set →"}
        </button>
      </div>
    </form>
  );
}

function UploadIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4v12M8 8l4-4 4 4M4 18h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
