'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import css from './LocationForm.module.css';
import { createLocation } from '@/lib/api/locations';

type LocationFormValues = {
  name: string;
  type: string;
  region: string;
  description: string;
  image: File | null;
};

const initialValues: LocationFormValues = {
  name: '',
  type: '',
  region: '',
  description: '',
  image: null,
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Мінімум 3 символи')
    .max(96, 'Максимум 96 символів')
    .required('Обов’язкове поле'),
  type: Yup.string()
    .max(64, 'Максимум 64 символи')
    .required('Обов’язкове поле'),
  region: Yup.string()
    .max(64, 'Максимум 64 символи')
    .required('Обов’язкове поле'),
  description: Yup.string()
    .min(20, 'Мінімум 20 символів')
    .max(6000, 'Максимум 6000 символів')
    .required('Обов’язкове поле'),
  image: Yup.mixed<File>()
    .required('Фото є обов’язковим')
    .test('fileType', 'Дозволені лише JPG або PNG', (value) => {
      if (!value) return false;
      return ['image/jpeg', 'image/png'].includes(value.type);
    })
    .test('fileSize', 'Розмір файлу має бути менше 1MB', (value) => {
      if (!value) return false;
      return value.size <= 1024 * 1024;
    }),
});

const typeOptions = [
  { value: '', label: 'Оберіть тип місця' },
  { value: 'beach', label: 'Пляж' },
  { value: 'mountains', label: 'Гори' },
  { value: 'forest', label: 'Ліс' },
  { value: 'camping', label: 'Кемпінг' },
];

const regionOptions = [
  { value: '', label: 'Оберіть регіон' },
  { value: 'Odesa', label: 'Одеська область' },
  { value: 'Lviv', label: 'Львівська область' },
  { value: 'Kyiv', label: 'Київська область' },
  { value: 'Zakarpattia', label: 'Закарпатська область' },
];

export default function LocationForm() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (
    values: LocationFormValues,
    { setSubmitting }: FormikHelpers<LocationFormValues>
  ) => {
    try {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('type', values.type);
      formData.append('region', values.region);
      formData.append('description', values.description);

      if (values.image) {
        formData.append('images', values.image);
      }

      const data = await createLocation(formData);

      toast.success('Локацію успішно створено');

      router.push(`/locations/${data.data._id}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Сталася помилка';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        setFieldValue,
        resetForm,
        isSubmitting,
        touched,
        errors,
        values,
      }) => (
        <Form className={css.form}>
          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor="image">
              Завантажте фото
            </label>

            <div className={css.previewWrapper}>
              {preview ? (
                <img
                  src={preview}
                  alt="Попередній перегляд"
                  className={css.previewImage}
                />
              ) : (
                <div className={css.placeholder}>
                  <span>Оберіть зображення</span>
                </div>
              )}
            </div>

            <input
              id="image"
              name="image"
              type="file"
              accept="image/png, image/jpeg"
              className={css.fileInput}
              onChange={(event) => {
                const file = event.currentTarget.files?.[0] || null;
                setFieldValue('image', file);

                if (file) {
                  const objectUrl = URL.createObjectURL(file);
                  setPreview(objectUrl);
                } else {
                  setPreview(null);
                }
              }}
            />

            {touched.image && errors.image ? (
              <p className={css.error}>{errors.image as string}</p>
            ) : null}
          </div>

          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor="name">
              Назва місця
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Введіть назву"
              className={css.input}
            />
            <ErrorMessage name="name" component="p" className={css.error} />
          </div>

          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor="type">
              Тип місця
            </label>
            <Field
              as="select"
              id="type"
              name="type"
              className={css.select}
            >
              {typeOptions.map((option) => (
                <option key={option.value || 'empty-type'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            <ErrorMessage name="type" component="p" className={css.error} />
          </div>

          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor="region">
              Регіон
            </label>
            <Field
              as="select"
              id="region"
              name="region"
              className={css.select}
            >
              {regionOptions.map((option) => (
                <option
                  key={option.value || 'empty-region'}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </Field>
            <ErrorMessage name="region" component="p" className={css.error} />
          </div>

          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor="description">
              Детальний опис
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              placeholder="Введіть опис місця"
              className={css.textarea}
            />
            <ErrorMessage
              name="description"
              component="p"
              className={css.error}
            />
          </div>

          <div className={css.actions}>
            <button
              type="submit"
              className="primary-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Збереження...' : 'Опублікувати'}
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={() => {
                resetForm({ values: initialValues });
                setPreview(null);
              }}
              disabled={isSubmitting}
            >
              Відмінити
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}