import { Oval } from "react-loader-spinner";

import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <Oval
        visible={true}
        height="48"
        width="48"
        color="var(--main-color)"
        secondaryColor="var(--gray-background-color)"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
