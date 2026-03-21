import React, { useState, useRef } from "react";
import styles from "../../../scss/pc/mypage/productRegister/Setproductform.module.scss";
import {
  ProductType,
  ProductCategory,
  ClothingSize,
  AgeGroup,
  Gender,
  ProductColor,
  AGE_GROUP_LABELS,
  CLOTHING_SIZE_LABELS,
} from "@/libs/enums/product.enum";
import { ProductInput } from "@/libs/types/product/product.input";
import axios from "axios";
import { getJwtToken } from "@/libs/auth";
import {
  INITIAL,
  makeItem,
  SetFormData,
  SetItem,
} from "@/libs/types/product/set";
import {
  sweetErrorHandling,
  sweetMixinErrorAlert,
  sweetMixinSuccessAlert,
} from "@/libs/types/sweetAlert";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "@/apollo/user/mutation";

const PRODUCT_TYPES = Object.values(ProductType);
const PRODUCT_CATEGORIES = Object.values(ProductCategory);
const CLOTHING_SIZES = Object.values(ClothingSize);
const AGE_GROUPS = Object.values(AgeGroup);
const GENDERS = Object.values(Gender);
const PRODUCT_COLORS = Object.values(ProductColor);

const BRANDS = ["MOLO", "COSMO", "NORALEE", "SWEEBIES"];

