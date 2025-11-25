import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { addBookFormValidationSchema } from "../../schemas/addBookFormValidationSchema";
import InputField from "../Global/InputField";
import SummaryField from "../Global/SummaryField";
import ImageUpload from "../Global/ImageUpload";
import BackButton from "../Global/BackButton";
import {
  useAddBookMutation,
  useGetBookByIdQuery,
} from "../../services/books/books.service";
import UploadedImageList from "./UploadedImageList";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

const EditBookForm = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const {
    data,
    error,
    isLoading: bookIsPending,
    refetch,
  } = useGetBookByIdQuery(bookId, {
    refetchOnFocus: false,
  });

  const [addBook, { isLoading }] = useAddBookMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data?.data?.bookTitle || "",
      author: data?.data?.author || "",
      grenre: data?.data?.genre || "",
      bookCount: data?.data?.totalBooks || "",
      bookImages: data?.data?.bookImages || [],
      bookSummary: data?.data?.bookSummary || "",
    },
    validationSchema: addBookFormValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      try {
        const formData = new FormData();

        formData.append("bookTitle", values.title);
        formData.append("author", values.author);
        formData.append("genre", values.grenre);
        formData.append("totalBooks", values.bookCount);
        formData.append("bookSummary", values.bookSummary);

        values.bookImages.forEach((file) => {
          formData.append("bookImages", file);
        });

        const res = await addBook(formData).unwrap();
        console.log("response >>> ", res);

        resetForm();
        enqueueSnackbar("Book added successfully!", { variant: "success" });
      } catch (error) {
        // enqueueSnackbar(
        //   error?.data?.error || error?.error || error?.response?.data?.message,
        //   { variant: "error" }
        // );
      }
    },
  });

  const handleNavigateBack = () => navigate(-1);

  const removeImage = (index) => {
    const updatedImages = [...formik.values.bookImages];
    updatedImages.splice(index, 1);

    formik.setFieldValue("bookImages", updatedImages);
  };

  return (
    <div className="w-full pb-5">
      <BackButton onclick={handleNavigateBack} />

      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 w-full lg:w-[70%] flex flex-col items-start gap-5"
      >
        <div className="w-full grid grid-cols-2 gap-5">
          <InputField
            labelTitle="Book Title"
            placeholder="7 Habits Of Highly Effective People"
            name="title"
            value={formik.values.title}
            onchange={formik.handleChange}
            error={formik.touched.title && formik.errors.title}
          />

          <InputField
            labelTitle="Author"
            placeholder="Ethan Smith"
            name="author"
            value={formik.values.author}
            onchange={formik.handleChange}
            error={formik.touched.author && formik.errors.author}
          />
        </div>

        <div className="w-full grid grid-cols-2 gap-5">
          <InputField
            labelTitle="Genre"
            placeholder="Motivation"
            name="grenre"
            value={formik.values.grenre}
            onchange={formik.handleChange}
            error={formik.touched.grenre && formik.errors.grenre}
          />

          <InputField
            labelTitle="Total number of books"
            placeholder="100"
            name="bookCount"
            value={formik.values.bookCount}
            onchange={formik.handleChange}
            error={formik.touched.bookCount && formik.errors.bookCount}
          />
        </div>

        {/* Image Upload */}
        <ImageUpload
          onChange={(files) => formik.setFieldValue("bookImages", files)}
          error={formik.touched.bookImages && formik.errors.bookImages}
        />

        {/* Uploaded Image Preview List */}
        <UploadedImageList
          images={formik?.values?.bookImages}
          onRemove={removeImage}
        />

        <SummaryField
          labelTitle="Book Summary"
          placeholder="Write summary here..."
          name="bookSummary"
          value={formik.values.bookSummary}
          onchange={formik.handleChange}
          error={formik.touched.bookSummary && formik.errors.bookSummary}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="button disabled:opacity-50"
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default EditBookForm;
