import React, { useContext, FormEvent, ChangeEvent } from "react";
import { IArticle } from "../../models";
import { StoreContext } from "../../store/rootStore";
import { Link, NavLink } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { history } from "../../";
import { observer } from "mobx-react-lite";
import toSlug from "../../util/convertToSlug";

type Props = {
  article?: IArticle;
  categoryId?: number;
};

const initialForm: IArticle = {
  id: 0,
  slug: "",
  title: {},
  body: {},
  introduction: {},
  summary: {},
  categoryId: 1,
  gallery: [],
  isPublished: false,
  isFeatured: false,
  isMenuItem: false,
  categoryName: "",
  dateCreated: new Date(),
  datePublished: new Date(),
  picture: undefined,
};

const ArticleForm: React.FC<Props> = ({ article, categoryId }) => {
  const context = useContext(StoreContext);
  const { categories } = context.categoryStore;
  const {
    updatingArticle,
    deletingArticle,
    createArticle,
    deleteArticle,
    updateArticle,
  } = context.articleStore;

  if (categoryId) {
    initialForm.categoryId = categoryId;
  }

  const {
    form,
    handleChange,
    handleSelect,
    handleCheck,
    setForm,
    language,
    setLanguage,
  } = useForm<IArticle>(article ? article : initialForm);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const slug =
      form.slug === ""
        ? toSlug(form.title["en"] || form.title["ru"] || form.title["kk"])
        : toSlug(form.slug);

    if (form.id === 0) {
      createArticle({ ...form, slug }).then(() => history.push("/articles"));
    } else {
      updateArticle({ ...form, slug }).then(() => history.push("/articles"));
    }
  };

  const handleDelete = () => {
    if (article && article.id > 0) {
      deleteArticle(article.id).then(() => history.push("/articles"));
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
      {article && article.picture && (
        <NavLink to={`/articles/${article.id}/images/${article.picture.id}`}>
          <img src={article.picture.fullName} alt={article.picture.altText}/>
        </NavLink>
      )}

      <h3>Article form</h3>
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
            Body:
            <textarea
              onChange={handleDictionary}
              name="body"
              value={form.body[language] || ""}
            />
          </label>
        </p>
        <p>
          <label>
            Introduction:
            <textarea
              onChange={handleDictionary}
              name="introduction"
              value={form.introduction[language] || ""}
            />
          </label>
        </p>
        <p>
          <label>
            Summary:
            <textarea
              onChange={handleDictionary}
              name="summary"
              value={form.summary[language] || ""}
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
            Featured:
            <input
              type="checkbox"
              onChange={handleCheck}
              name="isFeatured"
              checked={form.isFeatured}
            />
          </label>
        </p>
        <p>
          <label>
            Published:
            <input
              type="checkbox"
              onChange={handleCheck}
              name="isPublished"
              checked={form.isPublished}
            />
          </label>
        </p>
        <p>
          <label>
            Category
            <select
              name="categoryId"
              defaultValue={form.categoryId || undefined}
              onChange={handleSelect}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title["ru"] || c.title["en"]}
                </option>
              ))}
            </select>
          </label>
        </p>
        <Link to={"/articles"}>
          <button type="button">cancel</button>
        </Link>
        <button type="button" onClick={handleSubmit}>
          submit
        </button>
        <br />
        {article && article.id > 0 && (
          <button type="button" onClick={handleDelete}>
            delete
          </button>
        )}
        {updatingArticle && <div>Updating ...</div>}
        {deletingArticle && <div>Deleting ...</div>}
      </form>
    </div>
  );
};

export default observer(ArticleForm);
