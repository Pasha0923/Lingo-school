import TeachersItem from "../TeachersItem/TeachersItem";
import css from "./TeachersList.module.css";

const TeachersList = ({ active, data }) => {
  return (
    <>
      <div className={css.list}>
        {Array.isArray(data) &&
          data.map((item) => (
            <TeachersItem key={item.id} active={active} item={item} />
          ))}
      </div>
    </>
  );
};

export default TeachersList;
