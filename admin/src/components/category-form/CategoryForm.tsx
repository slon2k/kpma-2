import React, { FormEvent, useContext, ChangeEvent } from "react";
import { ICategory } from "../../models";
import { StoreContext } from "../../store/rootStore";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { history } from "../../";
import { observer } from "mobx-react-lite";
import toSlug from "../../util/convertToSlug";

const initialForm: ICategory = {
  id: 0,
  title: {},
  slug: "",
  isMenuItem: false,
  parentId: null,
  description: {},
};

type Props = {
  category?: ICategory;
};

const CategoryForm: React.FC<Props> = ({ category }) => {
  const context = useContext(StoreContext);
  const {
    categories,
    deleteCategory,
    updatingCategory,
    deletingCategory,
    updateCategory,
    createCategory,
  } = context.categoryStore;

  const categoryData: ICategory = category
    ? { ...category, description: { ...category.description } }
    : initialForm;

  const {
    form,
    handleChange,
    handleSelect,
    handleCheck,
    setForm,
    language,
    setLanguage,
  } = useForm<ICategory>(categoryData);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const slug =
      form.slug === ""
        ? toSlug(form.title["en"] || form.title["ru"] || form.title["kk"])
        : toSlug(form.slug);

    if (form.id === 0) {
      createCategory({ ...form, slug }).then(() => history.push("/categories"));
    } else {
      updateCategory({ ...form, slug }).then(() => history.push("/categories"));
    }
  };

  const handleDelete = () => {
    if (category && category.id > 0) {
      deleteCategory(category.id).then(() => history.push("/categories"));
    }
  };

  const handleDictionary = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const prop = { ...form[e.target.name], [language]: e.target.value };
    setForm({ ...form, [e.target.name]: prop });
  };

  const generateSlug = () => {
    const slug = toSlug(
      form.title["en"] || form.title["ru"] || form.title["kk"]
    );
    setForm({ ...form, slug });
  };

  return (
    <div>
      <h3>Category form</h3>
      <button type="button" onClick={() => setLanguage("ru")}>
        RU
      </button>
      <button type="button" onClick={() => setLanguage("en")}>
        EN
      </button>
      <button type="button" onClick={() => setLanguage("kk")}>
        KK
      </button>
      <h3>{language}</h3>
      <form>
        <p>
          <label>
            Title:
            <textarea
              onChange={handleDictionary}
              name="title"
              value={form.title[language] || ""}
            />
          </label>
        </p>
        <p>
          <label>
            Slug:
            <input
              type="text"
              onChange={handleChange}
              name="slug"
              value={form.slug}
            />
            <button onClick={generateSlug} type="button">
              Generate
            </button>
          </label>
        </p>
        <p>
          <label>
            <textarea
              onChange={handleDictionary}
              name="description"
              value={form.description[language] || ""}
            />
          </label>
        </p>
        <p>
          <label>
            Menu:
            <input
              type="checkbox"
              onChange={handleCheck}
              name="isMenuItem"
              checked={form.isMenuItem}
            />
          </label>
        </p>
        <p>
          <label>
            Parent category
            <select
              name="parentId"
              defaultValue={form.parentId || undefined}
              onChange={handleSelect}
            >
              <option></option>
              {categories.map((c) => (
                <option key={c.id} value={c.id} disabled={c.id === form.id}>
                  {c.title["ru"] || c.title["en"]}
                </option>
              ))}
            </select>
          </label>
        </p>
        <Link to={"/categories"}>
          <button type="button">cancel</button>
        </Link>
        <button type="button" onClick={handleSubmit}>
          submit
        </button>
        <br />
        {category && category.id > 0 && (
          <button type="button" onClick={handleDelete}>
            delete
          </button>
        )}
        {updatingCategory && <div>Updating ...</div>}
        {deletingCategory && <div>Deleting ...</div>}
      </form>
    </div>
  );
};

export default observer(CategoryForm);
