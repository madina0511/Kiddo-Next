import React, { useState, useRef } from "react";
import styles from "../../../scss/pc/mypage/productRegister/Singleproductform.module.scss";
import {
  ProductType,
  ProductCategory,
  ClothingSize,
  AgeGroup,
  Gender,
  ProductColor,
  CLOTHING_SIZE_LABELS,
  AGE_GROUP_LABELS,
} from "@/libs/enums/product.enum";
import { ProductInput } from "@/libs/types/product/product.input";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "@/apollo/user/mutation";
import { getJwtToken } from "@/libs/auth";
import {
  sweetErrorHandling,
  sweetMixinSuccessAlert,
} from "@/libs/types/sweetAlert";
import axios from "axios";

const PRODUCT_TYPES = Object.values(ProductType);
const PRODUCT_CATEGORIES = Object.values(ProductCategory);
const CLOTHING_SIZE = Object.values(ClothingSize);
const AGE_GROUPS = Object.values(AgeGroup);
const GENDERS = Object.values(Gender);
const PRODUCT_COLORS = Object.values(ProductColor);

// brandName hardcoded — o'zingizning brand listingizga mos o'zgartiring
const BRANDS = ["MOLO", "COSMO", "NORALEE", "SWEEBIES"];

interface SingleFormData
  extends Omit<ProductInput, "memberId" | "productImages"> {
  imageFiles: File[];
  imagePreviews: string[];
}

const INITIAL: SingleFormData = {
  productType: ProductType.T_SHIRT,
  productCategory: ProductCategory.INDOORWEAR,
  size: [],
  ageGroups: [],
  gender: Gender.ALL,
  productTitle: "",
  brandName: BRANDS[0],
  productPrice: 0,
  productColors: [],
  productDiscount: 0,
  productDesc: "",
  imageFiles: [],
  imagePreviews: [],
};

export default function SingleProductForm() {
  const [form, setForm] = useState<SingleFormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const token = getJwtToken();
  const [createProduct] = useMutation(CREATE_PRODUCT);
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
    e.target.value = "";
  }

  function removeImage(idx: number) {
    setForm((prev) => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== idx),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== idx),
    }));
  }

  function toggleSize(size: ClothingSize) {
    setForm((prev) => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter((s) => s !== size)
        : [...prev.size, size],
    }));
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
      productColors: prev.productColors?.includes(color)
        ? prev.productColors.filter((c) => c !== color)
        : [...(prev.productColors ?? []), color],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validation
    if (!form.productTitle) {
      alert("Product title is required");
      return;
    }
    if (!form.productPrice) {
      alert("Product price is required");
      return;
    }
    if (!form.imageFiles.length) {
      alert("At least one image is required");
      return;
    }

    setLoading(true);

    try {
      // Images upload
      const uploadedImages: string[] = [];

      for (const file of form.imageFiles) {
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
        formData.append("0", file);

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
        uploadedImages.push(res.data.data.imageUploader);
      }

      // createProduct
      await createProduct({
        variables: {
          input: {
            productType: form.productType,
            productCategory: form.productCategory,
            sizes: form.size,
            ageGroups: form.ageGroups,
            gender: form.gender,
            productTitle: form.productTitle,
            brandName: form.brandName,
            productPrice: form.productPrice,
            productColors: form.productColors,
            productDiscount: form.productDiscount,
            productDesc: form.productDesc,
            productImages: uploadedImages,
          },
        },
      });

      await sweetMixinSuccessAlert("Product saved successfully!");
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
        <h3>Product saved successfully!</h3>
        <button onClick={() => setSuccess(false)}>Add new product</button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* ── Product details ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>Product details</p>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Product title</label>
            <input
              type="text"
              placeholder="Stripe Shirt"
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
            <label>Product type</label>
            <select
              value={form.productType}
              onChange={(e) =>
                setField("productType", e.target.value as ProductType)
              }
              required>
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
        </div>

        <div className={styles.grid2}>
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
          <div className={styles.field}>
            <label>Price ($)</label>
            <input
              type="number"
              min={0}
              placeholder="65"
              value={form.productPrice || ""}
              onChange={(e) =>
                setField("productPrice", parseFloat(e.target.value) || 0)
              }
              required
            />
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
            placeholder="Brief description of the product..."
            value={form.productDesc}
            onChange={(e) => setField("productDesc", e.target.value)}
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
        <p className={styles.sectionLabel}>Size</p>
        <div className={styles.sizes}>
          {CLOTHING_SIZE.map((size) => (
            <button
              key={size}
              type="button"
              className={`${styles.sizeBtn} ${
                form.size.includes(size) ? styles.active : ""
              }`}
              onClick={() => toggleSize(size)}>
              {CLOTHING_SIZE_LABELS[size]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Age Groups ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>Age groups</p>
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

      {/* ── Colors ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>Colors</p>
        <div className={styles.sizes}>
          {PRODUCT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={`${styles.sizeBtn} ${
                form.productColors?.includes(color) ? styles.active : ""
              }`}
              onClick={() => toggleColor(color)}>
              {color}
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
