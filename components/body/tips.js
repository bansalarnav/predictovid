import styles from "./tips.scss";

const Tips = () => {
  return (
    <div className={styles.tips}>
      <div>
        <h2>1</h2>
        <p>
          Clean your hands regularly. Use soap and water, or an alcohol based
          hand sanitizer
        </p>
      </div>
      <div>
        <h2>2</h2>
        <p>
          Maintain a safe distance from others and always wear a mask when
          outside
        </p>
      </div>
      <div>
        <h2>3</h2>
        <p>
          If you have any symptoms (listed below) consult a doctor immediately
        </p>
      </div>
      <div>
        <h2>4</h2>
        <p>Clean or disinfect your surroundings regularly</p>
      </div>
      <div>
        <h2>5</h2>
        <p>Avoid going to public places</p>
      </div>
      <div>
        <h2>6</h2>
        <p>
          {" "}
          Avoid touching your eyes and nose. Wipe then with your elbow or a
          napkin instead
        </p>
      </div>
    </div>
  );
};

export default Tips;
