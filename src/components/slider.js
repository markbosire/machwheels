import "../index.css";

function Slide({ backgroundImage, heading, description }) {
  return (
    <div
      className="s-slide f-bg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay"></div>
      <div className="banner-text">
        <div className="universal-container">
          <h2 style={{ color: "#fafafa" }}>{heading}</h2>
          <p>{description}</p>
          <a className="btn banner-btn" href="#">
            Order Here
          </a>
        </div>
      </div>
    </div>
  );
}
export default Slide;