export default function SetProductForm() {
  const token = getJwtToken();
  const [form, setForm] = useState<SetFormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  // APOLLO
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const totalPrice = form.items.reduce(
    (sum, i) => sum + (i.productPrice || 0),
    0,
  );

  function setField<K extends keyof SetFormData>(
    key: K,
    value: SetFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAgeGroup(age: AgeGroup) {
    setForm((prev) => ({
      ...prev,
      ageGroups: prev.ageGroups.includes(age)
        ? prev.ageGroups.filter((a) => a !== age)
        : [...prev.ageGroups, age],
    }));
  }

  function toggleColor(color: ProductColor) {
    setForm((prev) => ({
      ...prev,
      productColors: prev.productColors.includes(color)
        ? prev.productColors.filter((c) => c !== color)
        : [...prev.productColors, color],
    }));
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

  // Item field setters
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

  function toggleItemSize(id: string, size: ClothingSize) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id
          ? {
              ...item,
              size: item.size.includes(size)
                ? item.size.filter((s) => s !== size)
                : [...item.size, size],
            }
          : item,
      ),
    }));
  }

  function toggleItemAgeGroup(id: string, age: AgeGroup) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id
          ? {
              ...item,
              ageGroups: item.ageGroups.includes(age)
                ? item.ageGroups.filter((a) => a !== age)
                : [...item.ageGroups, age],
            }
          : item,
      ),
    }));
  }

  function toggleItemColor(id: string, color: ProductColor) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id
          ? {
              ...item,
              productColors: item.productColors.includes(color)
                ? item.productColors.filter((c) => c !== color)
                : [...item.productColors, color],
            }
          : item,
      ),
    }));
  }

  function handleItemImage(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setItemField(id, "imageFile", file);
    setItemField(id, "imagePreview", URL.createObjectURL(file));
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
    // Validation
    if (!form.productTitle) {
      await sweetMixinErrorAlert("Set title is required");
      return;
    }
    if (!form.coverImageFile) {
      await sweetMixinErrorAlert("Cover image is required");
      return;
    }
    for (const item of form.items) {
      if (!item.productTitle) {
        await sweetMixinErrorAlert("All item titles are required");
        return;
      }
      if (!item.productPrice) {
        await sweetMixinErrorAlert("All item prices are required");
        return;
      }
      if (!item.imageFile) {
        await sweetMixinErrorAlert("All item images are required");
        return;
      }
    }

    setLoading(true);

    try {
      // 1. Har bir item uchun image upload va createProduct
      const itemIds: string[] = [];

      for (const item of form.items) {
        // Image upload
        let imageUrl = "";
        if (item.imageFile) {
          const formData = new FormData();
          formData.append(
            "operations",
            JSON.stringify({
              query: `mutation ImageUploader($file: Upload!, $target: String!) {
              imageUploader(file: $file, target: $target)
            }`,
              variables: { file: null, target: "product" },
            }),
          );
          formData.append("map", JSON.stringify({ "0": ["variables.file"] }));
          formData.append("0", item.imageFile);

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_GRAPHQL_URL}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "apollo-require-preflight": true,
                Authorization: `Bearer ${token}`,
              },
            },
          );
          imageUrl = res.data.data.imageUploader;
        }
        console.log("item input:", {
          productType: item.productType,
          productCategory: item.productCategory,
          sizes: item.size,
          ageGroups: item.ageGroups,
          gender: item.gender,
          productTitle: item.productTitle,
          productPrice: item.productPrice,
          productColors: item.productColors,
          productDesc: item.productDesc,
          brandName: form.brandName,
          productImages: imageUrl ? [imageUrl] : [],
        });
        // Item createProduct
        const itemResult = await createProduct({
          variables: {
            input: {
              productType: item.productType,
              productCategory: item.productCategory,
              sizes: item.size,
              ageGroups: item.ageGroups,
              gender: item.gender,
              productTitle: item.productTitle,
              productPrice: item.productPrice,
              productColors: item.productColors,
              productDesc: item.productDesc,
              brandName: form.brandName,
              productImages: imageUrl ? [imageUrl] : [],
            },
          },
        });

        itemIds.push(itemResult.data.createProduct._id);
      }

      // 2. Cover image upload
      let coverImageUrl = "";
      if (form.coverImageFile) {
        const formData = new FormData();
        formData.append(
          "operations",
          JSON.stringify({
            query: `mutation ImageUploader($file: Upload!, $target: String!) {
            imageUploader(file: $file, target: $target)
          }`,
            variables: { file: null, target: "product" },
          }),
        );
        formData.append("map", JSON.stringify({ "0": ["variables.file"] }));
        formData.append("0", form.coverImageFile);

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_GRAPHQL_URL}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "apollo-require-preflight": true,
              Authorization: `Bearer ${token}`,
            },
          },
        );
        coverImageUrl = res.data.data.imageUploader;
      }

      // 3. Set product yaratish
      await createProduct({
        variables: {
          input: {
            productType: ProductType.SET,
            productCategory: form.productCategory,
            sizes: [],
            ageGroups: form.ageGroups,
            gender: form.gender,
            productTitle: form.productTitle,
            productPrice: totalPrice,
            productColors: form.productColors,
            productDesc: form.productDesc,
            brandName: form.brandName,
            productDiscount: form.productDiscount,
            productImages: coverImageUrl ? [coverImageUrl] : [],
            setItems: itemIds,
          },
        },
      });

      await sweetMixinSuccessAlert("Set saved successfully!");
      setSuccess(true);
      setForm(INITIAL);
    } catch (err: any) {
      sweetErrorHandling(err).then();
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
            <label>Set title</label>
            <input
              type="text"
              placeholder="Summer Breeze Set"
              value={form.productTitle}
              onChange={(e) => setField("productTitle", e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Brand</label>
            <select
              value={form.brandName}
              onChange={(e) => setField("brandName", e.target.value)}>
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
              value={form.productCategory}
              onChange={(e) =>
                setField("productCategory", e.target.value as ProductCategory)
              }
              required>
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setField("gender", e.target.value as Gender)}
              required>
              {GENDERS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label>Discount (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            placeholder="0"
            value={form.productDiscount || ""}
            onChange={(e) =>
              setField("productDiscount", parseFloat(e.target.value) || 0)
            }
          />
        </div>

        <div className={styles.field}>
          <label>Description</label>
          <textarea
            placeholder="Brief description of the set..."
            value={form.productDesc}
            onChange={(e) => setField("productDesc", e.target.value)}
            rows={3}
          />
        </div>

        {/* Age Groups */}
        <div className={styles.field}>
          <label>Age groups</label>
          <div className={styles.sizes}>
            {AGE_GROUPS.map((age) => (
              <button
                key={age}
                type="button"
                className={`${styles.sizeBtn} ${
                  form.ageGroups.includes(age) ? styles.active : ""
                }`}
                onClick={() => toggleAgeGroup(age)}>
                {AGE_GROUP_LABELS[age]}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className={styles.field}>
          <label>Colors</label>
          <div className={styles.sizes}>
            {PRODUCT_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className={`${styles.sizeBtn} ${
                  form.productColors.includes(color) ? styles.active : ""
                }`}
                onClick={() => toggleColor(color)}>
                {color}
              </button>
            ))}
          </div>
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
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Stripe Shirt"
                  value={item.productTitle}
                  onChange={(e) =>
                    setItemField(item.id, "productTitle", e.target.value)
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
                  value={item.productPrice || ""}
                  onChange={(e) =>
                    setItemField(
                      item.id,
                      "productPrice",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  required
                />
              </div>
            </div>

            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Product type</label>
                <select
                  value={item.productType}
                  onChange={(e) =>
                    setItemField(
                      item.id,
                      "productType",
                      e.target.value as ProductType,
                    )
                  }>
                  {PRODUCT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label>Category</label>
                <select
                  value={item.productCategory}
                  onChange={(e) =>
                    setItemField(
                      item.id,
                      "productCategory",
                      e.target.value as ProductCategory,
                    )
                  }>
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label>Gender</label>
              <select
                value={item.gender}
                onChange={(e) =>
                  setItemField(item.id, "gender", e.target.value as Gender)
                }>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label>Sizes</label>
              <div className={styles.sizes}>
                {CLOTHING_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`${styles.sizeBtn} ${
                      item.size.includes(size) ? styles.active : ""
                    }`}
                    onClick={() => toggleItemSize(item.id, size)}>
                    {CLOTHING_SIZE_LABELS[size]}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label>Age groups</label>
              <div className={styles.sizes}>
                {AGE_GROUPS.map((age) => (
                  <button
                    key={age}
                    type="button"
                    className={`${styles.sizeBtn} ${
                      item.ageGroups.includes(age) ? styles.active : ""
                    }`}
                    onClick={() => toggleItemAgeGroup(item.id, age)}>
                    {AGE_GROUP_LABELS[age]}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label>Colors</label>
              <div className={styles.sizes}>
                {PRODUCT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`${styles.sizeBtn} ${
                      item.productColors.includes(color) ? styles.active : ""
                    }`}
                    onClick={() => toggleItemColor(item.id, color)}>
                    {color}
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
